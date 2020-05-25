const chalk = require('chalk')
const { Project } = require('../node_modules/glitchapi.js/g-classes/Public/Project');
/**
 * @param {Project} prj
 */
module.exports = (prj) => {
    console.log(chalk`\n{underline {blue ${prj.domain}}}`);
    console.log(chalk`{italic {yellow ${prj.description}}}\n`);
    console.log(chalk`{yellow Owner}\t\t${prj.users[0].name ? prj.users[0].name : prj.users[0].login} (@${prj.users[0].login})`)
    console.log(chalk`{yellow Project ID}\t${prj.id}`)
    console.log(chalk`{yellow Base ID}\t\t${prj.baseId}`)
    console.log(chalk`{yellow Created On}\t${prj.createdAt.toLocaleString()}`);
    console.log(chalk`{yellow Updated On}\t${prj.updatedAt.toLocaleString()}`);
}