'use strict';

var path = require('path');
var shell = require('shelljs');

module.exports = function(basePath, profile, config, argv) {
  var baseCommand = 'aws s3 sync';
  var command = baseCommand + profile + ' s3://' + path.join(basePath, 'raw_assets') + ' ' + config.assets_folder;

  shell.echo('\nPulling assets from S3...');

  if (argv.d) {
    shell.echo(command);
  } else {
    shell.exec(command);
  }
};
