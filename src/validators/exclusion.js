import buildMessage from '../utils/validation-errors.js';
import evValidateExclusion from 'ember-validators/exclusion';

export default function validateExclusion(options = {}) {
  if (options.list) {
    options.in = options.list;
  }

  return (key, value) => {
    let result = evValidateExclusion(value, options, null, key);
    return result === true ? true : buildMessage(key, result);
  };
}
