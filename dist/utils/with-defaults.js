/**
 * Create a new object with defaults
 *
 * @public
 * @param  {Object} obj
 * @param  {Object} defaults
 * @return {Object}
 */
function withDefaults(obj = {}, defaults = {}) {
  return Object.assign(Object.assign({}, defaults), obj);
}

export { withDefaults as default };
//# sourceMappingURL=with-defaults.js.map
