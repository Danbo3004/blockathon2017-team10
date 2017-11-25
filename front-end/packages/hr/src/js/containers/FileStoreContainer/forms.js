import validatorjs from 'validatorjs';

import Form from 'shared/Form';

const keyFields = (entity = {}) => ({
  privateKey: {
    label: 'Your private key',
    rules: 'required',
  },
  password: {
    label: 'Password to encrypt file',
    rules: 'required',
  },
});

const plugins = {
  dvr: {
    package: validatorjs,
  },
};

class KeyFormModel extends Form {
  constructor(entity, config = {}) {
    super({
      plugins: config.plugins || plugins,
      fields: keyFields(entity),
    });
    this.setEntity(entity);
  }
}

export default KeyFormModel;
