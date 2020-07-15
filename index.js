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

// List of constants for the different main menu action options
const VIEW_STUDENTS = "View Students";
const UPDATE_STUDENT_CLASS = "Update student class";

// display menu of user actions
function mainMenu() {
  return inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Choose a task:",
      choices: [VIEW_STUDENTS, UPDATE_STUDENT_CLASS, "EXIT"],
    })
    .then((answer) => {
      if (answer.action === VIEW_STUDENTS) {
        return viewStudents();
      } else if (answer.action === UPDATE_STUDENT_CLASS) {
        return updateStudentClass();
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

function updateStudentClass() {
  // get all the students
  const studentsSql = `
    SELECT
      students.id AS ID,
      CONCAT(students.firstName, " ", students.lastName) AS Name,
      classes.title AS Class,
      departments.title AS Department
    FROM students
    INNER JOIN classes ON students.classId = classes.id
    INNER JOIN departments ON classes.deptId = departments.id;
  `;
  connection.query(studentsSql, (error, studentRows) => {
    // display the results a formatted table
    if (error) {
      throw error;
    }
    console.table(studentRows);
    inquirer
      .prompt({
        name: "studentId",
        type: "input",
        message: "Enter student id:",
      })
      .then((studentChoiceAnswers) => {
        connection.query("SELECT * FROM classes;", (error, results) => {
          console.table(results);
          inquirer
            .prompt({
              name: "classId",
              type: "input",
              message: "Enter class id:",
            })
            .then((classChoiceAnswers) => {
              const studentId = studentChoiceAnswers.studentId;
              const classId = classChoiceAnswers.classId;
              connection.query(
                "UPDATE students SET classId = ? WHERE id = ?;",
                [classId, studentId],
                (error, results) => {
                  mainMenu();
                }
              );
            });
        });
      });
  });
}
