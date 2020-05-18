const keytar = require('keytar');
const chalk = require('chalk');

module.exports.run = () => {
    keytar.deletePassword("glitchcli", "code");
    console.log(chalk.red("\nLogged out from your account.\nBye, bye..."));
}

module.exports.name = "logout";

module.exports.description = "Removes the login token from the keychain.";