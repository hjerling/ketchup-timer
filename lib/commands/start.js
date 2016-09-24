'use strict';

const path = require('path');
const moment = require('moment');
const spawn = require('child_process').spawn;
const command = require('./command');
const timerController = require('../timerController.js');

module.exports = function start(minutes, name) {
  if (!minutes) minutes = 25;

  const duration = moment.duration(parseInt(minutes), 'minutes');

  const timer = spawn('node', [path.join(__dirname, './setTimer.js'), duration.asMilliseconds()], {
    detached: true,
    stdio: 'ignore'
  });

  const timerName = name ? name : timer.pid;
  
  timerController.add(timer.pid, timerName, duration, (err) => {
    if (err) command.error(err);

    command.log('Timer set for ' + duration.asMinutes() + ' minutes.');
  });
};
