import { isArray, A } from '@ember/array';

/**
 * Wraps a value in an Ember.Array.
 *
 * @public
 * @param  {Any} value
 * @return {Ember.Array}
 */
function wrapInArray(value) {
  if (isArray(value)) {
    return A(value);
  }
  return A([value]);
}

export { wrapInArray as default };
//# sourceMappingURL=wrap.js.map
