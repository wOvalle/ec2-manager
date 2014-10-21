'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'awstest-secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

    AWS_ACCESS_KEY_ID: 'AMAZONKEY',
    AWS_SECRET_ACCESS_KEY: 'AMAZONSECRET',
    AWS_REGION: 'AMAZONREGION'//'us-east-1',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
