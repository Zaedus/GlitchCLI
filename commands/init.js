const Glitch = require('glitchapi.js');
const chalk = require('chalk');

const { getValue } = require('../utils/input');
const { login }  = require('../utils/login');

const domainRegex = new RegExp(/^[a-z0-9-]+$/);

function projectExists(domain) {
    return new Promise((res, rej) => {
        try {
            Glitch.getProject("domain", domain)
            .catch(_ => res(false))
            .then(_ => res(true));
        } catch (e) {
            res(false);
        }
    })
}

module.exports.run = async (argv) => {
    const user = await login();

    console.log(chalk`\n{green {underline Project Init}}\n\n`)
    var base = await getValue("Base", "hello-express");
    while(!domainRegex.test(base) || !(await projectExists(base)) || base.length > 110) {
        console.log(chalk.red("Invalid base name.") + " Project can't be found, there were invalid characters, or it was longer than 110 characters.")
        base = await getValue("Base", "hello-express");
    }
    var domain = await getValue("Domain", "");
    while(!domainRegex.test(domain) || await projectExists(domain) || domain.length > 110) {
        console.log(chalk.red("Invalid domain name.") + " Project already exists, there were invalid characters, or it was longer than 110 characters.")
        domain = await getValue("Domain", "");
    }
    var description = await getValue("Description", "");
    var private = await getValue("Private", "n");
    while(private[0] != "n" && private[0] != "y") {
        console.log(chalk.red("Invalid private value.") + " Value must be either 'y' or 'n'.");
        private = await getValue("Private", "n");
    }
    private = private == "y";

    user.remix(base, {
        description, domain, private
    }).catch(c => {
        console.log(chalk.red("\nUnable to create project."))
        console.log(c);
    })
    .then(c => {
        console.log(chalk`\n{green Project successfully created!}\nhttps://glitch.com/~${c.domain}`);
    })
}
module.exports.description = "Initilizes a project.";
module.exports.name = "init"