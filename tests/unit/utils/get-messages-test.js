import getMessages from 'ember-changeset-validations/utils/get-messages';
import defaultMessages from 'ember-changeset-validations/utils/messages';
import { module, test } from 'qunit';
import { getOwnConfig } from '@embroider/macros';

module('Unit | Utility | get messages', function () {
  test('it loads custom messages if defined', function (assert) {
    let messages = getMessages();

    // It has all the default messages
    Object.keys(defaultMessages).forEach((k) => {
      assert.ok(messages[k]);
    });

    // Check for custom message which means we loaded the right file
    assert.ok(messages.custom, 'It has the custom message');
  });

  test('it falls back to default messages if not defined', function (assert) {
    let originalConfig = getOwnConfig(); // enable the feature
    const originalMessages = originalConfig?.messages;
    if (originalConfig) {
      originalConfig.messages = undefined;
    }

    assert.deepEqual(
      getMessages(false),
      defaultMessages,
      'loads the correct module',
    );

    if (originalConfig) {
      originalConfig.messages = originalMessages;
    }
  });
});
