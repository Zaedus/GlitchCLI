const chalk = require('chalk');
const Glitch = require('glitchapi.js');

const userlog = require('../utils/user')
const projlog = require('../utils/project')

module.exports.run = (argv) => {
    const selector = argv.selector.substring(0, 1);
    const name = argv.selector.substring(1, argv.selector.length);
    if(selector == "@") {
        Glitch.getUser("id", name)
        .then(user => userlog(user))
        .catch(() => { console.log(chalk`{red User not found.}`) });
    } else if (selector == "#") {
        Glitch.getProject("id", name)
        .then(proj => projlog(proj))
        .catch((e) => { console.log(chalk`{red Project not found.}`) })
    } else return console.log(chalk`{red Must use either '@' or '#' to distinguish between user or project. (@Zaedus or #zaedus)}`);
}

module.exports.description = "Gets a user or project.";
module.exports.name = "get <selector>"