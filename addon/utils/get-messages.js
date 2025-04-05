import defaultMessages from './messages';
import { getOwnConfig } from '@embroider/macros';

let cachedRef = null;

/**
 * Find and load messages module on consuming app. Defaults to addon messages.
 * To define a custom message map, define ownConfig in ember-cli-build.js:
 *
 * @example
 * // ember-cli-build.js
 * const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
 * module.exports = function (defaults) {
 *   const app = new EmberAddon(defaults, {
 *     '@embroider/macros': {
 *       setConfig: {
 *         'ember-changeset-validations': {
 *           messages: {
 *             inclusion: '[CUSTOM] {description} is not included in the list',
 *           }
 *         }
 *       }
 *     }
 *   });
 *   return app;
 * };
 *
 * @param  {Object} moduleMap
 * @param  {Boolean} useCache Pass `false` to ignore cached key
 * @return {Object}
 */
export default function getMessages(useCache = true) {
  if (useCache && cachedRef) {
    return cachedRef;
  }

  cachedRef = Object.assign({}, defaultMessages, getOwnConfig()?.messages);

  return cachedRef;
}
