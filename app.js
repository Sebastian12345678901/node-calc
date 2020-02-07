const readline = require('readline');
const Register = require("./Register");
const printRules = require("./printRules");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Store all information about Register/var here
let allVariables = [{}];

function print(name) {
    let varExists = false;
    allVariables.forEach(variable => {
        if (name === variable.name) {
            console.log(name + " = " + variable.value)
            varExists = true;
        }

    })

    if (varExists === false) {
        console.log("Could not find " + name)
    }
    startStream();
}

function multiply(name, value) {

    allVariables.forEach(variable => {
        if (name == variable.name) {
            variable.value *= value;
        }
    })

    startStream();
};

function subtract(name, value) {

    allVariables.forEach(variable => {
        if (name == variable.name) {

            variable.value -= value;
        }
    })


    startStream();



}

function add(name, value) {


    let allreadySet = false;

    allVariables.forEach(variable => {
        if (name == variable.name) {
            allreadySet = true;
        }
    })

    if (allreadySet === false) {
        allVariables.push(new Register(name, value));
    } else {
        allVariables.forEach(variable => {
            if (name === variable.name) {
                variable.value += value;
            }
        })
    }

    startStream();
}

//This function is only needed in my switch statement, else I can restart with startStream()
function restartStream() {
    console.log("Wrong syntax you need an operator like add, subtract or multiply as second argument");
    startStream();

}

function startStream() {
    //My forloop just makes a litle space // just for estetics
    for (let i = 0; i < 3; i++) {
        console.log('\n');
    }

    printRules();

    // read line stream starts here
    rl.question('Input: ', (input) => {

        if (input.toLowerCase() === "quit") {
            process.exit();
        }

        let args = input.split(" ");
        let name = args[0];
        let operator = args[1];
        let value = args[2];

        //print a variable
        let isPrinting = false;
        if (name == "print" && args.length == 2) {
            isPrinting = true;
            //here operator acts as name 
            print(operator);

        }

        //checks so that name is not a number
        if (Number.isInteger(parseInt(name)) === true) {
            console.log("The first argument needs to be a Variable not a number");
            args.push("break my function with length");
            args.push("break the function with length");
        }

        //Checks if value is a variable or a number
        if (Number.isInteger(parseInt(value)) === false) {
            let varExists = false;
            allVariables.forEach(variable => {
                if (value === variable.name) {
                    value = variable.value;
                    varExists = true;
                }
            })
            if (varExists === false) {
                console.log("that value does not exist");
                args.push("break my function with length");
                args.push("break the function with length");
            }

        } else {
            value = parseInt(args[2])
        }

        //check if the length is correct
        if (args.length === 3) {
            //If everything is correct untill this point call correct function
            switch (operator) {
                case "add": add(name, value);

                    break;
                case "subtract": subtract(name, value);

                    break;
                case "multiply": multiply(name, value);

                    break;

                default: restartStream();
                    break;
            }

        } else {
            if (isPrinting === false) {
                console.log("Wrong syntax, try again");
                startStream();
            }
        }
    });
}

startStream();
