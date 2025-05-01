import buildMessage from '../utils/validation-errors.js';
import withDefaults from '../utils/with-defaults.js';
import evValidateLength from 'ember-validators/length';

function validateLength(options = {}) {
  options = withDefaults(options, {
    useBetweenMessage: true
  });
  return (key, value) => {
    let result = evValidateLength(value, options, null, key);
    return result === true ? true : buildMessage(key, result);
  };
}

export { validateLength as default };
//# sourceMappingURL=length.js.map
