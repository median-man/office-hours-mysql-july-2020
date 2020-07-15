// import dependencies (mysql, inquirer, console.table)
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create a mysql connection
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "school_db",
});

connection.connect((err) => {
  if (err) {
    console.log("Unable to connect to data source. Good bye.");
  } else {
    mainMenu();
  }
});

const VIEW_STUDENTS = "View Students";

// display menu of user actions
function mainMenu() {
  return inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Choose a task:",
      choices: [VIEW_STUDENTS, "EXIT"],
    })
    .then((answer) => {
      if (answer.action === VIEW_STUDENTS) {
        return viewStudents();
      } else {
        connection.end();
      }
    })
    .catch((error) => {
      console.log(error);
      connection.end();
    });
  }
  
  function viewStudents() {
    // query db for students joined with classes and departments
    const sqlString = `
      SELECT
        CONCAT(students.firstName, " ", students.lastName) AS Name,
        classes.title AS Class,
        departments.title AS Department
      FROM students
      INNER JOIN classes ON students.classId = classes.id
      INNER JOIN departments ON classes.deptId = departments.id;
    `;
    connection.query(sqlString, (error, results) => {
      // display the results a formatted table
      if (error) {
        throw error;
      }
      console.table(results);
      // go back to the menu
      mainMenu();
    });

}

/* 
Display students with department and class

SELECT CONCAT(students.firstName, " ", students.lastName) AS name, 	classes.title AS class, departments.title AS department
FROM students
INNER JOIN classes ON students.classId = classes.id
INNER JOIN departments ON classes.deptId = departments.id;

*/