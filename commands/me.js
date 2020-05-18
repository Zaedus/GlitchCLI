const chalk = require('chalk');
const { login } = require('../utils/login')
const { log } = require('../utils/user')
module.exports.run = async (argv) => {
    const cmd = argv.command;
    const usr = await login();
    if(cmd == "get") log(usr);
    if(cmd == "set") {
        
    }
}

module.exports.description = "Does an action on the user.";
module.exports.name = "me <command> [args]";
module.exports.args = (yargs) => {
    yargs.positional('command', {
        type: "string",
        describe: "The command to modify or get the currently logged in user.",
        choices: ["get", "update"]
    })
}