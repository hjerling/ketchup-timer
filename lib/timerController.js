'use strict';

const fs = require('fs');
const moment = require('moment');
const _ = require('lodash');

const homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const timersFile = homedir + '/.ketchup-timers';

function add(pid, name, duration, cb) {
  get((err, timers) => {
    if (err) return cb(err);

    const exists = _.findIndex(timers, (o) => {
      return o.name === name;
    });

    if (exists >= 0) return cb(new Error(`Timer with name ${name} already exists`));

    timers.push({
      pid: pid,
      name: name,
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

function remove(opts, cb) {
  get((err, timers) => {
    let timersToRemove = timers;
    if(!opts.all) {
      const index = _.findIndex(timers, (o) => {
        return o.name === opts.name || o.pid === opts.pid;
      });

      if (index < 0) return cb(new Error(`Could not find the timer '${opts.pid ? opts.pid : opts.name}'`));

      timersToRemove = _.pullAt(timers, [index]);
    } else {
      timers = [];
    }

    saveTimers(timers);
    cb(null, timersToRemove);
  });
}

function get(cb) {
  let timers = [];
  let error;

  try {
    timers = fs.readFileSync(timersFile).toString();
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
