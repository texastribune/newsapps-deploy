'use strict';

var commands = require('./commands');
var push = require('./push');
var shell = require('shelljs');

module.exports = function(basePath, profile, config, argv) {
  shell.echo('CACHE HEADERS: ' + argv.gzip);

  var commandsToRun = argv.gzip ? commands.gzip : commands.simple;

  commandsToRun.forEach(function(c) {
    var command = c.command + profile + ' ' + basePath;
    shell.echo('\n' + c.echo);

    if (argv['dry-run']) {
      shell.echo(command);
    } else {
      shell.exec(command);
    }
  });

  push(basePath, profile, config, argv);
};
