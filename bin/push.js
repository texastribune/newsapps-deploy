'use strict';

var path = require('path');
var shell = require('shelljs');

module.exports = function(basePath, profile, config, argv) {
  var baseCommand = "aws s3 sync --exclude '.*'";
  var command = baseCommand + profile + ' ' + config.assets_folder + ' s3://' + path.join(basePath, 'raw_assets');

  shell.echo('\nPushing assets to S3...');

  if (argv.d) {
    shell.echo(command);
  } else {
    shell.exec(command);
  }
};
