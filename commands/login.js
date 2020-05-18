const Glitch = require('glitchapi.js');
const input = require('../utils/input');
const keytar = require('keytar');
const chalk = require('chalk');

function getCode(email) {
    return new Promise((res, rej) => {
        Glitch.emailTempCode(email).then(res).catch(res);
    })
}

module.exports.run = async (argv) => {
    var email = await input.getValue("Email");
    var code = await getCode(email)
    while(code.status != 200) {
        console.log(chalk.red("Invalid email address.") + (code.status == 400 ? " Email address not found." : code.status == 429 ? " Requested code too recently. Please wait before trying again." : `${code.message} (${code.status})`));
        email = await input.getValue("Email");
        code = await getCode(email);
    }
    console.log(chalk.green("An email was sent to " + email + "."));

    var value = await input.getValue("Paste your code here");
    
    const me = new Glitch.Me();

    me.on("ready", () => {
        keytar.setPassword("glitchcli", "code", value);
        console.log(chalk.green(`Succesfully logged in as ${me.name} (@${me.login})`));
    })

    me.signin(value).catch(e => {
        console.log(chalk.red("Login failed."));
    });

}
module.exports.description = "Creates a user to be used later.";