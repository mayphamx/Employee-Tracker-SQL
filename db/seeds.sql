-- delete added employees from testing
-- DELETE FROM employees WHERE id = 6;
-- DELETE FROM employees WHERE id = 7;
-- DELETE FROM roles WHERE id = 6;
-- DELETE FROM roles WHERE id = 7;
-- DELETE FROM department WHERE id = 5;
-- DELETE FROM department WHERE id = 6;

INSERT INTO department (department_name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Lead", 150000, 1),
  ("Lead Engineer", 200000, 2),
  ("Software Engineer", 300000, 2),
  ("Accountant", 100000, 3),
  ("Lawyer", 400000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Rachel", "Green", 1, null),
  ("Joey", "Tribbiani", 2, null),
  ("May", "Pham", 3, 1),
  ("Chandler", "Bing", 4, 2),
  ("Monica", "Geller", 5, 1);