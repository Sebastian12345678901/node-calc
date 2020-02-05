const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});




rl.question('', (answer) => {
    const input = answer.toString();

    if (answer == 1) {
        console.log("wasap");
    }
    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
});