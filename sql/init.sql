CREATE DATABASE IF NOT EXISTS employees_db;
USE employees_db;
CREATE TABLE IF NOT EXISTS EMPLOYEES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(255) NOT NULL,
    emp_contact VARCHAR(255) NOT NULL,
    emp_add TEXT NOT NULL
);
