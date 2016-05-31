'use strict';

const fs = require('fs');
const moment = require('moment');
const homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const timersFile = homedir + '/.ketchup-timers';

function add(pid, duration, cb) {
  get((err, timers) => {
    if (err) return cb(err);

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
      return timer.pid !== pid;
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
    return cb(null, []);
  }

  cb(error, timers);
}

module.exports = {
  add: add,
  get: get,
  remove: remove
};
