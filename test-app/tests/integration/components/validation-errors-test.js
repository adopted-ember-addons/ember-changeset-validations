import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Components | validation errors', function (hooks) {
  setupRenderingTest(hooks);

  test('will clear error messages independently by field', async function (assert) {
    this.updateAttr = (changeset, attr, evt) => {
      changeset.set(attr, evt.target.value);
    };

    await render(hbs`
      <FooBar as |changeset|>
        <label>
          First name
          <input class="firstName" value={{changeset.firstName}} oninput={{fn this.updateAttr changeset "firstName"}}>
        </label>
        {{#if changeset.error.firstName}}
          <ul class="firstNameErrors">
          {{#each changeset.error.firstName.validation as |message|}}
            <li>{{message}}</li>
          {{/each}}
          </ul>
        {{/if}}

        <label>
          Last name
          <input class="lastName" value={{changeset.lastName}} oninput={{fn this.updateAttr changeset "lastName"}}>
        </label>
        {{#if changeset.error.lastName}}
          <ul class="lastNameErrors">
          {{#each changeset.error.lastName.validation as |message|}}
            <li>{{message}}</li>
          {{/each}}
          </ul>
        {{/if}}

        <label>
          Age
          <input type="number" class="age" value={{changeset.age}} oninput={{fn this.updateAttr changeset "age"}}>
        </label>
        {{#if changeset.error.age}}
          <ul class="ageErrors">
          {{#each changeset.error.age.validation as |message|}}
            <li>{{message}}</li>
          {{/each}}
          </ul>
        {{/if}}
      </FooBar>
    `);

    assert.notOk(find('ul.firstNameErrors'), 'has no first name errors');
    assert.notOk(find('ul.lastNameErrors'), 'has no last name errors');
    assert.notOk(find('ul.ageErrors'), 'has no age errors');

    await fillIn('input.firstName', 'a');
    await fillIn('input.lastName', 'b');

    assert.ok(find('ul.firstNameErrors li'), 'has first name errors');
    assert.ok(find('ul.lastNameErrors li'), 'has last name errors');
    assert.strictEqual(
      find('ul.lastNameErrors li').textContent.trim(),
      'Last name is too short (minimum is 2 characters)',
      'has last name errors',
    );
    assert.notOk(find('ul.ageErrors'), 'has no age errors');

    await fillIn('input.lastName', 'bc');

    assert.ok(
      find('ul.firstNameErrors li'),
      'has first name errors after last name input',
    );
    assert.notOk(
      find('ul.lastNameErrors'),
      'has no last name errors after input',
    );
    assert.notOk(find('ul.ageErrors'), 'has no age errors');

    await fillIn('input.age', '12');

    assert.ok(
      find('ul.firstNameErrors li'),
      'has first name errors after last name input',
    );
    assert.notOk(
      find('ul.lastNameErrors'),
      'has no last name errors after input',
    );
    assert.notOk(find('ul.ageErrors'), 'has no age errors after input');

    await fillIn('input.age', '');

    assert.ok(
      find('ul.firstNameErrors li'),
      'has first name errors after last name input',
    );
    assert.notOk(
      find('ul.lastNameErrors'),
      'has no last name errors after input',
    );
    assert.ok(find('ul.ageErrors'), 'has age errors after input');
  });

  test('works with nested fields', async function (assert) {
    this.updateAttr = (changeset, attr, evt) => {
      changeset.set(attr, evt.target.value);
    };

    await render(hbs`
      <FooBar as |changeset|>
        <label>
          State NY
          <input
            class="state-ny"
            value={{changeset-get changeset "state.ny"}}
            oninput={{fn this.updateAttr changeset "state.ny"}}
          >
        </label>
        {{#if changeset.error.state.ny}}
          <ul class="stateNyErrors">
          {{#each changeset.error.state.ny.validation as |message|}}
            <li>{{message}}</li>
          {{/each}}
          </ul>
        {{/if}}

        <label>
          First WI
          <input
            class="state-wi"
            value={{changeset-get changeset "state.wi"}}
            oninput={{fn this.updateAttr changeset "state.wi"}}
          >
        </label>
        {{#if changeset.error.state.wi}}
          <ul class="stateWiErrors">
          {{#each changeset.error.state.wi.validation as |message|}}
            <li>{{message}}</li>
          {{/each}}
          </ul>
        {{/if}}
      </FooBar>
    `);

    assert.notOk(find('ul.stateNyErrors'), 'has no ny errors');
    assert.notOk(find('ul.stateWiErrors'), 'has no wi errors');

    await fillIn('input.state-ny', 'a');
    await fillIn('input.state-wi', 'b');

    assert.ok(find('ul.stateNyErrors li'), 'has ny errors');
    assert.ok(find('ul.stateWiErrors li'), 'has wi errors');
    assert.strictEqual(
      find('ul.stateWiErrors li').textContent.trim(),
      'State wi is too short (minimum is 2 characters)',
      'has last name errors',
    );

    await fillIn('input.state-wi', 'bc');

    assert.ok(find('ul.stateNyErrors li'), 'has ny errors after wi input');
    assert.strictEqual(
      find('ul.stateNyErrors li').textContent.trim(),
      'State ny is too short (minimum is 2 characters)',
      'has last name errors',
    );
    assert.notOk(find('ul.stateWiErrors'), 'has no wi errors after input');
  });
});
