const FIELD_TYPE = {
  login: 'text',
  password: 'password',
  email: 'email',
  first_name: 'text',
  second_name: 'text',
  phone: 'tel',
  passwordRepeat: {
    compare: 'password',
    type: 'password',
    field: 'passwordRepeat',
  },
};

enum AUTH_SERVICE {
  signup = 'signup',
  signin = 'signin',
  user = 'user',
  logout = 'logout',
}

enum AUTH_ERRORS {
  RFNV = 'Registration form is not valid',
  LFNV = 'Login form is not valid',
}

export { FIELD_TYPE, AUTH_SERVICE, AUTH_ERRORS };
