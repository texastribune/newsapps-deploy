#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var shell = require('shelljs');
var yargs = require('yargs');


var argv = yargs.usage('Usage: $0 [COMMAND] [--config=PATH] [--dry-run] [--gzip] [--production]')
    .command('deploy', 'Deploy the project to S3')
    .command('push', 'Push assets to S3')
    .command('pull', 'Pull assets from S3')
    .demand(1, 'You must provide a valid command')
    .default('c', 'config.json')
      .alias('c', 'config')
      .describe('c', 'The path to the config file')
    .boolean('g')
      .alias('g', 'gzip')
      .describe('g', 'Pushes code to your specified bucket with predefined HTTP cache headers')
    .boolean('p')
      .alias('p', 'production')
      .describe('p', 'Push code to the production bucket (defaults to development)')
    .boolean('d')
      .alias('d', 'dry-run')
      .describe('d', 'Print the commands instead of running them (good for checking things out)')
    .help('h').alias('h', 'help')
    .argv;

if (argv.d) {
  shell.echo('=== DRY RUN, NOT ACTUALLY RUNNING ===\n');
}

var config = JSON.parse(fs.readFileSync(argv.config, 'utf8')).deployment;
var bucket = argv.production ? config.prod_s3_bucket : config.dev_s3_bucket;

// print the basics of the commands
shell.echo('S3 BUCKET: ' + bucket);
if (config.path) { shell.echo('PROJECT PATH: ' + config.path); }
shell.echo('PROJECT SLUG: ' + config.slug);
if (config.aws_profile) { shell.echo('AWS PROFILE: ' + config.aws_profile); }

// if there's a profile, create the option
var profile = config.aws_profile ? ' --profile ' + config.aws_profile : '';

// create the base path
var basePath = path.join(bucket, config.path, config.slug);

require('./' + argv._[0])(basePath, profile, config, argv);
