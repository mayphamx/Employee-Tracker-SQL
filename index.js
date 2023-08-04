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
    pageSize: 8,
  },
])
  .then((answers) => {
    var choice = answers.homescreen;
    console.log("This is my user choice " + choice);
    if (choice == "View All Employees") {
      console.log("Please see employee information.");
      displayLoop();
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
        ])
        .then((employeeAnswer) =>{
          const firstName = employeeAnswer.firstName;
          const lastName = employeeAnswer.lastName;
          console.log("Employee First Name: " + firstName);
          console.log("Employee Last Name: " + lastName);
          displayLoop();
        })
    } else if(choice == "Update Employee Role") {
      console.log("Please update the employee role.");
      displayLoop();
    } else if(choice == "View all Roles") {
      console.log("Please see all the roles information.");
        // query.sql join statement
        const viewAllEmployeesQuery = `
            SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary
            FROM employees
            JOIN roles ON employees.role_id = roles.id
            JOIN department ON roles.department_id = department.id;
          `;
          query.query(viewAllEmployeesQuery, function (err, results) {
           if (err) throw err;

          // prints table
          console.table(results);
          })
      displayLoop();
    } else if(choice == "Add Role") {
      console.log("Please add a role.");
      displayLoop();
    } else if(choice == "View All Departments") {
      console.log("Please see the department information.");
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
