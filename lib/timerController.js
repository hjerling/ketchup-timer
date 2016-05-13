'use strict';

const fs = require('fs');
const moment = require('moment');
const homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const timersFile = homedir + '/.pomodoro';

function add(pid, duration, cb) {
  get((err, timers) => {
    timers.push({
      pid: pid,
      duration: duration.asMilliseconds(),
      estimatedEndTime: moment().add(duration).format()
    });

    saveTimers(timers);
    cb();
  });
}

function saveTimers(timers) {
  fs.writeFileSync(timersFile, JSON.stringify(timers, null, 2));
}

function remove(pid) {
  get((err, timers) => {
    timers = timers.filter((timer) => {
      timer.pid !== pid;
    });

    saveTimers(timers);
  });
}

function get(cb) {
  let timers = [];
  let error;

  try {
    timers = fs.readFileSync(timersFile);
    timers = JSON.parse(timers);
  } catch (e) {
    error = new Error('Could not read \'~/.pomodoro\'');
  }

  cb(error, timers);
}

module.exports = {
  add: add,
  get: get,
  remove: remove
};
