import { click, render, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { UserArchiveSwitchPO } from '../../../page-objects/components/user/archive-switch';
import { getServer } from '../../../helpers/pretender';

const page = new UserArchiveSwitchPO();

module('Integration | Component | user/archive-switch', function (hooks) {
  setupRenderingTest(hooks);

  let server;

  hooks.beforeEach(async function () {
    server = getServer();

    const storeService = this.owner.lookup('service:store');
    this.set('user', await storeService.findRecord('user', 1));
  });

  hooks.afterEach(async function () {
    server.shutdown();
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <User::ArchiveSwitch
        @user={{this.user}}
        data-test="spread"
      >
        <div id="test-subject"></div>
      </User::ArchiveSwitch>
    `);

    assert.dom(page.element).isVisible('Root element should be visible');
    assert
      .dom(page.element)
      .hasAttribute(
        'data-test',
        'spread',
        'Root element should accept spread attributes'
      );
    assert
      .dom(page.element)
      .doesNotHaveAttribute('disabled', 'Root element should not be disabled');
    assert
      .dom(page.element)
      .doesNotHaveClass('is-loading', 'Root element should not be loading');
    assert.dom('#test-subject').doesNotExist('It should not yield');
  });

  test('it shows the right copy according to the user', async function (assert) {
    await render(hbs`<User::ArchiveSwitch @user={{this.user}} />`);

    assert.dom(page.element).hasText('Archive');

    this.set('user.archived', true);
    assert.dom(page.element).hasText('Unarchive');
  });

  test('it has a confirmation alert dialog', async function (assert) {
    await render(hbs`<User::ArchiveSwitch @user={{this.user}} />`);
    await click(page.element);

    assert
      .dom(page.confirmationAlertDialog.element)
      .isVisible('Confirmation alert dialog should be visible');
    assert
      .dom(page.refuse.element)
      .isVisible('Refuse button should be visible');
    assert
      .dom(page.accept.element)
      .isVisible('Accept button should be visible');
  });

  test('when confirmation is refused, the user is not archived', async function (assert) {
    await render(hbs`<User::ArchiveSwitch @user={{this.user}} />`);
    await click(page.element);
    await click(page.refuse.element);

    assert
      .dom(page.confirmationAlertDialog.element)
      .doesNotExist('Confirmation alert dialog should be removed');
    assert.dom(page.element).hasText('Archive');
  });

  test('when confirmation is accepted, the user is archived', async function (assert) {
    server.patch('/api/users/1', async () => {
      assert.step('server');

      await waitUntil(() => !page.confirmationAlertDialog.element);
      assert
        .dom(page.confirmationAlertDialog.element)
        .doesNotExist(
          'Confirmation alert dialog should be removed immediately'
        );

      await waitUntil(() => page.element.hasAttribute('disabled'));
      assert
        .dom(page.element)
        .isDisabled(
          'Root element should be disabled while waiting for the server'
        );
      assert
        .dom(page.element)
        .hasClass('is-loading', 'Root element should be loading');

      return [204, {}];
    });

    await render(hbs`<User::ArchiveSwitch @user={{this.user}} />`);
    await click(page.element);

    assert.step('client');
    await click(page.accept.element);

    assert.dom(page.element).hasText('Unarchive');
    assert.verifySteps(['client', 'server']);
  });

  test('when confirmation is accepted, but the changes were not saved, the user is not archived', async function (assert) {
    server.patch('/api/users/1', () => [500, {}]);

    await render(hbs`<User::ArchiveSwitch @user={{this.user}} />`);
    await click(page.element);

    await click(page.accept.element);

    await waitUntil(() => page.errorAlertDialog.element);
    assert
      .dom(page.errorAlertDialog.element)
      .isVisible('Error alert dialog should be visible');

    await click(page.acknowledgeError.element);
    assert
      .dom(page.errorAlertDialog.element)
      .doesNotExist('Error alert dialog should be removed');
    assert.dom(page.element).hasText('Archive');
  });
});
