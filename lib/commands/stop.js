'use strict';

const command = require('./command');
const timerController = require('../timerController.js');

module.exports = function stop(pid) {
  timerController.remove(pid, (err, timerPid) => {
  	if (err) return command.error(err);

    process.kill(timerPid);
  });

  command.log('The timer (' + pid + ') has been stopped.');
};
