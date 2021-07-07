export const FIELD_TYPE = {
  login: 'text',
  password: 'password',
  email: 'email',
  firstName: 'text',
  secondName: 'text',
  phoneNumber: 'tel',
  passwordRepeat: {
    compare: 'password',
    type: 'password',
    field: 'passwordRepeat',
  },
};

export enum AUTH {
  signup = 'signup',
  signin = 'signin',
  user = 'user',
  logout = 'logout',
}
