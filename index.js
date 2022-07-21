const inquire = require("inquire");
const conTable = require("console.table")

const db = require("connection")

const startDb = () => {
    inquire.prompt([
        {
            list: "lsit",
            name: "selection",
            message: "What Would You Like To Do",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add an empoyee",
                "add a role",
                "update employee role"
            ],
        },
    ])

.then(({ selection }) => {
    if (selection === "view all departments"){
        viewDept();
} 
    else if (selection === "view all roles"){
        viewRoles();
}

    else if (selection === "view all employees"){
        viewEmp();
}

    else if (selection === "add a department"){
        addDept()
}

    else if (selection === "add an employee"){
        addEmp();
}

    else if (selection === "add a role"){
        addRole();
}

    else if (selection === "update imployee role"){
        updemp();
}
});
};

const viewRoles = () => {
    db.query(
      `SELECT
          r.title,
          r.id,
          d.department_name,
          r.salary 
        FROM roles r
        JOIN departments d
        ON r.department_id=d.id;`,
      (err, results) => {
        console.table(results);
        console.log("\n");
        startDb();
      }
    );
  };
  
  const viewEmployees = () => {
    db.query(
      `SELECT 
           e.id,
           e.first_name,
           e.last_name,
           r.title,
           d.department_name,
           r.salary,
           CONCAT (e2.first_name, " ",e2.last_name) AS manager 
        FROM employees e 
        JOIN roles r 
        ON e.role_id = r.id
        LEFT JOIN employees e2
        ON e.manager_id = e2.id
        JOIN departments d
        ON r.department_id=d.id 
      ;`,
      (err, results) => {
        if (err) throw err;
        console.table(results);
        console.log("\n");
  
        startDb();
      }
    );
  };
  
  const promptAddDepartment = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "department_name",
          message: "Which department would you like to add?",
          validate: (departmentName) => {
            if (departmentName) {
              return true;
            } else {
              console.log("Must enter your department name!");
              return false;
            }
          },
        },
      ])
      .then((name) => {
        db.query("INSERT INTO departments SET ?", name);
        console.log("\n");
        viewDepartments();
      });
  };
  const promptAddRoles = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Which role would you like to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the role salary?",
        },
        {
          type: "input",
          name: "department_id",
          message: "What is the department id?",
        },
      ])
      .then((role) => {
        db.query("INSERT INTO roles SET ?", role);
        console.log("\n");
        viewRoles();
      });
  };
  const promptAddEmployee = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Please enter employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "Please enter employee's last name?",
        },
        {
          type: "input",
          name: "role_id",
          message: "What is the role id?",
        },
        {
          type: "input",
          name: "manager_id",
          message: "What is the manager id?",
        },
      ])
      .then((employee) => {
        db.query("INSERT INTO employees SET ?", employee);
        console.log("\n");
        viewEmployees();
      });
  };
  const promptUpdateRoles = () => {
    db.query(
      `SELECT id AS value, CONCAT(first_name," ",last_name) AS name FROM employees;`,
      (err, employees) => {
        inquirer
          .prompt([
            {
              type: "list",
              name: "id",
              message: "Which employee would you like to update the role?",
  
              choices: employees,
            },
          ])
          .then((id) => {
            console.log(id);
  
            db.query(
              `SELECT id AS value, title AS name FROM roles`,
              (err, roles) => {
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "role_id",
                      message: "What is the new role?",
                      choices: roles,
                    },
                  ])
                  .then((role_id) => {
                    db.query("UPDATE employees SET ? WHERE ?", [role_id, id]);
                  })
                  .then(viewEmployees);
              }
            );
          });
      }
    );
  };
  startDb();