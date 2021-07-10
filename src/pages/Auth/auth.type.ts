export interface ILoginForm {
  login: string;
  password: string;
}

export interface IRegistrationForm {
  login: string;
  email: string;
  firstName: string;
  secondName: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
}

/* eslint camelcase: "off" */
export interface IUser {
  avatar: null;
  display_name: null | string;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}
