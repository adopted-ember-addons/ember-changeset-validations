import { isEmpty } from '@ember/utils';
import buildMessage from '../utils/validation-errors.js';
import evValidateFormat from 'ember-validators/format';

export default function validateFormat(options = {}) {
  let hasOptions = !isEmpty(Object.keys(options));

  return (key, value) => {
    if (!hasOptions) {
      return true;
    }

    let result = evValidateFormat(value, options, null, key);
    return result === true ? true : buildMessage(key, result);
  };
}
