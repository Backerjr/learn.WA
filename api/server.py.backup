#!/usr/bin/env python3
"""
Flask REST API for Learn.WA English Classes
Provides endpoints for managing classes, students, and enrollments
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
from pathlib import Path

# Add scripts directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))
from english_classes import EnglishClass, create_english_class, create_multiple_classes

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# In-memory storage (will be replaced with database)
classes_db = {}
next_class_id = 1

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Learn.WA API is running"})

@app.route('/api/classes', methods=['GET'])
def get_classes():
    """Get all classes with optional filtering"""
    level = request.args.get('level')
    teacher = request.args.get('teacher')
    
    result = list(classes_db.values())
    
    if level:
        result = [c for c in result if c['level'] == level]
    if teacher:
        result = [c for c in result if c['teacher'].lower() == teacher.lower()]
    
    return jsonify(result)

@app.route('/api/classes/<int:class_id>', methods=['GET'])
def get_class(class_id):
    """Get a specific class by ID"""
    if class_id not in classes_db:
        return jsonify({"error": "Class not found"}), 404
    return jsonify(classes_db[class_id])

@app.route('/api/classes', methods=['POST'])
def create_class():
    """Create a new class"""
    global next_class_id
    
    try:
        data = request.json
        # Validate required fields
        required_fields = ['name', 'level', 'teacher', 'days', 'start_time', 'end_time', 'capacity']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create EnglishClass instance for validation
        english_class = create_english_class(**data)
        
        # Store as dict with ID
        class_data = {
            "id": next_class_id,
            "name": english_class.name,
            "level": english_class.level,
            "teacher": english_class.teacher,
            "days": english_class.days,
            "start_time": english_class.start_time,
            "end_time": english_class.end_time,
            "capacity": english_class.capacity,
            "syllabus": english_class.syllabus,
            "students": english_class.students,
            "enrolled": len(english_class.students)
        }
        
        classes_db[next_class_id] = class_data
        next_class_id += 1
        
        return jsonify(class_data), 201
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/api/classes/<int:class_id>/enroll', methods=['POST'])
def enroll_student(class_id):
    """Enroll a student in a class"""
    if class_id not in classes_db:
        return jsonify({"error": "Class not found"}), 404
    
    data = request.json
    if not data or 'student_name' not in data:
        return jsonify({"error": "Missing student_name"}), 400
    
    class_data = classes_db[class_id]
    student_name = data['student_name']
    
    # Check capacity
    if len(class_data['students']) >= class_data['capacity']:
        return jsonify({"error": "Class is full", "capacity": class_data['capacity']}), 400
    
    # Check if already enrolled
    if student_name in class_data['students']:
        return jsonify({"error": "Student already enrolled"}), 400
    
    # Add student
    class_data['students'].append(student_name)
    class_data['enrolled'] = len(class_data['students'])
    
    return jsonify({
        "message": "Student enrolled successfully",
        "class": class_data
    })

@app.route('/api/classes/<int:class_id>/students', methods=['GET'])
def get_class_students(class_id):
    """Get all students enrolled in a class"""
    if class_id not in classes_db:
        return jsonify({"error": "Class not found"}), 404
    
    return jsonify({
        "class_id": class_id,
        "class_name": classes_db[class_id]['name'],
        "students": classes_db[class_id]['students'],
        "enrolled": len(classes_db[class_id]['students']),
        "capacity": classes_db[class_id]['capacity']
    })

@app.route('/api/levels', methods=['GET'])
def get_levels():
    """Get all available class levels"""
    from english_classes import VALID_LEVELS
    return jsonify(list(VALID_LEVELS))

@app.route('/api/classes/bulk', methods=['POST'])
def bulk_create_classes():
    """Create multiple classes from array"""
    global next_class_id
    
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({"error": "Expected array of class specifications"}), 400
        
        created_classes = []
        
        for spec in data:
            try:
                english_class = create_english_class(**spec)
                class_data = {
                    "id": next_class_id,
                    "name": english_class.name,
                    "level": english_class.level,
                    "teacher": english_class.teacher,
                    "days": english_class.days,
                    "start_time": english_class.start_time,
                    "end_time": english_class.end_time,
                    "capacity": english_class.capacity,
                    "syllabus": english_class.syllabus,
                    "students": english_class.students,
                    "enrolled": len(english_class.students)
                }
                classes_db[next_class_id] = class_data
                created_classes.append(class_data)
                next_class_id += 1
            except ValueError as e:
                return jsonify({"error": f"Invalid class specification: {str(e)}"}), 400
        
        return jsonify({
            "message": f"Created {len(created_classes)} classes",
            "classes": created_classes
        }), 201
    
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == '__main__':
    # Load initial classes from class_specs.json
    import json
    specs_path = Path(__file__).parent.parent / "scripts" / "class_specs.json"
    
    if specs_path.exists():
        with open(specs_path, 'r', encoding='utf-8') as f:
            specs = json.load(f)
            for spec in specs:
                try:
                    english_class = create_english_class(**spec)
                    class_data = {
                        "id": next_class_id,
                        "name": english_class.name,
                        "level": english_class.level,
                        "teacher": english_class.teacher,
                        "days": english_class.days,
                        "start_time": english_class.start_time,
                        "end_time": english_class.end_time,
                        "capacity": english_class.capacity,
                        "syllabus": english_class.syllabus,
                        "students": english_class.students,
                        "enrolled": len(english_class.students)
                    }
                    classes_db[next_class_id] = class_data
                    next_class_id += 1
                    print(f"Loaded: {class_data['name']}")
                except Exception as e:
                    print(f"Failed to load class: {e}")
    
    print(f"\n🚀 API Server starting with {len(classes_db)} classes loaded")
    print("📚 Available endpoints:")
    print("  GET    /api/health")
    print("  GET    /api/classes")
    print("  GET    /api/classes/<id>")
    print("  POST   /api/classes")
    print("  POST   /api/classes/<id>/enroll")
    print("  GET    /api/classes/<id>/students")
    print("  GET    /api/levels")
    print("  POST   /api/classes/bulk")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
