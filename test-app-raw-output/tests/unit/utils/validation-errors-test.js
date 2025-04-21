import buildMessage from 'ember-changeset-validations/utils/validation-errors';
import { module, test } from 'qunit';

module('Unit | Utility | validation errors', function () {
  module('rawOutput', function () {
    test('#buildMessage can return a raw data structure', function (assert) {
      let result = buildMessage('firstName', {
        type: 'present',
        value: 'testValue',
        context: { foo: 'foo' },
      });
      assert.notStrictEqual(
        typeof result,
        'string',
        'the return value is an object',
      );
      let {
        message,
        type,
        value,
        context: { description },
      } = result;
      assert.ok(message, "{description} can't be blank");
      assert.strictEqual(description, 'First name', 'description is returned');
      assert.strictEqual(type, 'present', 'the type of the error is returned');
      assert.strictEqual(value, 'testValue', 'the passed value is returned');
    });

    test('#buildMessage can return a raw data structure for a date', function (assert) {
      let d = new Date();
      let result = buildMessage('firstName', {
        type: 'date',
        value: d,
        context: { foo: 'foo' },
      });
      assert.notStrictEqual(
        typeof result,
        'string',
        'the return value is an object',
      );
      let {
        message,
        type,
        value,
        context: { description },
      } = result;
      assert.ok(message, '[CUSTOM] {description} must be a valid date');
      assert.strictEqual(description, 'First name', 'description is returned');
      assert.strictEqual(type, 'date', 'the type of the error is returned');
      assert.strictEqual(value, d, 'the passed value is returned');
    });
  });
});
