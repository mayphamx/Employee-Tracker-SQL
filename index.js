// packages needed for this application; use inquirer for collecting input from the user
const fs = require('fs');
const { connect } = require('http2');
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
    if (choice == "View All Employees") {
      console.log("VIEW ALL EMPLOYEES");
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
        console.log("ADD EMPLOYEE");
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
          {
              type: "list",
              name: "manager",
              message: "Please select manager.",
              choices: ["Rachel Green", "Joey Tribbiani"]
          },
        ])
        .then((employeeAnswer) => {
          const firstName = employeeAnswer.firstName;
          const lastName = employeeAnswer.lastName;
          const userRoleChoice = employeeAnswer.roleID;
          const userManagerChoice = employeeAnswer.manager;

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
          
          if (userManagerChoice === "Rachel Green") {
            idManager = 1;
          } else if (userManagerChoice === "Joey Tribbiani") {
            idManager = 2;
          }

          const addEmployeeInformation = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
          query.query(
              addEmployeeInformation,[firstName, lastName, idNumber, idManager],
              function (err, insertResult)
              {
                if (err) throw err;
                console.log("SUCCESS, NEW EMPLOYEE ADDED!");
                displayLoop();
              }
          )
        })
    } else if (choice == "Update Employee Role") {
        console.log("UPDATE EMPLOYEE ROLE");
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Please select an employee.",
                choices: ["Rachel Green", "Joey Tribbiani", "May Pham", "Chandler Bing", "Monica Geller"]
            },
            {
                type: "list",
                name: "role",
                message: "Please select a role",
                choices: ["Sales Lead", "Lead Engineer", "Software Engineer", "Lawyer", "Accountant"]
            }
        ])
        .then((updateAnswer) => {
            const updateEmployee = updateAnswer.employee;
            const selectedRole = updateAnswer.role;

            if (selectedRole == "Sales Lead") {
                idRoles = 1;
            } else if (selectedRole == "Lead Engineer") {
                idRoles = 2;
            } else if (selectedRole == "Software Engineer") {
                idRoles = 3;
            } else if (selectedRole == "Accountant") {
                idRoles = 4;
            } else if (selectedRole == "Lawyer") {
                idRoles = 5;
            }
            const updateEmployeeInformation =
              `UPDATE employees
              SET role_id = ?
              WHERE CONCAT(first_name, ' ', last_name) = ?;`;

            query.query(updateEmployeeInformation, [idRoles, updateEmployee], function (err, updateResult) {
                if (err) throw err;
                console.log("SUCCESS, EMPLOYEE ROLE UPDATED!");
                displayLoop();
            });
        });
    
    } else if(choice == "View all Roles") {
        console.log("VIEW ALL ROLES");
        // query.sql join statement
        const viewAllRoles =
          `SELECT roles.id AS id, roles.title AS title,department.department_name AS department, roles.salary AS salary
          FROM roles
          JOIN department ON department.id = roles.department_id;`;

          query.query(viewAllRoles, function (err, results) {
            if (err) throw err;
            console.table(results);
            displayLoop();
            }
          )
    } else if(choice == "Add Role") {
      console.log("ADD ROLE");
      inquirer.prompt([
          {
              type: "input",
              name: "roleTitle",
              message: "Please add a new role."
          },
          {
              type: "number",
              name: "salary",
              message: "Please add a salary."
          },
          {
              type: "list",
              name: "department",
              choices: ["Sales", "Engineering", "Finance", "Legal"]
          },
          ])
        .then((employeeAnswer) => {
          const roleTitle = employeeAnswer.roleTitle;
          const salary = employeeAnswer.salary;
          const department = employeeAnswer.department;
          
          if (department === "Sales") {
            idDepartment = 1;
          } else if (department === "Engineering") {
            idDepartment = 2;
          } else if (department === "Finance") {
            idDepartment = 3;
          } else if (department === "Legal") {
            idDepartment = 4;
          }

          const addRole = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
          query.query(
              addRole,[roleTitle, salary, idDepartment],
              function (err, insertResult)
              {
                if (err) throw err;
                console.log("SUCCESS, NEW ROLE ADDED!");
                displayLoop();
              }
          )
        })
    } else if(choice == "View All Departments") {
      console.log("VIEW ALL DEPARTMENTS");
        // query.sql join statement

        const viewDepartment =
        `SELECT * FROM department`;

        query.query(viewDepartment, function (err, results) {
          if (err) throw err;

        // prints table
        console.table(results);
        displayLoop();
        })
    } else if(choice == "Add Department") {
      console.log("ADD DEPARTMENT");

      inquirer.prompt([
          {
              type: "input",
              name: "departmentName",
              message: "Please add a new department."
          },
          ])
        .then((employeeAnswer) => {
          const departmentName = employeeAnswer.departmentName;

          const addDepartment = `INSERT INTO department (department_name) VALUES (?)`;
          query.query(
              addDepartment,[departmentName],
              function (err, insertResult)
              {
                if (err) throw err;
                console.log("SUCCESS, NEW DEPARTMENT ADDED!");
                displayLoop();
              }
          )
        })
    } else if(choice == "Quit") {
      console.log("GOODBYE FRIEND!");
      return;
    }
  })
}
displayLoop();
