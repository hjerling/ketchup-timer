#! /usr/bin/env node

'use strict';
const program = require('commander');
const packageJson = require('../package');

const command = require('./commands/command');
program.version(packageJson.version);

function validCommand(args) {
  if (!args.length) return false;

  let contains = false;
  args.forEach((arg) => {
    if (typeof arg === 'object') contains = true;
  });

  return contains;
}

program
  .command('start [minutes]')
  .description('Sets a timer for the given number of minutes.')
  .description('Defaults to 25 minutes.')
  .option('-n --name <name>', 'Give your timer a name')
  .action(require('./commands/start'));

program
  .command('stop [id]')
  .description('stops the timer with the given id or name.')
  .option('-n --name <name>', 'Identify the timer by its name')
  .option('-a --all', 'Stop all running timers')
  .action(require('./commands/stop'));

program
  .command('list')
  .description('Outputs a list of all timers set.')
  .action(require('./commands/list'));

try {
  program.parse(process.argv);
} catch (e) {
  command.error(e);
}

if (!validCommand(program.args)) {
  program.help();
}

process.exit(0);
