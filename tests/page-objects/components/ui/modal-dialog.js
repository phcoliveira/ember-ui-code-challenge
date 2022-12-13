import { PageObject } from 'fractal-page-object';

function dataTestFor(elementName) {
  return `[data-test-ui-modal-dialog="${elementName}"]`;
}

export class UiModalDialogPO extends PageObject {
  constructor(elementName) {
    super(elementName ?? dataTestFor('root'));
  }
}
