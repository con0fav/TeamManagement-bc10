const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const empList = [];

//ask for manager info
function managerQ() {

    return inquirer.prompt([
        {
            name: "managerName",
            type: "input",
            message: "Input Manager name", 
        },
        {
            name: "managerId",
            type: "number",
            message: "Input manager ID number", 
        },
        {
            name: "managerMail",
            type: "input",
            message: "Input Manager email", 
        },
        {
            name: "phone",
            type: "number",
            message: "Input Manager phone number", 
        }
    ]).then((managerA) => {
        const newManager = new Manager(managerA.managerName, managerA.managerId, managerA.managerMail, managerA.phone);

        empList.push(newManager);

        empType();
    });

}

//ask for next emp type
function empType() {
    
    return inquirer.prompt([
        {
            name: "role",
            type: "list",
            message: "Enter employee position",
            choices: ["Engineer", "Intern", "Create Page"],
        }
    ]).then((newEmpChoice) => {
        if (newEmpChoice.role === "Engineer"){
            engineerQ();  
        } else if (newEmpChoice.role === "Intern"){
            internQ();
        } else (createHTML());
    });

}

//ask for engineer info
function engineerQ() {
    inquirer.prompt([
        {
            name: "engName",
            type: "input",
            message: "Input engineer's name",
        },
        {
            name: "engId",
            type: "number",
            message: "Input engineer's ID number",
        },
        {
            name: "engEmail",
            type: "input",
            message: "Input engineers's email",
        },
        {
            type: "input",
            name: "github",
            message: "Input engineer's Github",
        }
    ]).then((engineerA) => {
        const newEngineer = new Engineer(engineerA.engName, engineerA.engId, engineerA.engEmail, engineerA.github);

        empList.push(newEngineer);

        empType();
    });
};

//ask for intern info
function internQ() {
    inquirer.prompt([
        {
            name: "intName",
            type: "input",
            message: "Input intern's name",
        },
        {
            name: "intId",
            type: "number",
            message: "Input intern's ID number",
        },
        {
            name: "intEmail",
            type: "input",
            message: "Input intern's email",
        },
        {
            type: "input",
            name: "school",
            message: "Input intern's school",
        }
    ]).then((internA) => {
        const newIntern = new Intern(internA.intName, internA.intId, internA.intEmail, internA.school);

        empList.push(newIntern);

        empType();
    });  
};

function createHTML() {
    const htmlPage = render(empList);

    //use fs to make the output file
    fs.writeFileSync(outputPath, htmlPage);
}

managerQ();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

//render();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

