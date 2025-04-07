'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-changeset-validations'],
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    '@embroider/macros': {
      // this is how you can optionally send configuration into your
      // dependencies, if those dependencies choose to use
      // @embroider/macros configs.
      setConfig: {
        'ember-changeset-validations': {
          rawOutput: true,
        },
      },
    },

    // Add options here
  });

  return maybeEmbroider(app);
};
