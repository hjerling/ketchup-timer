// eslint no-console: 0
'use strict';

const chalk = require('chalk');
const columnify = require('columnify');
const _ = require('lodash');

function error(err) {
  let message = err;

  if (err instanceof Error) {
    message = err.message;
  }

  console.error(chalk.red(message));
  process.exit(1);
}

function columns(collection) {
  if (!_.isArray(collection)) {
    collection = [collection];
  }

  console.log(columnify(collection, {
    columnSplitter: ' | '
  }));
}

function log() {
  console.log.apply(console, arguments);
}

module.exports = {
  error: error,
  columns: columns,
  log: log
};
