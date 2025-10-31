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

    Attributes
    ----------
    name : str
        Human‑readable name for the course (e.g. "Business English – B1").
    level : str
        CEFR or any custom level (must be in ``VALID_LEVELS`` by default).
    teacher : str
        Name of the instructor.
    days : List[str]
        Days of the week on which the class meets (e.g. ["Monday", "Wednesday"]).
    start_time : str
        Class start time in 24‑hour ``HH:MM`` format.
    end_time : str
        Class end time in 24‑hour ``HH:MM`` format.  Must be later than
        ``start_time``.
    capacity : int
        Maximum number of students allowed.
    syllabus : List[str]
        Ordered list of topics/units that will be covered.
    students : List[str] (init‑only)
        Currently enrolled students (empty list on creation; managed via methods).

    Methods
    -------
    add_student(name: str) -> bool
        Adds a student if capacity permits; returns True on success.
    remove_student(name: str) -> bool
        Removes a student; returns True if the student was present.
    is_full() -> bool
        Convenience check for capacity.
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

    # ------------------------------------------------------------------
    # Validation & utility helpers (internal)
    # ------------------------------------------------------------------
    def __post_init__(self) -> None:
        """Run once after dataclass init to verify data integrity."""
        # Normalise whitespace and case for a tidy representation.
        self.name = self.name.strip()
        self.teacher = self.teacher.strip()

        # Level validation
        if self.level not in VALID_LEVELS:
            raise ValueError(f"Level '{self.level}' not recognised. "
                             f"Valid levels are: {sorted(VALID_LEVELS)}")

        # Day validation
        normalized_days = [day.strip().capitalize() for day in self.days]
        invalid = [d for d in normalized_days if d not in VALID_DAYS]
        if invalid:
            raise ValueError(f"Invalid day(s): {invalid}. "
                             f"Allowed values are: {sorted(VALID_DAYS)}")
        self.days = normalized_days

        # Time format validation (HH:MM 24‑hour)
        time_regex = re.compile(r"^(?:[01]\d|2[0-3]):[0-5]\d$")
        if not time_regex.match(self.start_time):
            raise ValueError(f"Invalid start_time '{self.start_time}'. Expected HH:MM (24‑hour).")
        if not time_regex.match(self.end_time):
            raise ValueError(f"Invalid end_time '{self.end_time}'. Expected HH:MM (24‑hour).")

        # Ensure end > start (lexicographically works for HH:MM)
        if self.end_time <= self.start_time:
            raise ValueError(f"end_time ('{self.end_time}') must be later than start_time ('{self.start_time}').")

        # Capacity must be positive integer
        if not isinstance(self.capacity, int) or self.capacity <= 0:
            raise ValueError("capacity must be a positive integer.")

        # Ensure syllabus entries are strings & strip whitespace
        self.syllabus = [topic.strip() for topic in self.syllabus if topic.strip()]

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------
    def add_student(self, name: str) -> bool:
        """Enroll a student if there is room. Returns True on success."""
        name = name.strip()
        if self.is_full():
            return False
        if name in self.students:
            # Already enrolled – not counted as a failure but also not duplicated.
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


