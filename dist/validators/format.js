import { isEmpty } from '@ember/utils';
import buildMessage from '../utils/validation-errors.js';
import evValidateFormat from 'ember-validators/format';

function validateFormat(options = {}) {
  let hasOptions = !isEmpty(Object.keys(options));
  return (key, value) => {
    if (!hasOptions) {
      return true;
    }
    let result = evValidateFormat(value, options, null, key);
    return result === true ? true : buildMessage(key, result);
  };
}

export { validateFormat as default };
//# sourceMappingURL=format.js.map
