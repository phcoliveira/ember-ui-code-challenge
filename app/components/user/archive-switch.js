import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class UserArchiveSwitchComponent extends Component {
  /**
   * args
   * - user: UserModel
   */

  @tracked
  confirmationAlertDialogIsOpen = false;

  @tracked
  errorAlertDialogIsOpen = false;

  get isLoading() {
    return !this.args.user.toggleArchive.isIdle;
  }

  @action
  onToggleArchive() {
    this.confirmationAlertDialogIsOpen = true;
  }

  @action
  onRefuse() {
    this.confirmationAlertDialogIsOpen = false;
  }

  @action
  onAccept() {
    this.confirmationAlertDialogIsOpen = false;
    this.toggleArchive.perform();
  }

  @action
  onAcknowledgeError() {
    this.errorAlertDialogIsOpen = false;
  }

  toggleArchive = task({ drop: true }, async () => {
    try {
      await this.args.user.toggleArchive.perform();
    } catch (error) {
      // FIXME: Log the error, e.g.: Sentry.captureException(error);
      this.errorAlertDialogIsOpen = true;
    }
  });
}
