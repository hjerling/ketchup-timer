'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const spawn = require('child_process').spawn;
const command = require('./command');
const timerController = require('../timerController.js');

const out = fs.openSync('/Users/hjerlj01/Development/10-percent/pomodoro-cli/out.log', 'a');
const err = fs.openSync('/Users/hjerlj01/Development/10-percent/pomodoro-cli/out.log', 'a');

module.exports = function start(minutes) {
  if (!minutes) minutes = 25;

  const duration = moment.duration(parseInt(minutes), 'minutes');

  const timer = spawn('node', [path.join(__dirname, './setTimer.js'), duration.asMilliseconds()], {
    detached: true,
    stdio: [out, out, err]
  });

  timerController.add(timer.pid, duration, (err) => {
    if (err) command.error(err);
    command.log('Timer set for ' + duration.asMinutes() + ' minutes.');
    process.exit(0);
  });
};
