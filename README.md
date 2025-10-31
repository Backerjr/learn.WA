# rozmoWA

This is a Vite + React project.

## Python Scripts

This repository also includes a set of Python scripts for managing English classes. These scripts are located in the `/scripts` directory and are independent of the frontend application.

### `english_classes.py`

This module provides a small library for modeling "English teaching classes." It includes:

*   `EnglishClass`: A dataclass for storing class information.
*   `create_english_class`: A factory function to create `EnglishClass` instances with validation.
*   `create_multiple_classes`: A wrapper to build multiple classes from a list of specifications.
*   `default_syllabus_for_level`: A function to generate a starter syllabus for a given class level.

### `bulk_create_classes.py`

This script provides an example of how to use the `english_classes` module to create multiple classes in bulk from a JSON file.

#### Usage

To run the bulk creation script, you will need a `class_specs.json` file in the `scripts` directory. An example file is provided. From the `scripts` directory, run:

```bash
python bulk_create_classes.py
```
