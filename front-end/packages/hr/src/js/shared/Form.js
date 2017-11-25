import { action } from 'mobx';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

import { defineMessages } from 'react-intl';
import intl from 'shared/intl';

const messages = defineMessages({
  loadingMessage: {
    id: 'Form.loadingMessage',
    defaultMessage: 'Đang kiểm tra...',
  },
});

validatorjs.useLang('en');

export default class Form extends MobxReactForm {
  constructor(config = {}) {
    const newFields = Object.assign({}, config.fields);

    // If field's label is an react-intl object, format it to string through react-intl API
    Object.keys(newFields).forEach((key) => {
      const field = newFields[key];
      if (typeof field.label === 'object' && field.label.id && field.label.defaultMessage) {
        field.label = intl.formatMessage(field.label);
      }
    });

    super({
      plugins: config.plugins || {},
      options: config.options || { loadingMessage: intl.formatMessage(messages.loadingMessage) },
      fields: newFields,
    });
  }

  entity;

  onError(form) {
    // get all form errors
    console.log(form.errors());
  }

  labelFor(field) {
    return this.$(field).label;
  }

  setErrors(errors) {
    const me = this;
    errors.map((err) => {
      if (me.$(err.field) !== undefined) {
        me.$(err.field).setInvalid(err.message, true);
      }
    });
  }

  /**
    On Clear
   */
  handleOnClear = (e) => {
    e.preventDefault();
    // clear the form
    this.clear();
  };

  /**
    On Reset
   */
  handleOnReset = (e) => {
    e.preventDefault();
    // reset to the default initial values
    this.reset();
  };

  setEntity(entity) {
    this.entity = entity;
  }

  getEntity() {
    return this.entity;
  }

  @action
  bind() {
    const me = this;
    _.forIn(me.values(), (val, key) => {
      try {
        _.set(me.entity, key, val);
      } catch (error) {
        console.error(error);
      }
    });
    return this.entity;
  }
}
