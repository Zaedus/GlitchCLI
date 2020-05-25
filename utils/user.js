const chalk = require('chalk');
const ctx = new chalk.Instance({level: 3});
module.exports = (usr) => {
    console.log(ctx`\n{underline {green ${usr.name} (@${usr.login})}}`);
    console.log(ctx`{italic {yellow ${usr.description}}}\n`);
    console.log(ctx`{yellow Thanked}\t\t${usr.thanksCount} time${usr.thanksCount != 1 ? "s" : ""}`)
    console.log(ctx`{yellow User ID}\t\t${usr.id}`)
    console.log(ctx`{yellow Created On}\t${usr.createdAt.toLocaleString()}`);
    console.log(ctx`{yellow Updated On}\t${usr.updatedAt.toLocaleString()}`);
    console.log(ctx`{yellow Avatar}\t\t${usr.avatarUrl}`);
}