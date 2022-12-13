import { PageObject } from 'fractal-page-object';

function dataTestFor(elementName) {
  return `[data-test-ui-alert-dialog="${elementName}"]`;
}

export class UiAlertDialogPO extends PageObject {
  constructor(elementName) {
    super(elementName ?? dataTestFor('root'));
  }
}
