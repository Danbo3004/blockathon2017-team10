import validatorjs from 'validatorjs';

validatorjs.useLang('vi');

export default {
  dvr: {
    package: validatorjs,
    extend: ($validator) => {
      const messages = $validator.getMessages('vi');
      messages.required = 'Bắt buộc nhập';
      messages.confirmed = 'Không trùng khớp';

      $validator.setMessages('vi', messages);
    },
  },
};
