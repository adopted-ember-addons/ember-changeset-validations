import buildMessage from '../utils/validation-errors.js';
import withDefaults from '../utils/with-defaults.js';
import evValidateNumber from 'ember-validators/number';

function validateNumber(options = {}) {
  options = withDefaults(options, {
    allowString: true,
    allowNone: false
  });
  if (options.allowBlank) {
    options.allowNone = true;
  }
  return (key, value) => {
    let result = evValidateNumber(value, options, null, key);
    return result === true ? true : buildMessage(key, result);
  };
}

export { validateNumber as default };
//# sourceMappingURL=number.js.map
