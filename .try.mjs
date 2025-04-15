export default scenarios();

function scenarios() {
  return {
    scenarios: [
      compatEmberScenario('ember-lts-4.8', '^4.8.0'),
      compatEmberScenario('ember-lts-4.12', '^4.12.0'),
      compatEmberScenario('ember-lts-5.4', '^5.4.0'),
      compatEmberScenario('ember-lts-5.8', '^5.8.0'),
      compatEmberScenario('ember-lts-5.12', '^5.12.0'),
      {
        name: 'ember-latest',
        npm: {
          devDependencies: {
            'ember-source': 'npm:ember-source@latest',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': 'npm:ember-source@beta',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': 'npm:ember-source@alpha',
          },
        },
      },
    ],
  };
}

function emberCliBuildJS() {
  return `const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');
module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');
  let app = new EmberApp(defaults);
  return compatBuild(app, buildOnce);
};`;
}

function compatEmberScenario(name, emberVersion) {
  return {
    name,
    npm: {
      devDependencies: {
        'ember-source': emberVersion,
        '@embroider/compat': '^4.0.0-alpha.14',
        'ember-cli': '^5.12.0',
        'ember-auto-import': '^2.10.0',
        '@ember/optional-features': '^2.2.0',
      },
    },
    env: {
      ENABLE_COMPAT_BUILD: true,
    },
    files: {
      'ember-cli-build.js': emberCliBuildJS(),
    },
  };
}
