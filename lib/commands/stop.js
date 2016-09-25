'use strict';

const command = require('./command');
const timerController = require('../timerController.js');

module.exports = function stop(pid, options) {
  const opts = {
    pid: parseInt(pid),
    name:(typeof options.name === 'function') ? null : options.name,
    all: options.all
  };

  timerController.remove(opts, (err, timersToKill) => {
    if (err) return command.error(err);

    timersToKill.forEach((timer) => {
      process.kill(timer.pid);
    });
  });

  if(opts.all) {
    command.log('All timers have been stopped.');
  } else {
    command.log(`The timer (${opts.pid ? opts.pid : opts.name}) has been stopped.`);
  }
};
