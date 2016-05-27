#! /usr/bin/env node

/* eslint no-console: 0 */
'use strict';
const path = require('path');
const notifier = require('node-notifier');
const moment = require('moment');
const timerController = require('../timerController');

function checkNotifyAndExit(stopTime, timeoutDuration) {
  if (moment().isSameOrAfter(stopTime)) {
    notifier.notify({
      title: 'Ketchup timer!',
      message: 'Your ' + timeoutDuration.asMinutes() + ' minute timer is up.',
      icon: path.join(__dirname, '../../images/ketchup.png'),
      sound: true,
      wait: true
    });

    timerController.remove(process.pid);
    process.exit(0);
  }
}

if (process.argv.length < 3) {
  console.error('That is not how you call this code.');
  console.error('node setTimer.js <milliseconds>');
}

const timeout = parseInt(process.argv[2]);
const timeoutDuration = moment.duration(timeout, 'milliseconds');
const stopTime = moment().add(timeoutDuration);

checkNotifyAndExit(stopTime, timeoutDuration);

setInterval(() => {
  checkNotifyAndExit(stopTime, timeoutDuration);
}, 30000);
