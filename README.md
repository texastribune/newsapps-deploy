# newsapps-deploy

A collection of awscli-powered deploy scripts that can be easily reused.

## Requirements

- [node.js](https://nodejs.org/) >= 0.10 *or* [io.js](https://iojs.org/en/index.html)
  - [npm](https://www.npmjs.com/)
- [Python 2.6.5+](https://www.python.org/)
  - [awscli](http://aws.amazon.com/cli/)

## Installation
```sh
npm install --save-dev newsapps-deploy
```

## Usage

`newsapps-deploy` depends on a file to pass in configuration. By default, it looks for `config.json` &mdash; but you are welcome to point it elsewhere via `--config`.

```sh
Usage: newsapps-deploy [COMMAND] [--config=PATH] [--dry-run] [--gzip] [--
production]

Commands:
  deploy  Deploy the project to S3
  push    Push assets to S3
  pull    Pull assets from S3

Options:
  -c, --config      The path to the config file         [default: "config.json"]
  -g, --gzip        Pushes code to your specified bucket with predefined HTTP
                    cache headers                                      [boolean]
  -p, --production  Push code to the production bucket (defaults to development)
                                                                       [boolean]
  -d, --dry-run     Print the commands instead of running them (good for
                    checking things out)                               [boolean]
  -h, --help        Show help                                          [boolean]
```

`config.json` should contain an object with a `deployment` key with the following fields:

```json
{
  "deployment": {
    "dev_s3_bucket": "notarealbucket.texastribune.org",
    "prod_s3_bucket": "graphics.texastribune.org",
    "path": "graphics",
    "slug": "corgis-vs-red-pandas",
    "aws_profile": "newsapps",
    "dist_folder": "dist",
    "assets_folder": "app/assets"
  }
}
```

### Field definitions

#### `dev_s3_bucket`
Push test deploys to this bucket

#### `prod_s3_bucket`
Push production deploys to this bucket

#### `path`
The path to the folder where code should be pushed.

#### `slug`
The slug of the folder (located in `path`) where code should be pushed.

#### `aws_profile`
The [AWS credential to use](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) for deployment. If empty, nothing will be passed to `awscli` via `--profile`.

#### `dist_folder`
The folder that should be pushed up to S3. This should be your content ready for deploy.

#### `assets_folder`
The folder where raw assets are located &mdash; typically `app/assets`.

### Default cache headers

The assumpion is that the `.css` and `.js` are being revisioned. If `--gzip` is passed, the following files will be assumed to be gzipped:

```
.html
.css
.js
.json
```

`.css` and `.js` are set to expire in **1 year**. Images &mdash; `.jpg`, `.png`, `.svg`, and `.gif` &mdash; are set to expire in **1 day**. `.json` files will expire in **1 hour**. `.html` have no set expiration.


## Wait – this depends on a Python library?

There is a [library for AWS written in node.js called `aws-sdk`](http://aws.amazon.com/sdk-for-node-js/). However, multiple parts of our workflow already generous depend on [awscli](http://aws.amazon.com/cli/) &mdash; to the point it can be assumed that it's already installed and configured.

Also &mdash; `aws-sdk` has no command line interface built in. Any tasks we need to accomplish would have to be written ourselves. Why reinvent the wheel? ¯\_(ツ)_/¯
