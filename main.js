#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs')

const empty = () => {};
const call = (argv) => (require(`./commands/${argv._[0]}`)).run(argv);

const files = fs.readdirSync('./commands/').map(c => c.substring(0, c.length - 3));

for(file of files) {
    const cmd = require(`./commands/${file}`);
    yargs.command(cmd.name, cmd.description, cmd.args ? cmd.args : empty, call)
}

yargs
  .scriptName("glitch")
  .usage('$0 <cmd> [args]')
  .demandCommand().recommendCommands().strict()
  .help().argv
