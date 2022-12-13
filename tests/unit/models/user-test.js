import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { getServer } from '../../helpers/pretender';

module('Unit | Model | user', function (hooks) {
  setupTest(hooks);

  let server;
  let storeService;
  let userRecord;

  hooks.beforeEach(async function () {
    server = getServer();
    storeService = this.owner.lookup('service:store');
    userRecord = await storeService.findRecord('user', 1);
  });

  hooks.afterEach(function () {
    server.shutdown();
  });

  test('it exists', function (assert) {
    assert.strictEqual(
      userRecord.archived,
      false,
      'Default value should be false.'
    );
  });

  module('user.toggleArchive', function () {
    test('it toggles the property "archived" when the record is new', async function (assert) {
      server.patch('/api/users/1', () => {
        assert.step('server');
        return [204, {}];
      });

      userRecord = storeService.createRecord('user', {});

      assert.step('client');
      await userRecord.toggleArchive.perform();

      assert.ok(userRecord.archived);
      assert.verifySteps(['client'], 'The server was not hit');
    });

    test('it toggles the property "archived" and save the record when it is persisted', async function (assert) {
      server.patch('/api/users/1', () => {
        assert.step('server');
        return [204, {}];
      });

      assert.step('client');
      await userRecord.toggleArchive.perform();

      assert.ok(userRecord.archived);
      assert.verifySteps(
        ['client', 'server'],
        'The client should have hit the server'
      );
    });

    test('it throws an error when it can not save a persisted record', async function (assert) {
      server.patch('/api/users/1', () => {
        assert.step('server');
        return [500, {}];
      });

      try {
        assert.step('client');
        await userRecord.toggleArchive.perform();
      } catch (error) {
        assert.step('error');
        assert.ok(
          /500/.test(error.message),
          'The message should mention the server response'
        );
      }

      assert.notOk(userRecord.archived, 'The change should be reverted');
      assert.verifySteps(['client', 'server', 'error']);
    });
  });
});
