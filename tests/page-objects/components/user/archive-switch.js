import { PageObject, globalSelector } from 'fractal-page-object';

function dataTestFor(elementName) {
  return `[data-test-user-archive-switch="${elementName}"]`;
}

export class UserArchiveSwitchPO extends PageObject {
  constructor(elementName) {
    super(elementName ?? dataTestFor('root'));
  }

  accept = globalSelector(dataTestFor('accept'));

  acknowledgeError = globalSelector(dataTestFor('acknowledge-error'));

  confirmationAlertDialog = globalSelector(
    dataTestFor('confirmation-alert-dialog')
  );

  errorAlertDialog = globalSelector(dataTestFor('error-alert-dialog'));

  refuse = globalSelector(dataTestFor('refuse'));
}
