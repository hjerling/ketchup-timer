#! /usr/bin/env node

'use strict';
const path = require('path');
const notifier = require('node-notifier');
const moment = require('moment');
const timerController = require('../timerController');

if (process.argv.length < 3) {
  console.error('That is not how you call this code.');
  console.error('node setTimer.js <milliseconds>');
}

const timeout = process.argv[2];

const timeoutInMnutes = moment.duration(timeout, 'milliseconds').asMinutes();

setTimeout(() => {
  notifier.notify({
    title: 'Pomodoro timer is up!',
    message: 'Your ' + timeoutInMnutes + ' minute timer is up.',
    icon: path.join(__dirname, '../../images/tomato.png'),
    sound: true,
    wait: true
  });

  timerController.remove(process.pid);
}, timeout);
