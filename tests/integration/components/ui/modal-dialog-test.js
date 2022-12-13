import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { UiModalDialogPO } from '../../../page-objects/components/ui/modal-dialog';

const page = new UiModalDialogPO();

module('Integration | Component | ui/modal-dialog', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::ModalDialog data-test="spread">
        <div id="test-subject"></div>
      </Ui::ModalDialog>
    `);

    assert.dom(page.element).exists();
    assert
      .dom(page.element)
      .hasAttribute(
        'data-test',
        'spread',
        'Root element should accept spread attributes'
      );
    assert.dom('#test-subject').exists('It should yield');
  });
});
