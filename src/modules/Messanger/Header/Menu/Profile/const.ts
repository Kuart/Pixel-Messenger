export const FIELD_TYPE = {
  login: 'text',
  email: 'email',
  first_name: 'text',
  second_name: 'text',
  display_name: 'text',
  phone: 'tel',
};

export const FIELD_TYPE_FULL = {
  login: 'text',
  email: 'email',
  first_name: 'text',
  second_name: 'text',
  display_name: 'text',
  phone: 'tel',
  oldPassword: 'password',
  newPassword: 'password',
  passwordRepeat: {
    compare: 'newPassword',
    type: 'password',
    field: 'passwordRepeat',
  },
};
