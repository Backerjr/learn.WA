# rozmoWA Project

This repository contains a Vite/React frontend scaffold and a set of Python scripts for managing English classes.

## Frontend

The frontend code is located in the `/src` directory. It is a standard Vite + React + TypeScript setup. Currently, it is an empty scaffold without dependencies or implemented components.

## Python Scripts

The Python scripts are located in the `/scripts` directory and are independent of the frontend application.

### `english_classes.py`

This module provides a library for modeling English teaching classes.

### `bulk_create_classes.py`

This script demonstrates how to use the `english_classes` module to create multiple classes from a JSON file (`class_specs.json`).

#### Usage

To run the example script, navigate to the root directory and run:

```bash
python3 scripts/bulk_create_classes.py
```
