export const pythonContent = {
  title: "Python Programming",
  description: "Learn Python with practical examples",
  content: `# Python Programming Guide

## Table of Contents
1. [Variables & Data Types](#1-variables--data-types)
2. [Lists](#2-lists)
3. [Tuples](#3-tuples)
4. [Dictionaries](#4-dictionaries)
5. [Sets](#5-sets)
6. [Control Flow](#6-control-flow)
7. [Functions](#7-functions)
8. [Classes & Objects](#8-classes--objects)
9. [File Handling](#9-file-handling)
10. [Error Handling](#10-error-handling)
11. [Pandas](#11-pandas)
12. [NumPy](#12-numpy)
13. [Common Libraries](#13-common-libraries)

---

## 1. Variables & Data Types

### Theory
Python supports various data types including numbers (int, float, complex), strings, and booleans. Variables are dynamically typed, meaning you don't need to declare their type explicitly.

### Code Examples

\`\`\`python
# Numbers
age = 25
price = 99.99
complex_num = 3 + 4j

# Strings
name = "Python"
message = f"Hello {name}!"  # f-string
text = "hello world"
print(text.upper())         # HELLO WORLD
print(text.split())         # ['hello', 'world']
\`\`\`

---

## 2. Lists - Ordered, Mutable Collection

### Theory
Lists are ordered, mutable collections that can store multiple items. They allow duplicate elements and support indexing, slicing, and various methods for manipulation.

### Code Examples

\`\`\`python
# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["text", 123, True]

# List operations
fruits.append("grape")           # Add to end
fruits.insert(0, "mango")       # Insert at index
fruits.remove("banana")         # Remove by value
first = fruits[0]               # Access by index
last = fruits[-1]               # Last element

# List methods
print(len(fruits))              # Length
print("apple" in fruits)        # Check membership
fruits.sort()                   # Sort in place
fruits.reverse()                # Reverse

# List slicing
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])             # [1, 2, 3]
print(numbers[:3])              # [0, 1, 2]
print(numbers[2:])              # [2, 3, 4, 5]

# List comprehension
squares = [x**2 for x in range(5)]          # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0] # [0, 2, 4, 6, 8]
\`\`\`

---

## 3. Tuples - Ordered, Immutable Collection

### Theory
Tuples are ordered, immutable collections. Once created, their elements cannot be changed. They're useful for storing related data that shouldn't be modified.

### Code Examples

\`\`\`python
# Creating tuples
coordinates = (10, 20)
colors = ("red", "green", "blue")
single = (42,)                  # Note the comma

# Accessing elements
x, y = coordinates              # Unpacking
print(colors[0])                # red
print(len(colors))              # 3

# Tuple methods
numbers = (1, 2, 2, 3, 2)
print(numbers.count(2))         # 3
print(numbers.index(3))         # 3
\`\`\`

---

## 4. Dictionaries - Key-Value Pairs

### Theory
Dictionaries store data as key-value pairs. They're unordered (in Python 3.7+ they maintain insertion order), mutable, and don't allow duplicate keys.

### Code Examples

\`\`\`python
# Creating dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Dictionary operations
print(person["name"])           # Alice
person["age"] = 31              # Update value
person["country"] = "USA"       # Add new key
del person["city"]              # Delete key

# Dictionary methods
print(person.keys())            # dict_keys(['name', 'age', 'country'])
print(person.values())          # dict_values(['Alice', 31, 'USA'])
print(person.items())           # key-value pairs

# Safe access
print(person.get("phone", "N/A"))  # Returns "N/A" if key not found

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
\`\`\`

---

## 5. Sets - Unique Elements

### Theory
Sets are unordered collections of unique elements. They automatically eliminate duplicates and support mathematical set operations like union, intersection, and difference.

### Code Examples

\`\`\`python
# Creating sets
fruits = {"apple", "banana", "orange"}
numbers = {1, 2, 3, 4, 5}

# Set operations
fruits.add("grape")             # Add element
fruits.remove("banana")         # Remove element
fruits.discard("kiwi")          # Remove if exists (no error)

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))         # {1, 2, 3, 4, 5}
print(set1.intersection(set2))  # {3}
print(set1.difference(set2))    # {1, 2}
\`\`\`

---

## 6. Control Flow

### Theory
Control flow statements determine the order in which code is executed. Python uses indentation to define code blocks instead of braces.

### Code Examples

\`\`\`python
# If-Else
age = 18
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teen")
else:
    print("Child")

# Loops
# For loop
for i in range(5):              # 0, 1, 2, 3, 4
    print(i)

for fruit in fruits:
    print(fruit)

# While loop
count = 0
while count < 3:
    print(count)
    count += 1
\`\`\`

---

## 7. Functions

### Theory
Functions are reusable blocks of code that perform specific tasks. They can accept parameters, have default values, and return results. Python supports both regular functions and lambda (anonymous) functions.

### Code Examples

\`\`\`python
def greet(name, title="Mr."):
    return f"Hello {title} {name}!"

def calculate(*args, **kwargs):
    total = sum(args)
    print(f"Sum: {total}")
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Function calls
print(greet("Smith"))                           # Hello Mr. Smith!
print(greet("Johnson", "Dr."))                  # Hello Dr. Johnson!
calculate(1, 2, 3, name="Alice", age=30)

# Lambda functions
square = lambda x: x**2
add = lambda x, y: x + y

numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))            # [1, 4, 9, 16, 25]
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]
\`\`\`

---

## 8. Classes & Objects

### Theory
Object-Oriented Programming (OOP) allows you to create custom data types (classes) that encapsulate data and behavior. Classes support inheritance, allowing you to create specialized versions of existing classes.

### Code Examples

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"I'm {self.name}, {self.age} years old"
    
    def birthday(self):
        self.age += 1

# Creating objects
person1 = Person("Alice", 25)
print(person1.introduce())      # I'm Alice, 25 years old
person1.birthday()
print(person1.age)              # 26

# Inheritance
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
        self.courses = []
    
    def enroll(self, course):
        self.courses.append(course)

student = Student("Bob", 20, "S001")
student.enroll("Python")
print(student.courses)          # ['Python']
\`\`\`

---

## 9. File Handling

### Theory
Python provides built-in functions for reading and writing files. The \`with\` statement ensures proper file handling by automatically closing files even if an error occurs.

### Code Examples

\`\`\`python
# Reading files
with open('file.txt', 'r') as f:
    content = f.read()          # Read entire file
    # OR
    lines = f.readlines()       # Read as list of lines

# Writing files
data = ["Line 1", "Line 2", "Line 3"]
with open('output.txt', 'w') as f:
    for line in data:
        f.write(line + '\\n')

# JSON handling
import json

data = {"name": "Alice", "age": 30}
# Write JSON
with open('data.json', 'w') as f:
    json.dump(data, f)

# Read JSON
with open('data.json', 'r') as f:
    loaded_data = json.load(f)
\`\`\`

---

## 10. Error Handling

### Theory
Exception handling allows your program to gracefully handle errors without crashing. Python uses try-except blocks to catch and handle specific types of errors.

### Code Examples

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Always executed")

# Custom exceptions
class CustomError(Exception):
    pass

def validate_age(age):
    if age < 0:
        raise CustomError("Age cannot be negative")
\`\`\`

---

## 11. Pandas - Data Analysis

### Theory
Pandas is a powerful data analysis library that provides data structures like DataFrame for handling structured data. It's essential for data cleaning, manipulation, and analysis.

### Code Examples

\`\`\`python
import pandas as pd

# Creating DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Salary': [50000, 60000, 70000]
}
df = pd.DataFrame(data)

# Basic operations
print(df.head())                # First 5 rows
print(df.info())                # DataFrame info
print(df.describe())            # Statistical summary

# Accessing data
print(df['Name'])               # Column
print(df.iloc[0])               # First row
print(df.loc[df['Age'] > 25])   # Filter rows

# Data manipulation
df['Bonus'] = df['Salary'] * 0.1    # New column
df_sorted = df.sort_values('Age')   # Sort by column
df_grouped = df.groupby('Age').mean()  # Group by

# Reading/Writing files
df = pd.read_csv('data.csv')
df.to_csv('output.csv', index=False)

# Common operations
df.drop_duplicates()            # Remove duplicates
df.fillna(0)                   # Fill missing values
df.dropna()                    # Drop missing values
\`\`\`

---

## 12. NumPy - Numerical Computing

### Theory
NumPy is the foundation of scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with mathematical functions to operate on them efficiently.

### Code Examples

\`\`\`python
import numpy as np

# Creating arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.zeros((3, 3))         # 3x3 zeros
arr3 = np.ones((2, 4))          # 2x4 ones
arr4 = np.arange(0, 10, 2)      # [0, 2, 4, 6, 8]

# Array operations
print(arr1 + 10)                # Add 10 to each element
print(arr1 * 2)                 # Multiply each by 2
print(arr1 ** 2)                # Square each element

# Matrix operations
matrix = np.array([[1, 2], [3, 4]])
print(matrix.T)                 # Transpose
print(np.dot(matrix, matrix))   # Matrix multiplication

# Statistical operations
data = np.array([1, 2, 3, 4, 5])
print(np.mean(data))            # 3.0
print(np.std(data))             # Standard deviation
print(np.max(data))             # 5
\`\`\`

---

## 13. Common Libraries

### Theory
Python's standard library and third-party packages provide extensive functionality for various tasks including date/time handling, random number generation, mathematical operations, and specialized data structures.

### Code Examples

\`\`\`python
# Datetime
from datetime import datetime, timedelta
now = datetime.now()
tomorrow = now + timedelta(days=1)
formatted = now.strftime("%Y-%m-%d %H:%M:%S")

# Random
import random
print(random.randint(1, 100))       # Random integer
print(random.choice(['a', 'b', 'c']))  # Random choice
random.shuffle([1, 2, 3, 4, 5])    # Shuffle list

# Collections
from collections import Counter, defaultdict
text = "hello world"
counter = Counter(text)             # Character frequency
print(counter.most_common(3))       # Top 3 most common

# Math
import math
print(math.sqrt(16))                # 4.0
print(math.pi)                      # 3.14159...
print(math.factorial(5))            # 120
\`\`\`

---

## Getting Started

1. **Install Python**: Download from [python.org](https://python.org)
2. **Install required packages**: \`pip install pandas numpy\`
3. **Start coding**: Copy any of the code examples above and run them in your Python environment

## Best Practices

- Use meaningful variable names
- Follow PEP 8 style guidelines
- Write docstrings for functions and classes
- Handle exceptions appropriately
- Use list comprehensions for simple operations
- Prefer \`with\` statements for file operations`
};