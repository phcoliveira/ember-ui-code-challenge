import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UserArchiveSwitchPO } from '../../../page-objects/components/user/archive-switch';

const page = new UserArchiveSwitchPO();

module('Integration | Component | user/archive-switch', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<User::ArchiveSwitch />`);

    assert.dom(page.element).exists();
  });
});
