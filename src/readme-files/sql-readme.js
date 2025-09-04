export const sqlContent = {
  title: "SQL Database Programming",
  description: "Master SQL with practical examples",
  content: `# SQL Programming Guide

## 1. Database Basics

### What is SQL?
SQL (Structured Query Language) - language for managing relational databases

### Key Concepts
- Database: Collection of tables
- Table: Collection of rows and columns
- Row: Single record
- Column: Field/attribute
- Primary Key: Unique identifier for each row
- Foreign Key: Reference to another table's primary key

---

## 2. Data Types

### Common Data Types
INT, INTEGER          -- Whole numbers: 1, 100, -50
VARCHAR(n)            -- Variable text: 'John', 'Hello World'
CHAR(n)              -- Fixed-length text: 'ABC   '
DECIMAL(p,s)         -- Precise decimal: 123.45
FLOAT, REAL          -- Approximate decimal numbers
DATE                 -- Date: '2024-03-15'
DATETIME, TIMESTAMP  -- Date + Time: '2024-03-15 14:30:00'
BOOLEAN              -- True/False values
TEXT                 -- Large text fields

---

## 3. Creating Tables

### Basic Table Creation
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT
);

### Table with Constraints
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    manager_id INT,
    budget DECIMAL(15,2) DEFAULT 100000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### Foreign Key Relationships
ALTER TABLE employees 
ADD CONSTRAINT fk_department 
FOREIGN KEY (department_id) REFERENCES departments(id);

---

## 4. INSERT - Adding Data

### Single Record
INSERT INTO employees (first_name, last_name, email, salary)
VALUES ('John', 'Doe', 'john.doe@email.com', 75000.00);

### Multiple Records
INSERT INTO employees (first_name, last_name, email, salary, hire_date)
VALUES 
    ('Alice', 'Smith', 'alice@email.com', 80000.00, '2024-01-15'),
    ('Bob', 'Johnson', 'bob@email.com', 65000.00, '2024-02-01'),
    ('Carol', 'Wilson', 'carol@email.com', 90000.00, '2024-01-20');

### Insert from Another Table
INSERT INTO backup_employees (name, salary)
SELECT CONCAT(first_name, ' ', last_name), salary
FROM employees WHERE salary > 70000;

---

## 5. SELECT - Reading Data

### Basic SELECT
SELECT * FROM employees;                    -- All columns
SELECT first_name, last_name FROM employees; -- Specific columns
SELECT DISTINCT department_id FROM employees; -- Unique values

### WHERE Clause
SELECT * FROM employees WHERE salary > 70000;
SELECT * FROM employees WHERE department_id = 1;
SELECT * FROM employees WHERE hire_date >= '2024-01-01';

### Multiple Conditions
SELECT * FROM employees 
WHERE salary > 60000 AND department_id = 2;

SELECT * FROM employees 
WHERE salary < 50000 OR salary > 100000;

SELECT * FROM employees 
WHERE department_id IN (1, 2, 3);

SELECT * FROM employees 
WHERE salary BETWEEN 60000 AND 80000;

SELECT * FROM employees 
WHERE first_name LIKE 'J%';        -- Starts with 'J'
SELECT * FROM employees 
WHERE email LIKE '%@gmail.com';    -- Ends with '@gmail.com'

### Sorting
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY last_name, first_name;
SELECT * FROM employees ORDER BY hire_date ASC;

### Limiting Results
SELECT * FROM employees LIMIT 10;              -- First 10 records
SELECT * FROM employees LIMIT 10 OFFSET 20;    -- Skip 20, get next 10

---

## 6. UPDATE - Modifying Data

### Single Record Update
UPDATE employees 
SET salary = 82000 
WHERE id = 1;

### Multiple Fields Update
UPDATE employees 
SET salary = 85000, department_id = 2 
WHERE id = 3;

### Conditional Update
UPDATE employees 
SET salary = salary * 1.1 
WHERE hire_date < '2024-01-01';

### Update with Calculations
UPDATE employees 
SET salary = CASE 
    WHEN salary < 60000 THEN salary * 1.15
    WHEN salary < 80000 THEN salary * 1.10
    ELSE salary * 1.05
END;

---

## 7. DELETE - Removing Data

### Delete Specific Records
DELETE FROM employees WHERE id = 1;
DELETE FROM employees WHERE salary < 50000;

### Delete with Conditions
DELETE FROM employees 
WHERE hire_date < '2023-01-01' AND department_id IS NULL;

### Delete All Records (Keep Table Structure)
DELETE FROM employees;

---

## 8. JOINs - Combining Tables

### Sample Data Setup
INSERT INTO departments (name, manager_id) VALUES
('Engineering', 1),
('Marketing', 2),
('Sales', 3);

### INNER JOIN - Only Matching Records
SELECT e.first_name, e.last_name, d.name as department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

### LEFT JOIN - All Records from Left Table
SELECT e.first_name, e.last_name, d.name as department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

### RIGHT JOIN - All Records from Right Table
SELECT e.first_name, e.last_name, d.name as department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

### FULL OUTER JOIN - All Records from Both Tables
SELECT e.first_name, e.last_name, d.name as department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

### Multiple Table JOIN
SELECT e.first_name, e.last_name, d.name as dept, m.first_name as manager
FROM employees e
JOIN departments d ON e.department_id = d.id
JOIN employees m ON d.manager_id = m.id;

---

## 9. Aggregate Functions

### Basic Aggregates
SELECT COUNT(*) as total_employees FROM employees;
SELECT COUNT(department_id) as assigned_employees FROM employees;
SELECT AVG(salary) as average_salary FROM employees;
SELECT MIN(salary) as lowest_salary FROM employees;
SELECT MAX(salary) as highest_salary FROM employees;
SELECT SUM(salary) as total_payroll FROM employees;

### GROUP BY
SELECT department_id, COUNT(*) as employee_count
FROM employees
GROUP BY department_id;

SELECT department_id, AVG(salary) as avg_salary, COUNT(*) as count
FROM employees
GROUP BY department_id;

### HAVING - Filtering Groups
SELECT department_id, COUNT(*) as employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;

SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 70000;

---

## 10. Subqueries

### WHERE Subquery
SELECT * FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);

SELECT * FROM employees 
WHERE department_id IN (
    SELECT id FROM departments WHERE name = 'Engineering'
);

### FROM Subquery
SELECT dept_stats.department_id, dept_stats.avg_salary
FROM (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
) as dept_stats
WHERE dept_stats.avg_salary > 70000;

### EXISTS Subquery
SELECT * FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e 
    WHERE e.department_id = d.id
);

---

## 11. String Functions

SELECT 
    CONCAT(first_name, ' ', last_name) as full_name,
    UPPER(first_name) as upper_name,
    LOWER(last_name) as lower_name,
    LENGTH(email) as email_length,
    SUBSTRING(email, 1, 5) as email_start,
    REPLACE(email, '@gmail.com', '@company.com') as company_email
FROM employees;

### Date Functions
SELECT 
    hire_date,
    YEAR(hire_date) as hire_year,
    MONTH(hire_date) as hire_month,
    DATEDIFF(CURDATE(), hire_date) as days_employed,
    DATE_ADD(hire_date, INTERVAL 1 YEAR) as first_anniversary
FROM employees;

---

## 12. Window Functions

### ROW_NUMBER, RANK, DENSE_RANK
SELECT 
    first_name, last_name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,
    RANK() OVER (ORDER BY salary DESC) as salary_rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank
FROM employees;

### Partition By
SELECT 
    first_name, last_name, department_id, salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as dept_rank,
    AVG(salary) OVER (PARTITION BY department_id) as dept_avg_salary
FROM employees;

### LAG and LEAD
SELECT 
    first_name, salary,
    LAG(salary) OVER (ORDER BY salary) as prev_salary,
    LEAD(salary) OVER (ORDER BY salary) as next_salary
FROM employees;

---

## 13. Indexes

### Creating Indexes
CREATE INDEX idx_email ON employees(email);
CREATE INDEX idx_dept_salary ON employees(department_id, salary);
CREATE UNIQUE INDEX idx_unique_email ON employees(email);

### Viewing Indexes
SHOW INDEX FROM employees;

### Dropping Indexes
DROP INDEX idx_email ON employees;

---

## 14. Views

### Creating Views
CREATE VIEW employee_details AS
SELECT 
    e.id, e.first_name, e.last_name, e.email, e.salary,
    d.name as department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

### Using Views
SELECT * FROM employee_details WHERE salary > 70000;

### Updating Views
CREATE OR REPLACE VIEW high_earners AS
SELECT * FROM employees WHERE salary > 80000;

### Dropping Views
DROP VIEW employee_details;

---

## 15. Common Table Expressions (CTE)

### Basic CTE
WITH dept_averages AS (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT e.first_name, e.salary, da.avg_salary
FROM employees e
JOIN dept_averages da ON e.department_id = da.department_id
WHERE e.salary > da.avg_salary;

### Recursive CTE
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, first_name, last_name, manager_id, 0 as level
    FROM employees WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees reporting to managers
    SELECT e.id, e.first_name, e.last_name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, first_name;

---

## 16. Stored Procedures

### Basic Stored Procedure
DELIMITER //
CREATE PROCEDURE GetEmployeesByDept(IN dept_id INT)
BEGIN
    SELECT * FROM employees WHERE department_id = dept_id;
END //
DELIMITER ;

-- Call the procedure
CALL GetEmployeesByDept(1);

### Procedure with Output Parameter
DELIMITER //
CREATE PROCEDURE GetEmployeeCount(IN dept_id INT, OUT emp_count INT)
BEGIN
    SELECT COUNT(*) INTO emp_count 
    FROM employees 
    WHERE department_id = dept_id;
END //
DELIMITER ;

-- Call with output
CALL GetEmployeeCount(1, @count);
SELECT @count as employee_count;

---

## 17. Transactions

### Basic Transaction
START TRANSACTION;

UPDATE employees SET salary = salary * 1.1 WHERE department_id = 1;
INSERT INTO salary_history (employee_id, old_salary, new_salary, change_date) 
VALUES (1, 70000, 77000, NOW());

COMMIT;  -- Save changes
-- or ROLLBACK;  -- Undo changes

### Transaction with Error Handling
START TRANSACTION;

-- Complex operations here
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

-- Check if both accounts exist and have sufficient funds
IF (SELECT COUNT(*) FROM accounts WHERE id IN (1,2)) = 2 
   AND (SELECT balance FROM accounts WHERE id = 1) >= 0 THEN
    COMMIT;
ELSE
    ROLLBACK;
END IF;

---

## 18. Performance Tips

### Indexing Strategy
-- Index frequently queried columns
CREATE INDEX idx_last_name ON employees(last_name);

-- Composite index for multiple column queries
CREATE INDEX idx_dept_salary ON employees(department_id, salary);

### Query Optimization
-- Use LIMIT to reduce result sets
SELECT * FROM employees ORDER BY salary DESC LIMIT 10;

-- Use specific columns instead of SELECT *
SELECT first_name, last_name, salary FROM employees;

-- Use WHERE to filter early
SELECT * FROM employees WHERE department_id = 1 ORDER BY salary;

### EXPLAIN Query Plans
EXPLAIN SELECT * FROM employees WHERE salary > 70000;
EXPLAIN SELECT e.*, d.name FROM employees e JOIN departments d ON e.department_id = d.id;`
};