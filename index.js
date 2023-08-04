// packages needed for this application; use inquirer for collecting input from the user
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const query = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'company_db'
});

// type = user response type, name = variable where answer is stored, message = question prompted in terminal
function displayLoop() {
  inquirer.prompt([
    {
      // TODO: WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    name: 'homescreen',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Employees', 
      'Add Employee', 
      'Update Employee Role', 
      'View all Roles', 
      'Add Role', 
      'View All Departments', 
      'Add Department', 
      'Quit'],
  },
])
  .then((answers) => {
    var choice = answers.homescreen;
    console.log("This is my user choice " + choice);
    if (choice == "View All Employees") {
      console.log("Please see employee information.");
        // query.sql join statement
        const viewAllEmployees =
        `SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager 
        FROM employees 
        JOIN roles ON employees.role_id = roles.id 
        JOIN department ON roles.department_id = department.id 
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`;

        query.query(viewAllEmployees, function (err, results) {
          if (err) throw err;

        // prints table
        console.table(results);
        displayLoop();
        })
    } else if(choice == "Add Employee") {
        console.log("Please add an employee!");
        inquirer.prompt([
          {
              type: "input",
              name: "firstName",
              message: "Please enter employee first name!"
          },
          {
              type: "input",
              name: "lastName",
              message: "Please enter employee last name!"
          },
          {
              type: "list",
              name: "roleID",
              message: "Please select an employee role.",
              choices: ["Sales Lead", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer"]
          },
        ])
        .then((employeeAnswer) =>{
          const firstName = employeeAnswer.firstName;
          const lastName = employeeAnswer.lastName;
          const userRoleChoice = employeeAnswer.roleID;

          if (userRoleChoice === "Sales Lead") {
            idNumber = 1;
          } else if (userRoleChoice === "Lead Engineer") {
            idNumber = 2;
          } else if (userRoleChoice === "Software Engineer") {
            idNumber = 3;
          } else if (userRoleChoice === "Accountant") {
            idNumber = 4;
          } else if (userRoleChoice === "Lawyer") {
            idNumber = 5;
          }
          displayLoop();
        })
    } else if(choice == "Update Employee Role") {
      console.log("Please update the employee role.");
      displayLoop();
    } else if(choice == "View all Roles") {
        console.log("Please see all the roles information.");
        // query.sql join statement
        const viewAllRoles =
          `SELECT roles.id AS id, roles.title AS title,department.department_name AS department, roles.salary AS salary
          FROM roles
          JOIN department ON department.id = roles.department_id;`;

          query.query(viewAllRoles, function (err, results) {
            if (err) throw err;

          // prints table
          console.table(results);
          displayLoop();
          })
    } else if(choice == "Add Role") {
      console.log("Please add a role.");
      displayLoop();
    } else if(choice == "View All Departments") {
      console.log("Please see the department information.");
        // query.sql join statement

        const viewDepartment =
        `SELECT * FROM department`;

        query.query(viewDepartment, function (err, results) {
          if (err) throw err;

        // prints table
        console.table(results);
        displayLoop();
        })
      displayLoop();
    } else if(choice == "Add Department") {
      console.log("Please add a department.");
      displayLoop();
    } else if(choice == "Quit") {
      console.log("Goodbye!");
      return;
    }
  })
}
displayLoop();
