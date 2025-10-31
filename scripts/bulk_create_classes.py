import json
from pathlib import Path
from english_classes import create_multiple_classes

# Correctly locate the JSON file relative to the script's location
SPECS_PATH = Path(__file__).parent / "class_specs.json"

with open(SPECS_PATH, "r", encoding="utf-8") as f:
    specs = json.load(f)

all_classes = create_multiple_classes(specs)
for cls in all_classes:
    print(f"Created: {cls.name} with {cls.teacher}")
