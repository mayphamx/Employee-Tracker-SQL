-- VIEWS ALL ROLES (ID/TITLE/DEPARTMENT/SALARY)
SELECT roles.id AS id, roles.title AS title,department.department_name AS department, roles.salary AS salary
-- reviews are JOINING reviews
FROM roles
JOIN department ON department.id = roles.department_id;

-- VIEWS ALL EMPLOYEES (ID/FIRSTNAME/LASTNAME/TITLE/DEPARTMENT/SALARY/MANAGER)
SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
-- reviews are JOINING reviews
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN department ON roles.department_id = department.id
LEFT JOIN employees AS managers ON employees.manager_id = managers.id;