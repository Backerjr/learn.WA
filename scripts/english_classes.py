#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
english_classes.py

A tiny library for modelling “English teaching classes”.  It supplies:

* `EnglishClass` – a dataclass that stores all the information about a class.
* `create_english_class` – a factory function that validates input and returns
  an `EnglishClass` instance.
* `create_multiple_classes` – convenience wrapper to build many classes at once.
* `default_syllabus_for_level` – quick‑start syllabus generator (optional).

The module is deliberately lightweight: no external dependencies other than
the Python standard library.  It can be used as a building block for larger
applications (web back‑ends, scheduling scripts, etc.).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import List, Dict, Iterable, Optional, Union, Any


# ----------------------------------------------------------------------
# Helper data/constants
# ----------------------------------------------------------------------
VALID_LEVELS = {"Beginner", "Elementary", "Pre‑Intermediate", "Intermediate",
                "Upper‑Intermediate", "Advanced", "Proficient"}

# Simple day names – you can expand this list or accept abbreviations.
VALID_DAYS = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}

# ----------------------------------------------------------------------
# Core data model
# ----------------------------------------------------------------------
@dataclass
class EnglishClass:
    """
    Represents a single English‑teaching class / course.
    """
    name: str
    level: str
    teacher: str
    days: List[str]
    start_time: str
    end_time: str
    capacity: int
    syllabus: List[str] = field(default_factory=list)
    students: List[str] = field(default_factory=list, init=False)

    def __post_init__(self) -> None:
        """Run once after dataclass init to verify data integrity."""
        self.name = self.name.strip()
        self.teacher = self.teacher.strip()
        if self.level not in VALID_LEVELS:
            raise ValueError(f"Level '{self.level}' not recognised. "
                             f"Valid levels are: {sorted(VALID_LEVELS)}")
        normalized_days = [day.strip().capitalize() for day in self.days]
        invalid = [d for d in normalized_days if d not in VALID_DAYS]
        if invalid:
            raise ValueError(f"Invalid day(s): {invalid}. "
                             f"Allowed values are: {sorted(VALID_DAYS)}")
        self.days = normalized_days
        time_regex = re.compile(r"^(?:[01]\d|2[0-3]):[0-5]\d$")
        if not time_regex.match(self.start_time):
            raise ValueError(f"Invalid start_time '{self.start_time}'. Expected HH:MM (24‑hour).")
        if not time_regex.match(self.end_time):
            raise ValueError(f"Invalid end_time '{self.end_time}'. Expected HH:MM (24‑hour).")
        if self.end_time <= self.start_time:
            raise ValueError(f"end_time ('{self.end_time}') must be later than start_time ('{self.start_time}').")
        if not isinstance(self.capacity, int) or self.capacity <= 0:
            raise ValueError("capacity must be a positive integer.")
        self.syllabus = [topic.strip() for topic in self.syllabus if topic.strip()]

    def add_student(self, name: str) -> bool:
        """Enroll a student if there is room. Returns True on success."""
        name = name.strip()
        if self.is_full():
            return False
        if name in self.students:
            return True
        self.students.append(name)
        return True

    def remove_student(self, name: str) -> bool:
        """Un‑enroll a student. Returns True if the student was present."""
        try:
            self.students.remove(name.strip())
            return True
        except ValueError:
            return False

    def is_full(self) -> bool:
        """True if capacity has been reached."""
        return len(self.students) >= self.capacity

    def __str__(self) -> str:
        """Human‑readable one‑line summary."""
        return (f"EnglishClass(name='{self.name}', level='{self.level}', teacher='{self.teacher}', "
                f"days={self.days}, time={self.start_time}-{self.end_time}, "
                f"capacity={self.capacity}, enrolled={len(self.students)})")


