const inquire = require("inquire");
const contable = require("console.table")

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



