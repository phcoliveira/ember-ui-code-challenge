import Model, { attr } from '@ember-data/model';
import { task } from 'ember-concurrency';

export default class UserModel extends Model {
  @attr('boolean', { defaultValue: () => false }) archived;
  @attr('string') image;
  @attr('string') name;

  /**
   * @description This task is responsible for toggling the instance property
   * "archived" and saving the record.
   *
   * If the record is not persisted, then it won't be saved.
   */
  toggleArchive = task({ drop: true }, async () => {
    const currentValue = this.archived;
    let mustRevertChanges = true;

    this.archived = !currentValue;

    try {
      const mustPersist = !this.isNew;
      if (mustPersist) {
        await this.save();
      }

      mustRevertChanges = false;
    } finally {
      if (mustRevertChanges) {
        this.archived = currentValue;
      }
    }
  });
}
