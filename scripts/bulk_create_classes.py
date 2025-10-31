import json
from english_classes import create_multiple_classes

# Suppose you have a JSON file that looks like:
# [
#   {"name":"A1 Listening", "level":"Beginner", "teacher":"Sara", ...},
#   {"name":"B2 Academic Writing", "level":"Upper‑Intermediate", "teacher":"Tom", ...}
# ]
with open("class_specs.json", "r", encoding="utf-8") as f:
    specs = json.load(f)

all_classes = create_multiple_classes(specs)

for cls in all_classes:
    print(cls)
