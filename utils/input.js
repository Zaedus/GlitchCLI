const chalk = require('chalk');
const readline = require('readline');
function getInput(query) {
    return new Promise((res, rej) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.setPrompt(query);
        rl.on("line", (line) => {
            res(line);
            rl.close();
        })
        rl.prompt(true);
    })
}
async function getValue(prop, def) {
    const inp = await getInput(chalk`{yellow ${prop}}${def ? ` (${def})` : ""}: `);
    //process.stdout.write("\033[F");
    return inp.length > 0 ? inp : def;
}

module.exports = {
    getValue, getInput
}