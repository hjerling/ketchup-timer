'use strict';

const moment = require('moment');
const command = require('./command');
const timerController = require('../timerController.js');

function removeStoppedTimers(timers) {
  return timers.filter((timer) => {
    let isRunning = true;
    try {
      process.kill(timer.pid, 0);
    } catch (e) {
      timerController.remove(
      {
        pid: timer.pid
      },
      () => {});
      isRunning = false;
    }
    return isRunning;
  });
}

module.exports = function list() {
  timerController.get((err, timers) => {
    if (err) command.error(err);

    timers = removeStoppedTimers(timers);

    timers = timers.map((timer) => {
      return {
        id: timer.pid,
        name: timer.name,
        time: moment.duration(timer.duration, 'milliseconds').humanize(),
        ends: moment(timer.estimatedEndTime).fromNow()
      };
    });

    let message;
    if (timers.length === 0) {
      message = 'There are no timers running';
    } else if (timers.length === 1) {
      message = 'There is 1 timer running';
    } else {
      message = 'There are ' + timers.length + ' timers running';
    }

    command.log(message);
    if (timers.length !== 0) {
      command.log();
      command.columns(timers);
    }
  });
};
