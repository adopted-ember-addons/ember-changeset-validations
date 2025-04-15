import buildMessage from '../utils/validation-errors.ts';
import evValidateInclusion from 'ember-validators/inclusion';

export default function validateInclusion(options = {}) {
  if (options.list) {
    options.in = options.list;
  }

  return (key, value) => {
    let result = evValidateInclusion(value, options, null, key);
    return result === true ? true : buildMessage(key, result);
  };
}
