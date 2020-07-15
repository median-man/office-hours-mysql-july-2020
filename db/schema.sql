drop database if exists school_db;
create database school_db;
use school_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE classes (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    deptId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (deptId) REFERENCES departments(id)
);

CREATE TABLE students (
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    classId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (classId)
        REFERENCES classes (id)
);
