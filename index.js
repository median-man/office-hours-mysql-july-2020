// import dependencies (mysql, inquirer, console.table)
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create a mysql connection
// display menu of user actions

/* 
Display students with department and class

SELECT CONCAT(students.firstName, " ", students.lastName) AS name, 	classes.title AS class, departments.title AS department
FROM students
INNER JOIN classes ON students.classId = classes.id
INNER JOIN departments ON classes.deptId = departments.id;

*/