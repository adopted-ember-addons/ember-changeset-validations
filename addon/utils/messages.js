import _Messages from 'ember-validators/messages';
import { capitalize, dasherize } from '@ember/string';

let cachedRef;
let customMessages;

export const defaultMessages = Object.assign({}, _Messages, {
  // Blank and present are flipped in ember-validators. Need to flip them back here
  blank: _Messages.present,
  present: _Messages.blank,

  getDescriptionFor(key = '') {
    return capitalize(dasherize(key).split(/[._-]/g).join(' '));
  },
});

/**
 * Find and load messages module on consuming app. Defaults to addon messages.
 * To define a custom message map, invoke setMessages() somewhere in your app:
 *
 * @example
 * // app.js
 * import Application from '@ember/application';
 * import Resolver from 'ember-resolver';
 * import loadInitializers from 'ember-load-initializers';
 * import config from 'test-app/config/environment';
 * import { setMessages } from 'ember-changeset-validations';
 *
 * export default class App extends Application {
 *   modulePrefix = config.modulePrefix;
 *   podModulePrefix = config.podModulePrefix;
 *   Resolver = Resolver;
 * }
 *
 * loadInitializers(App, config.modulePrefix);
 * setMessages({
 *   inclusion: '[CUSTOM] {description} is not included in the list',
 * });
 *
 * @return {Object}
 */
export function getMessages() {
  if (cachedRef) {
    return cachedRef;
  }

  cachedRef = Object.assign({}, defaultMessages, customMessages);

  return cachedRef;
}

export function setMessages(messages) {
  customMessages = messages;
  cachedRef = undefined;
}
