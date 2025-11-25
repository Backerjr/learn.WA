"""SQLite database setup and models for Learn.WA"""
import sqlite3
from contextlib import contextmanager
from typing import List, Dict, Optional
import json

DB_PATH = "learn_wa.db"

@contextmanager
def get_db():
    """Context manager for database connections"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    """Initialize database schema"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Classes table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS classes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                level TEXT NOT NULL,
                teacher TEXT NOT NULL,
                days TEXT NOT NULL,
                start_time TEXT NOT NULL,
                end_time TEXT NOT NULL,
                capacity INTEGER NOT NULL,
                enrolled_count INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Students table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Enrollments table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS enrollments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                class_id INTEGER NOT NULL,
                student_id INTEGER NOT NULL,
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (class_id) REFERENCES classes (id),
                FOREIGN KEY (student_id) REFERENCES students (id),
                UNIQUE(class_id, student_id)
            )
        """)
        
        # Quizzes table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS quizzes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                topic TEXT,
                difficulty TEXT DEFAULT 'intermediate',
                focus_mode TEXT DEFAULT 'comprehension',
                metadata TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Questions table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quiz_id INTEGER NOT NULL,
                text TEXT NOT NULL,
                options TEXT NOT NULL,
                correct_answer TEXT NOT NULL,
                explanation TEXT,
                FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE
            )
        """)
        
        conn.commit()

def serialize_class_row(row: sqlite3.Row) -> Dict:
    """Normalize database row to API-friendly shape"""
    class_dict = dict(row)
    class_dict['days'] = json.loads(class_dict.get('days', '[]'))
    class_dict['enrolled'] = class_dict.get('enrolled_count', 0)
    # Provide consistent optional fields for frontend consumers
    class_dict.setdefault('syllabus', [])
    class_dict.setdefault('students', [])
    return class_dict

def create_class(class_data: Dict) -> int:
    """Create a new class"""
    with get_db() as conn:
        cursor = conn.cursor()
        days_json = json.dumps(class_data['days'])
        
        cursor.execute("""
            INSERT INTO classes (name, level, teacher, days, start_time, end_time, capacity)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            class_data['name'],
            class_data['level'],
            class_data['teacher'],
            days_json,
            class_data['start_time'],
            class_data['end_time'],
            class_data['capacity']
        ))
        
        return cursor.lastrowid

def get_all_classes(level: Optional[str] = None, teacher: Optional[str] = None) -> List[Dict]:
    """Get all classes with optional filters"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        query = "SELECT * FROM classes WHERE 1=1"
        params = []
        
        if level:
            query += " AND level = ?"
            params.append(level)
        
        if teacher:
            query += " AND teacher = ?"
            params.append(teacher)
        
        cursor.execute(query, params)
        rows = cursor.fetchall()
        
        classes = []
        for row in rows:
            classes.append(serialize_class_row(row))
        
        return classes

def get_class_by_id(class_id: int) -> Optional[Dict]:
    """Get a specific class by ID"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM classes WHERE id = ?", (class_id,))
        row = cursor.fetchone()
        
        if row:
            return serialize_class_row(row)
        
        return None

def enroll_student(class_id: int, student_name: str) -> Dict:
    """Enroll a student in a class"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Check class capacity
        cursor.execute("SELECT capacity, enrolled_count FROM classes WHERE id = ?", (class_id,))
        row = cursor.fetchone()
        
        if not row:
            raise ValueError("Class not found")
        
        if row['enrolled_count'] >= row['capacity']:
            raise ValueError("Class is full")
        
        # Create or get student
        cursor.execute("INSERT OR IGNORE INTO students (name) VALUES (?)", (student_name,))
        cursor.execute("SELECT id FROM students WHERE name = ?", (student_name,))
        student_id = cursor.fetchone()['id']
        
        # Create enrollment
        try:
            cursor.execute("""
                INSERT INTO enrollments (class_id, student_id)
                VALUES (?, ?)
            """, (class_id, student_id))
            
            # Update enrolled count
            cursor.execute("""
                UPDATE classes
                SET enrolled_count = enrolled_count + 1
                WHERE id = ?
            """, (class_id,))
            
            conn.commit()
            
            return {
                "message": f"Successfully enrolled {student_name}",
                "class_id": class_id,
                "student_name": student_name
            }
        except sqlite3.IntegrityError:
            raise ValueError("Student already enrolled in this class")

def get_class_students(class_id: int) -> List[Dict]:
    """Get all students enrolled in a class"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT s.id, s.name, s.email, e.enrolled_at
            FROM students s
            JOIN enrollments e ON s.id = e.student_id
            WHERE e.class_id = ?
            ORDER BY e.enrolled_at DESC
        """, (class_id,))
        
        rows = cursor.fetchall()
        return [dict(row) for row in rows]

def create_quiz(quiz_data: Dict) -> int:
    """Create a new quiz with questions"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO quizzes (title, topic, difficulty, focus_mode, metadata)
            VALUES (?, ?, ?, ?, ?)
        """, (
            quiz_data['title'],
            quiz_data.get('topic', ''),
            quiz_data.get('difficulty', 'intermediate'),
            quiz_data.get('focus_mode', 'comprehension'),
            json.dumps(quiz_data.get('metadata', {}))
        ))
        
        quiz_id = cursor.lastrowid
        
        for question in quiz_data['questions']:
            cursor.execute("""
                INSERT INTO questions (quiz_id, text, options, correct_answer, explanation)
                VALUES (?, ?, ?, ?, ?)
            """, (
                quiz_id,
                question['question'],
                json.dumps(question['options']),
                question['correct_answer'],
                question.get('explanation', '')
            ))
        
        return quiz_id

def get_all_quizzes() -> List[Dict]:
    """Get all quizzes (summary view)"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT q.id, q.title, q.topic, q.difficulty, q.focus_mode, q.created_at,
                   COUNT(qu.id) as question_count
            FROM quizzes q
            LEFT JOIN questions qu ON q.id = qu.quiz_id
            GROUP BY q.id
            ORDER BY q.created_at DESC
        """)
        
        rows = cursor.fetchall()
        return [dict(row) for row in rows]

def get_quiz(quiz_id: int) -> Optional[Dict]:
    """Get a specific quiz with all questions"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM quizzes WHERE id = ?", (quiz_id,))
        quiz_row = cursor.fetchone()
        
        if not quiz_row:
            return None
        
        quiz = dict(quiz_row)
        quiz['metadata'] = json.loads(quiz['metadata']) if quiz['metadata'] else {}
        
        cursor.execute("SELECT * FROM questions WHERE quiz_id = ? ORDER BY id", (quiz_id,))
        question_rows = cursor.fetchall()
        
        questions = []
        for row in question_rows:
            q = dict(row)
            q['options'] = json.loads(q['options'])
            questions.append(q)
        
        quiz['questions'] = questions
        return quiz
