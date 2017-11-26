import { observable, computed, action } from 'mobx';
import { requestLink, uploadImage, postToContract } from './actions';

import config from '../../config';

import transport from 'shared/transport';

import KeyFormModel from './forms';

class ViewStore {
  @observable form;
  @observable file = null;
  @observable isSaving = false;

  constructor() {
    this.form = new KeyFormModel();
  }

  @action
  uploadFile() {
    const file = this.file;
    const fileType = file.name.split('.').pop();

    return requestLink(fileType).then((data) => {
      if (data && data.data && data.data.link) {
        return uploadImage(file, data.data.link).then(() => {
          const fileLink = `${config.FILE_HOST}/${data.data.fileUrl}`;
          return Promise.resolve(fileLink);
        });
      }
    });
  }

  @action
  setFile(file) {
    this.file = file;
  }

  @action
  submit() {
    const values = this.form.values();
    this.isSaving = true;

    // const reader = new FileReader();

    // reader.onload = (event) => {
    //   transport
    //     .getFile(
    //       'https://s3-us-west-1.amazonaws.com/honeycomb-prod/Others/7a69af94-cc61-437d-bd6e-0adba8247c9c.pdf',
    //     )
    //     .then((data) => {
    //       console.log(data.data.length);
    //       console.log(event.target.result.length);
    //     });
    // };

    // reader.readAsDataURL(this.file);

    return this.uploadFile().then((fileLink) => {
      postToContract(Object.assign(values, { fileLink }))
        .then(() => {
          this.viewStore.toggleSaving();
          alert('Store file successfully');
        })
        .catch(() => alert('An error occurred, please try again later'));
    });
  }

  @action
  toggleSaving() {
    this.isSaving = !this.isSaving;
  }
}

export default ViewStore;
