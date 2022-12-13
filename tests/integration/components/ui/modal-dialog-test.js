import { clearRender, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { UiModalDialogPO } from '../../../page-objects/components/ui/modal-dialog';

const page = new UiModalDialogPO();
const mainLayoutId = 'main-layout';
const mainLayoutSelector = `#${mainLayoutId}`;

module('Integration | Component | ui/modal-dialog', function (hooks) {
  setupRenderingTest(hooks);

  let mainLayoutElement;

  hooks.beforeEach(function () {
    mainLayoutElement = document.createElement('div');
    mainLayoutElement.id = mainLayoutId;

    document.querySelector('body')?.appendChild(mainLayoutElement);
  });

  hooks.afterEach(function () {
    document.querySelector('body')?.removeChild(mainLayoutElement);
  });

  test('it renders as an alert dialog', async function (assert) {
    await render(hbs`
      <Ui::ModalDialog data-test="spread">
        <div id="test-subject"></div>
      </Ui::ModalDialog>
    `);

    assert.strictEqual(
      document.querySelector(mainLayoutSelector)?.getAttribute('inert'),
      'true',
      'The main layout should be inert'
    );
    assert.dom(page.element).exists();
    assert
      .dom(page.element)
      .hasAttribute(
        'data-test',
        'spread',
        'Root element should accept spread attributes'
      );
    assert
      .dom(page.element)
      .hasAttribute(
        'role',
        'alertdialog',
        'Root element should have an appropriate role'
      );
    assert
      .dom(page.element)
      .hasAttribute(
        'aria-modal',
        'true',
        'Root element should inform it is a modal'
      );
    assert.dom('#test-subject').exists('It should yield');

    await clearRender();

    assert.notOk(
      document.querySelector(mainLayoutSelector)?.getAttribute('inert'),
      'The main layout should not be inert'
    );
  });
});
