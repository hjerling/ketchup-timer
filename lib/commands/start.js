'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
const command = require('./command');
const timerController = require('../timerController.js');

const out = fs.openSync('/Users/hjerlj01/Development/10-percent/pomodoro-cli/out.log', 'a');
const err = fs.openSync('/Users/hjerlj01/Development/10-percent/pomodoro-cli/out.log', 'a');

module.exports = function start(minutes) {
  if (!minutes) minutes = 25;

  const timeout = minutes * 60 * 1000;

  const timer = spawn('node', ['./lib/commands/setTimer.js', timeout], {
    detached: true,
    stdio: [out, out, err]
  });

  timerController.add(timer.pid, timeout, (err) => {
    if (err) command.error(err);

    process.exit(0);
  });
};
