import Model, { attr } from '@ember-data/model';
import { task } from 'ember-concurrency';

export default class UserModel extends Model {
  @attr('boolean', { defaultValue: () => false }) archived;
  @attr('string') image;
  @attr('string') name;

  toggleArchive = task({ drop: true }, async () => {
    const currentValue = this.archived;
    let completed = false;

    this.archived = !currentValue;

    try {
      await this.save();
      completed = true;
    } catch (error) {
      this.archived = currentValue;
      throw error;
    } finally {
      // NOTE: In case the task was cancelled, the changes must be reverted.
      if (!completed) {
        this.archived = currentValue;
      }
    }
  });
}
