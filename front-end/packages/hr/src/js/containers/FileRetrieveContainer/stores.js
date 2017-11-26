import { observable, computed, action } from 'mobx';
import { postToContract } from './actions';

import config from '../../config';

import transport from 'shared/transport';

import KeyFormModel from './forms';

class ViewStore {
  @observable form;
  @observable isSaving = false;
  @observable link;

  constructor() {
    this.form = new KeyFormModel();
  }

  @action
  submit() {
    this.isSaving = true;
    const values = this.form.values();

    postToContract(Object.assign(values)).then(
      action((data) => {
        const link = data.data;
        this.isSaving = false;
        this.link = link;
      }),
    );
  }
}

export default ViewStore;