# ----------------------------------------------------------------------
# Factory helpers
# ----------------------------------------------------------------------
def default_syllabus_for_level(level: str) -> List[str]:
    """
    Return a **starter syllabus** (list of topics) for a given CEFR level.
    The topics are generic and deliberately short – feel free to replace
    them with your own curriculum.

    Parameters
    ----------
    level : str
        Must be one of ``VALID_LEVELS``.

    Returns
    -------
    List[str]
        Ordered list of unit titles.
    """
    base = {
        "Beginner": [
            "Greetings & Introductions",
            "Alphabet & Numbers",
            "Family & Personal Information",
            "Daily Routines",
            "Simple Present (Yes/No, Wh‑questions)",
        ],
        "Elementary": [
            "Describing People & Places",
            "Present Continuous",
            "Past Simple (Regular verbs)",
            "Shopping & Money",
            "Basic Prepositions of Time & Place",
        ],
        "Pre‑Intermediate": [
            "Comparatives & Superlatives",
            "Past Simple (Irregular verbs)",
            "Future (will, going‑to)",
            "Modals for Ability & Permission",
            "Simple Conditional (type 0/1)",
        ],
        "Intermediate": [
            "Present Perfect Simple",
            "Relative Clauses",
            "Reported Speech (statements)",
            "Passive Voice (present & past)",
            "Phrasal Verbs – Everyday Topics",
        ],
        "Upper‑Intermediate": [
            "Present Perfect Continuous",
            "Mixed Conditionals",
            "Reported Speech (questions & commands)",
            "Advanced Phrasal Verbs & Idioms",
            "Writing Formal Emails & Letters",
        ],
        "Advanced": [
            "Complex Subordination (that‑clauses, infinitives)",
            "Advanced Modals (must, have to, ought to)",
            "Collocations & Lexical Pairs",
            "Academic Writing Structure",
            "Debate & Presentation Skills",
        ],
        "Proficient": [
            "Nuanced Register & Style",
            "Dialectal Variations & Slang",
            "Critical Analysis of Texts",
            "Advanced Literature Discussion",
            "Teaching Methodology Overview",
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
    """
    Factory function that builds an :class:`EnglishClass` while performing
    **basic validation** and optionally **auto‑generating a syllabus**.

    Parameters
    ----------
    name : str
        Course title (e.g. "Business English – B1").
    level : str
        CEFR level (must be in ``VALID_LEVELS``).
    teacher : str
        Instructor name.
    days : list[str] | str
        Either a list of day names (e.g. ``["Monday","Wednesday"]``) or a
        single comma‑separated string (e.g. ``"Mon, Wed"``).  Case‑insensitive.
    start_time / end_time : str
        Times in the 24‑hour ``HH:MM`` format.
    capacity : int
        Maximum number of students.
    syllabus : list[str] | None
        Optional explicit syllabus.  If ``None`` and ``auto_generate_syllabus`` is
        True, a starter syllabus based on ``level`` will be used.
    auto_generate_syllabus : bool
        When set, a generic syllabus for ``level`` will be automatically added
        if ``syllabus`` is not supplied.

    Returns
    -------
    EnglishClass
        A fully‑initialised class object.

    Raises
    ------
    ValueError
        If any supplied argument fails validation.
    """
    # ------------------------------------------------------------------
    # Normalise `days` – accept both list and comma‑separated string.
    # ------------------------------------------------------------------
    if isinstance(days, str):
        # Split on commas or semicolons, strip whitespace, capitalize.
        days = [d.strip().capitalize() for d in re.split(r"[;,]+", days) if d.strip()]
    elif isinstance(days, list):
        days = [d.strip().capitalize() for d in days if isinstance(d, str) and d.strip()]
    else:
        raise TypeError("days must be a list of strings or a comma‑separated string.")

    if not days:
        raise ValueError("At least one meeting day must be provided.")

    # ------------------------------------------------------------------
    # Syllabus handling
    # ------------------------------------------------------------------
    if syllabus is None and auto_generate_syllabus:
        syllabus = default_syllabus_for_level(level)
    elif syllabus is None:
        syllabus = []  # Empty list – user may fill later

    # ------------------------------------------------------------------
    # Build the dataclass – any validation errors surface from __post_init__
    # ------------------------------------------------------------------
    cls = EnglishClass(
        name=name,
        level=level,
        teacher=teacher,
        days=days,
        start_time=start_time,
        end_time=end_time,
        capacity=capacity,
        syllabus=syllabus,
    )
    return cls


def create_multiple_classes(specs: Iterable[Dict[str, Any]]) -> List[EnglishClass]:
    """
    Build many `EnglishClass` objects from an iterable of specification dictionaries.
    Each dictionary should contain the same named arguments accepted by
    ``create_english_class`` (they are passed straight through using ``**spec``).

    Example
    -------
    >>> specs = [
    ...     {"name": "Beginner Conversational", "level": "Beginner",
    ...      "teacher": "Anna", "days": "Mon, Wed", "start_time": "09:00",
    ...      "end_time": "10:30", "capacity": 12, "auto_generate_syllabus": True},
    ...     {"name": "Advanced Writing", "level": "Advanced",
    ...      "teacher": "John", "days": ["Tuesday", "Thursday"],
    ...      "start_time": "14:00", "end_time": "15:45",
    ...      "capacity": 8, "syllabus": ["Essay Structure", "Citation Styles"]},
    ... ]
    >>> classes = create_multiple_classes(specs)
    >>> len(classes)
    2

    Parameters
    ----------
    specs : iterable of dict
        Each dict contains the keyword arguments for ``create_english_class``.

    Returns
    -------
    list[EnglishClass]
        List of instantiated classes.

    Raises
    ------
    ValueError / TypeError
        Propagated from the underlying creation routine if a spec is broken.
    """
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


# ----------------------------------------------------------------------
# Demo / quick test (run this file directly)
# ----------------------------------------------------------------------
if __name__ == "__main__":
    # 1️⃣ Create a single class with auto‑generated syllabus
    beginner = create_english_class(
        name="Beginner Conversation – A",
        level="Beginner",
        teacher="Maria",
        days="Monday, Wednesday, Friday",
        start_time="09:30",
        end_time="10:45",
        capacity=15,
        auto_generate_syllabus=True,
    )
    print("✅ Single class created:")
    print(beginner)
    print("Syllabus:", beginner.syllabus, "\n")

    # 2️⃣ Enroll a few students, test capacity logic
    for student in ["Alice", "Bob", "Charlie"]:
        enrolled = beginner.add_student(student)
        print(f"Enrolling {student}: {'✅' if enrolled else '❌ (full)'}")
    print(f"Current enrolment ({len(beginner.students)}/{beginner.capacity}):", beginner.students)
    print()

    # 3️⃣ Bulk‑create several classes from a list of specs
    specs = [
        {
            "name": "Intermediate Grammar – B",
            "level": "Intermediate",
            "teacher": "Liam",
            "days": ["Tuesday", "Thursday"],
            "start_time": "13:00",
            "end_time": "14:30",
            "capacity": 12,
            "auto_generate_syllabus": True,
        },
        {
            "name": "Advanced Business Writing",
            "level": "Advanced",
            "teacher": "Sophia",
            "days": "Monday, Thursday",
            "start_time": "16:00",
            "end_time": "18:00",
            "capacity": 8,
            "syllabus": [
                "Formal Email Conventions",
                "Report Structure",
                "Persuasive Language",
                "Proofreading & Editing",
                "Presentation Slides",
            ],
        },
    ]

    classes = create_multiple_classes(specs)

    print("\n✅ Bulk‑created classes:")
    for c in classes:
        print(c)
        print("  Syllabus preview:", c.syllabus[:3], "…\n")
