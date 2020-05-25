const chalk = require('chalk');

const { login } = require('../utils/login')
const { getValue } = require('../utils/input');
const userlog = require('../utils/user')
const projectslog = require('../utils/projects')

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
    const cmd = argv.action;
    const usr = await login();
    if(!cmd) return userlog(usr);
    if(cmd == "set") {
        if(Object.keys(argv).length == 3) return console.log(chalk`{red No new data provided.}`);
        var updateData = JSON.parse(JSON.stringify(argv));
        delete updateData ["_"];
        delete updateData ["$0"];
        delete updateData ["count"];
        if(updateData.description) updateData.description = updateData.description.split("\\n").join("\n")
        await usr.update(updateData);
    } else if(cmd == "projects") {
        const projects = await usr.getProjects(argv.count);
        if((argv.actionb != "edit" && argv.actionb != "delete") && !argv.project) {
            console.log(chalk`{blue {underline ${usr.login}'s Top ${projects.length} Projects}}\n`)
            projectslog(projects);
            return;
        }
        if (argv.actionb == "edit") {
            const proj = projects.find(p => p.domain == argv.project);
            if(!proj) return console.log(chalk`{red Project not found.}`)
            console.log(chalk`\n{green {underline Editing ${proj.domain}}}\nPress enter to ignore.\n`)
            var domain = await getValue("Domain", proj.domain);
            while(await projectExists(domain) || domain.length > 110 || (!domainRegex.test(domain) && domain.length != 0)) {
                console.log(chalk.red("Invalid domain name.") + " Project already exists, there were invalid characters, or it was longer than 110 characters.")
                domain = await getValue("Domain", proj.domain);
            }
            var description = await getValue("Description", "");
            var private = await getValue("Private", proj.private ? "y" : "n");
            while(private[0] != "n" && private[0] != "y" || private.length == 0) {
                console.log(chalk.red("Invalid private value.") + " Value must be either 'y' or 'n'.");
                private = await getValue("Private", proj.private ? "y" : "n");
            }
            private = private == "y";
            var updateObj = {};

            if(domain != proj.domain && domain)                updateObj["domain"] = domain;
            if(description != proj.description && description) updateObj["description"] = description;
            if(private != proj.private && private)             updateObj["private"] = private;

            proj.update(updateObj).then(c => {
                console.log(chalk`{green Succesfully updated.}`)
            })
            .catch(e => {
                console.log(chalk`{red Error occurred.\n${e}}`);
            })
        }
        if(argv.actionb == "delete") {
            const proj = projects.find(p => p.domain == argv.project);
            if(!proj) return console.log(chalk`{red Project not found.}`);

            console.log(chalk`{red To confirm type '${proj.domain}'}`);
            const confirm = await getValue("");
            if(confirm != proj.domain) return console.log(chalk`{red Confirmation failed.}`);
            proj.delete().then(p => {
                console.log(chalk`{green Project deleted.}`)
            })
            .catch(e => {
                console.log(chalk`{red An error occurred.}\n${e}`)
            })
        }
    }
}

module.exports.description = "Does an action on the user.";
module.exports.name = "me [action] [actionb] [project]";
module.exports.args = (yargs) => {
    yargs.positional('name', {
        type: "string"
    })
    yargs.positional('login', {
        type: "string"
    })
    yargs.positional('description', {
        type: "string"
    })
    yargs.positional('avatarUrl', {
        type: "string"
    })
    yargs.positional('color', {
        type: "string"
    })
    yargs.positional('hasCoverImage', {
        type: "boolean"
    })
    yargs.positional('count', {
        type: "number",
        default: 10
    })
}