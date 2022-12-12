import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('boolean', { defaultValue: () => false }) archived;
  @attr('string') image;
  @attr('string') name;
}
