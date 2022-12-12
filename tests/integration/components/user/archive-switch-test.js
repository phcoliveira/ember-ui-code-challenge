import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UserArchiveSwitchPO } from '../../../page-objects/components/user/archive-switch';

const page = new UserArchiveSwitchPO();

module('Integration | Component | user/archive-switch', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    const storeService = this.owner.lookup('service:store');

    this.set('user', storeService.createRecord('user', {}));
  });

  test('it renders', async function (assert) {
    await render(hbs`<User::ArchiveSwitch @user={{this.user}} />`);

    assert.dom(page.element).exists();
  });

  test('it accepts spread attributes', async function (assert) {
    await render(hbs`
      <User::ArchiveSwitch
        @user={{this.user}}
        data-test="spread"
      />`);

    assert.dom(page.element).hasAttribute('data-test', 'spread');
  });

  test('it does not yield', async function (assert) {
    await render(hbs`
      <User::ArchiveSwitch @user={{this.user}}>
        <div id="test-subject"></div>
      </User::ArchiveSwitch>
    `);

    assert.dom('#test-subject').doesNotExist();
  });

  test('it shows the right copy according to the user', async function (assert) {
    await render(hbs`<User::ArchiveSwitch @user={{this.user}} />`);

    assert.dom(page.element).hasText('Archive');

    this.set('user.archived', true);
    assert.dom(page.element).hasText('Unarchive');
  });
});
