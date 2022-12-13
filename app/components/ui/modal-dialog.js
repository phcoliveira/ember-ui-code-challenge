import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class UiModalDialogComponent extends Component {
  @action
  onInsertModal(element) {
    document.querySelector('#main-layout')?.setAttribute('inert', 'true');
    element.focus();
  }

  @action
  onRemoveModal() {
    document.querySelector('#main-layout')?.removeAttribute('inert');
  }
}