def default_syllabus_for_level(level: str) -> List[str]:
    """Return a **starter syllabus** (list of topics) for a given CEFR level."""
    base = {
        "Beginner": [
            "Greetings & Introductions", "Alphabet & Numbers", "Family & Personal Information",
            "Daily Routines", "Simple Present (Yes/No, Wh‑questions)",
        ],
        "Elementary": [
            "Describing People & Places", "Present Continuous", "Past Simple (Regular verbs)",
            "Shopping & Money", "Basic Prepositions of Time & Place",
        ],
        "Pre‑Intermediate": [
            "Comparatives & Superlatives", "Past Simple (Irregular verbs)", "Future (will, going‑to)",
            "Modals for Ability & Permission", "Simple Conditional (type 0/1)",
        ],
        "Intermediate": [
            "Present Perfect Simple", "Relative Clauses", "Reported Speech (statements)",
            "Passive Voice (present & past)", "Phrasal Verbs – Everyday Topics",
        ],
        "Upper‑Intermediate": [
            "Present Perfect Continuous", "Mixed Conditionals", "Reported Speech (questions & commands)",
            "Advanced Phrasal Verbs & Idioms", "Writing Formal Emails & Letters",
        ],
        "Advanced": [
            "Complex Subordination (that‑clauses, infinitives)", "Advanced Modals (must, have to, ought to)",
            "Collocations & Lexical Pairs", "Academic Writing Structure", "Debate & Presentation Skills",
        ],
        "Proficient": [
            "Nuanced Register & Style", "Dialectal Variations & Slang", "Critical Analysis of Texts",
            "Advanced Literature Discussion", "Teaching Methodology Overview",
        ],
    }
    if level not in base:
        raise ValueError(f"Syllabus not defined for level '{level}'.")
    return base[level]


def create_english_class(
    *,
    name: str,
    level: str,
    teacher: str,
    days: Union[List[str], str],
    start_time: str,
    end_time: str,
    capacity: int,
    syllabus: Optional[List[str]] = None,
    auto_generate_syllabus: bool = False,
) -> EnglishClass:
    """Factory function that builds an :class:`EnglishClass` while performing validation."""
    if isinstance(days, str):
        days = [d.strip().capitalize() for d in re.split(r"[;,]+", days) if d.strip()]
    elif isinstance(days, list):
        days = [d.strip().capitalize() for d in days if isinstance(d, str) and d.strip()]
    else:
        raise TypeError("days must be a list of strings or a comma‑separated string.")
    if not days:
        raise ValueError("At least one meeting day must be provided.")
    if syllabus is None and auto_generate_syllabus:
        syllabus = default_syllabus_for_level(level)
    elif syllabus is None:
        syllabus = []
    cls = EnglishClass(
        name=name, level=level, teacher=teacher, days=days,
        start_time=start_time, end_time=end_time, capacity=capacity, syllabus=syllabus,
    )
    return cls


def create_multiple_classes(specs: Iterable[Dict[str, Any]]) -> List[EnglishClass]:
    """Build many `EnglishClass` objects from an iterable of specification dictionaries."""
    created = []
    for idx, spec in enumerate(specs, start=1):
        if not isinstance(spec, dict):
            raise TypeError(f"Specification #{idx} is not a dict.")
        try:
            cls = create_english_class(**spec)
            created.append(cls)
        except Exception as exc:
            raise ValueError(f"Failed to create class from spec #{idx}: {exc}") from exc
    return created

if __name__ == "__main__":
    beginner = create_english_class(
        name="Beginner Conversation – A", level="Beginner", teacher="Maria",
        days="Monday, Wednesday, Friday", start_time="09:30", end_time="10:45",
        capacity=15, auto_generate_syllabus=True,
    )
    print("✅ Single class created:")
    print(beginner)
    print("Syllabus:", beginner.syllabus, "\n")
    for student in ["Alice", "Bob", "Charlie"]:
        enrolled = beginner.add_student(student)
        print(f"Enrolling {student}: {'✅' if enrolled else '❌ (full)'}")
    print(f"Current enrolment ({len(beginner.students)}/{beginner.capacity}):", beginner.students)
    print()
    specs = [
        {"name": "Intermediate Grammar – B", "level": "Intermediate", "teacher": "Liam",
         "days": ["Tuesday", "Thursday"], "start_time": "13:00", "end_time": "14:30",
         "capacity": 12, "auto_generate_syllabus": True},
        {"name": "Advanced Business Writing", "level": "Advanced", "teacher": "Sophia",
         "days": "Monday, Thursday", "start_time": "16:00", "end_time": "18:00",
         "capacity": 8, "syllabus": ["Formal Email Conventions", "Report Structure",
                                     "Persuasive Language", "Proofreading & Editing",
                                     "Presentation Slides"]},
    ]
    classes = create_multiple_classes(specs)
    print("\n✅ Bulk‑created classes:")
    for c in classes:
        print(c)
        print("  Syllabus preview:", c.syllabus[:3], "…\n")
