'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-changeset-validations'],
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },

    // Add options here
  });

  return maybeEmbroider(app);
};
