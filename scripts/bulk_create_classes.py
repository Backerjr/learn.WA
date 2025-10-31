import json
from english_classes import create_multiple_classes

with open("scripts/class_specs.json", "r", encoding="utf-8") as f:
    specs = json.load(f)

all_classes = create_multiple_classes(specs)

for cls in all_classes:
    print(cls)
