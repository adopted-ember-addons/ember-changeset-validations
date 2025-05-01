import buildMessage from '../utils/validation-errors.js';
import evValidateInclusion from 'ember-validators/inclusion';

function validateInclusion(options = {}) {
  if (options.list) {
    options.in = options.list;
  }
  return (key, value) => {
    let result = evValidateInclusion(value, options, null, key);
    return result === true ? true : buildMessage(key, result);
  };
}

export { validateInclusion as default };
//# sourceMappingURL=inclusion.js.map
