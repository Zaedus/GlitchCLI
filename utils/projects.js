const chalk = require('chalk');
const { OwnedProject } = require('../node_modules/glitchapi.js/g-classes/Owned/OwnedProject');
/**
 * @param {OwnedProject[]} projects
 */
module.exports = (projects) => {
    projects.forEach((project, i) => {
        console.log(chalk`${" ".repeat(3 - String(i+1).length)}${i+1}.  {yellow ${project.domain}}`)
    });
}