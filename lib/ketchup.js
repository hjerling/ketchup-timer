#! /usr/bin/env node

'use strict';
const program = require('commander');
const packageJson = require('../package');

const command = require('./commands/command');
program.version(packageJson.version);

program
  .command('start [minutes]')
  .description('Sets a timer for the given number of minutes.')
  .description('Defaults to 25 minutes.')
  .action(require('./commands/start'));

program
  .command('stop <id>')
  .description('stops the timer with the given id.')
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

if (!program.args.length) {
  program.help();
}
