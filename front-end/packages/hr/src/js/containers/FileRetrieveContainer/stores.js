import { observable, computed, action } from 'mobx';
import { postToContract } from './actions';

import config from '../../config';

import transport from 'shared/transport';

import KeyFormModel from './forms';

class ViewStore {
  @observable form;
  @observable isSaving = false;

  constructor() {
    this.form = new KeyFormModel();
  }

  @action
  submit() {
    this.isSaving = true;
    const values = this.form.values();

    postToContract(Object.assign(values)).then(action(() => (this.isSaving = false)));
  }
}

export default ViewStore;
