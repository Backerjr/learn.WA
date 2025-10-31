#!/usr/bin/env python3
import re
from dataclasses import dataclass, field
from typing import List, Dict, Iterable, Optional, Union, Any

VALID_LEVELS = {"Beginner", "Elementary", "Pre‑Intermediate", "Intermediate", "Upper‑Intermediate", "Advanced", "Proficient"}
VALID_DAYS = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}

@dataclass
class EnglishClass:
    name: str
    level: str
    teacher: str
    days: List[str]
    start_time: str
    end_time: str
    capacity: int
    syllabus: List[str] = field(default_factory=list)
    students: List[str] = field(default_factory=list, init=False)

    def __post_init__(self):
        if self.level not in VALID_LEVELS: raise ValueError(f"Invalid level: {self.level}")
        self.days = [d.strip().capitalize() for d in self.days]
        if any(d not in VALID_DAYS for d in self.days): raise ValueError(f"Invalid days: {self.days}")
        if not re.match(r"^(?:[01]\d|2[0-3]):[0-5]\d$", self.start_time): raise ValueError(f"Invalid start_time: {self.start_time}")
        if not re.match(r"^(?:[01]\d|2[0-3]):[0-5]\d$", self.end_time): raise ValueError(f"Invalid end_time: {self.end_time}")
        if self.end_time <= self.start_time: raise ValueError("end_time must be after start_time")
        if not isinstance(self.capacity, int) or self.capacity <= 0: raise ValueError("capacity must be a positive integer")

    def add_student(self, name: str) -> bool:
        if len(self.students) >= self.capacity: return False
        if name not in self.students: self.students.append(name)
        return True

def create_english_class(**kwargs) -> EnglishClass:
    if isinstance(kwargs.get("days"), str):
        kwargs["days"] = [d.strip() for d in re.split(r"[,;]+", kwargs["days"])]
    return EnglishClass(**kwargs)

def create_multiple_classes(specs: Iterable[Dict[str, Any]]) -> List[EnglishClass]:
    return [create_english_class(**spec) for spec in specs]
