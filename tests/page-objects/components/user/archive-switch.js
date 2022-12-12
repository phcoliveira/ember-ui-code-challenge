import { PageObject, selector } from 'fractal-page-object';

function dataTestFor(elementName) {
  return `[data-test-user-archive-switch="${elementName}"]`;
}

export class UserArchiveSwitchPO extends PageObject {
  constructor(elementName) {
    super(elementName ?? dataTestFor('root'));
  }
}
