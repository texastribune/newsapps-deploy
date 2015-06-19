module.exports = {
  gzip: [
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.css' --cache-control 'max-age=31536000' --content-encoding 'gzip'",
      echo: "Syncing *.css files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.js' --cache-control 'max-age=31536000' --content-encoding 'gzip'",
      echo: "Syncing *.js files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.html' --content-encoding 'gzip'",
      echo: "Syncing *.html files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.jpg' --include '*.png' --include '*.svg' --include '*.gif' --cache-control 'max-age=86400'",
      echo: "Syncing image files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.json' --cache-control 'max-age=3600' --content-encoding 'gzip'",
      echo: "Syncing *.json files to S3..."
    },
    {
      command: "aws s3 sync",
      echo: "Syncing everything else to S3..."
    }
  ],
  simple: [
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.css'",
      echo: "Syncing *.css files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.js'",
      echo: "Syncing *.js files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.html'",
      echo: "Syncing *.html files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.jpg' --include '*.png' --include '*.svg' --include '*.gif'",
      echo: "Syncing image files to S3..."
    },
    {
      command: "aws s3 sync --acl public-read --exclude '*.*' --include '*.json'",
      echo: "Syncing *.json files to S3..."
    },
    {
      command: "aws s3 sync",
      echo: "Syncing everything else to S3..."
    }
  ]
};
