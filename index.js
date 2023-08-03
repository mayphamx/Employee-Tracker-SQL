// packages needed for this application
// use inquirer for collecting input from the user
const fs = require('fs');
const inquirer = require('inquirer');
// const {Triangle, Circle, Square} = require('./lib/shapes');

// type = user response type, name = variable where answer is stored, message = question prompted in terminal
inquirer.prompt([
  {
    // TODO: WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    name: 'homescreen',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Quit'],
  },
  {
    // TODO: WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
    type: 'select????',
    name: 'viewDepartments',
    message: 'Enter up to 3 characters',
    // ! show tables
  },
  {
    // TODO: WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color',
  },
  {
    // TODO: WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    type: 'list',
    name: 'shape',
    message: 'Pick a shape',
    choices: ['Circle', 'Triangle', 'Square'],
  },
  {
    // TODO: WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color',
  },
  {
    // TODO: WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color',
  },
  {
    // TODO: WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color',
  },
  {
    // TODO: WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color',
  },
])
// WHEN I have entered input for all the prompts THEN an SVG file is created named `logo.svg`AND the output text "Generated logo.svg" is printed in the command line
.then ((data) => {
  let shape;

  // modify contents of shapes
  if (data.shape === 'Triangle') {
    shape = new Triangle(data.character.toUpperCase(),data.textColor,data.shapeColor)}
  if (data.shape === 'Circle') {
    shape = new Circle(data.character.toUpperCase(),data.textColor,data.shapeColor)} 
  if (data.shape === 'Square') {
    shape = new Square(data.character.toUpperCase(),data.textColor,data.shapeColor)}

  // create logo file and throw error
  fs.writeFile("./examples/logo.svg", shape.render(), (err, result)=> {
    // ??? how to test error ???
    err ? console.log(err) : console.log('Generated logo.svg');
  });
});