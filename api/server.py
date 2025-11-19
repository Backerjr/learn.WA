#!/usr/bin/env python3
"""
Flask REST API for Learn.WA English Classes
Provides endpoints for managing classes, students, and enrollments with SQLite persistence
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
from pathlib import Path
import json

# Add scripts and api directories to path
sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))
sys.path.insert(0, str(Path(__file__).parent))

from english_classes import create_english_class, VALID_LEVELS
from database import (
    init_db, create_class as db_create_class, get_all_classes,
    get_class_by_id, enroll_student, get_class_students,
    create_quiz, get_all_quizzes, get_quiz
)

app = Flask(__name__)
CORS(app)

# Initialize database on startup
init_db()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Learn.WA API is running with SQLite"})

@app.route('/api/levels', methods=['GET'])
def get_levels():
    """Get valid class levels"""
    return jsonify({"levels": VALID_LEVELS})

@app.route('/api/classes', methods=['GET'])
def get_classes():
    """Get all classes with optional filtering"""
    level = request.args.get('level')
    teacher = request.args.get('teacher')
    
    classes = get_all_classes(level=level, teacher=teacher)
    return jsonify(classes)

@app.route('/api/classes/<int:class_id>', methods=['GET'])
def get_class(class_id):
    """Get a specific class by ID"""
    class_obj = get_class_by_id(class_id)
    
    if not class_obj:
        return jsonify({"error": "Class not found"}), 404
    
    return jsonify(class_obj)

@app.route('/api/classes', methods=['POST'])
def create_class():
    """Create a new class"""
    data = request.json
    
    try:
        # Validate using the english_classes module
        validated_class = create_english_class(
            name=data['name'],
            level=data['level'],
            teacher=data['teacher'],
            days=data['days'],
            start_time=data['start_time'],
            end_time=data['end_time'],
            capacity=data.get('capacity', 20)
        )
        
        # Save to database
        class_id = db_create_class({
            'name': validated_class.name,
            'level': validated_class.level,
            'teacher': validated_class.teacher,
            'days': validated_class.days,
            'start_time': validated_class.start_time,
            'end_time': validated_class.end_time,
            'capacity': validated_class.capacity
        })
        
        # Return created class
        new_class = get_class_by_id(class_id)
        return jsonify(new_class), 201
        
    except (ValueError, KeyError) as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/classes/bulk', methods=['POST'])
def bulk_create_classes():
    """Create multiple classes at once"""
    data = request.json
    classes_data = data.get('classes', [])
    
    created_classes = []
    
    for class_data in classes_data:
        try:
            validated_class = create_english_class(
                name=class_data['name'],
                level=class_data['level'],
                teacher=class_data['teacher'],
                days=class_data['days'],
                start_time=class_data['start_time'],
                end_time=class_data['end_time'],
                capacity=class_data.get('capacity', 20)
            )
            
            class_id = db_create_class({
                'name': validated_class.name,
                'level': validated_class.level,
                'teacher': validated_class.teacher,
                'days': validated_class.days,
                'start_time': validated_class.start_time,
                'end_time': validated_class.end_time,
                'capacity': validated_class.capacity
            })
            
            new_class = get_class_by_id(class_id)
            created_classes.append(new_class)
            
        except (ValueError, KeyError):
            continue
    
    return jsonify({
        "message": f"Created {len(created_classes)} classes",
        "classes": created_classes
    }), 201

@app.route('/api/classes/<int:class_id>/enroll', methods=['POST'])
def enroll_student_endpoint(class_id):
    """Enroll a student in a class"""
    data = request.json
    student_name = data.get('student_name')
    
    if not student_name:
        return jsonify({"error": "student_name is required"}), 400
    
    try:
        result = enroll_student(class_id, student_name)
        
        # Get updated class info
        updated_class = get_class_by_id(class_id)
        result['enrolled_count'] = updated_class['enrolled_count']
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/classes/<int:class_id>/students', methods=['GET'])
def get_enrolled_students(class_id):
    """Get all students enrolled in a class"""
    class_obj = get_class_by_id(class_id)
    
    if not class_obj:
        return jsonify({"error": "Class not found"}), 404
    
    students = get_class_students(class_id)
    
    return jsonify({
        "class_id": class_id,
        "enrolled_count": class_obj['enrolled_count'],
        "students": students
    })

@app.route('/api/quizzes', methods=['POST'])
def create_quiz_endpoint():
    """Create a new quiz"""
    data = request.json
    
    try:
        quiz_id = create_quiz(data)
        new_quiz = get_quiz(quiz_id)
        return jsonify(new_quiz), 201
    except (ValueError, KeyError) as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/quizzes', methods=['GET'])
def get_quizzes():
    """Get all quizzes"""
    quizzes = get_all_quizzes()
    return jsonify(quizzes)

@app.route('/api/quizzes/<int:quiz_id>', methods=['GET'])
def get_quiz_endpoint(quiz_id):
    """Get a specific quiz with questions"""
    quiz = get_quiz(quiz_id)
    
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    
    return jsonify(quiz)

if __name__ == '__main__':
    # Load initial data from class_specs.json if database is empty
    classes_list = get_all_classes()
    if len(classes_list) == 0:
        try:
            specs_path = Path(__file__).parent.parent / 'scripts' / 'class_specs.json'
            with open(specs_path, 'r') as f:
                specs_data = json.load(f)
                
            for class_data in specs_data:
                try:
                    validated_class = create_english_class(**class_data)
                    db_create_class({
                        'name': validated_class.name,
                        'level': validated_class.level,
                        'teacher': validated_class.teacher,
                        'days': validated_class.days,
                        'start_time': validated_class.start_time,
                        'end_time': validated_class.end_time,
                        'capacity': validated_class.capacity
                    })
                except ValueError:
                    continue
                    
            print(f"Loaded initial data from class_specs.json")
        except FileNotFoundError:
            print("class_specs.json not found, starting with empty database")
    
    print("Starting Learn.WA API server with SQLite database...")
    app.run(debug=True, port=5000)
