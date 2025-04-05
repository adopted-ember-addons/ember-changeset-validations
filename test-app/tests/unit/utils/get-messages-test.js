import { module, test } from 'qunit';
import {
  getMessages,
  setMessages,
  defaultMessages,
} from 'ember-changeset-validations/utils/messages';
import customMessages from 'test-app/validations/messages';

module('Unit | Utility | get messages', function () {
  test('it loads custom messages if defined', function (assert) {
    setMessages(customMessages);
    const messages = getMessages();

    // It has all the default messages
    Object.keys(defaultMessages).forEach((k) => {
      assert.ok(messages[k]);
    });

    // Check for custom message which means we loaded the right file
    assert.ok(messages.custom, 'It has the custom message');
    setMessages(undefined);
  });

  test('it falls back to default messages if not defined', function (assert) {
    assert.deepEqual(
      getMessages(),
      defaultMessages,
      'loads the correct module',
    );
  });
});
