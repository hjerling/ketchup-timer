'use strict';

const command = require('./command');
const timerController = require('../timerController.js');

module.exports = function stop(pid) {
  timerController.remove(pid);
  process.kill(pid);

  command.log('The timer (' + pid + ') has been stopped.');
};
