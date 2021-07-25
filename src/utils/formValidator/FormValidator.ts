import { IValidatorConfig } from './FormValidator.type';

class Validator {
  static ERROR_MESSAGES: Record<string, string> = {
    empty: 'Поле не может быть пустым',
    password: 'Пароль не проходит условия',
    text: 'Минимум 3 лат. буквы',
    tel: 'Не правильный формат телефонного номера',
    email: 'Не похоже на почту ',
    compare: 'Значение полей не совпадает',
  };

  rules: Record<string, RegExp> = {
    /* eslint max-len: "off" */
    email:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    password:
      /(?=[#$-/:-?{-~!"^_`[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`[\]]))(?=[#$-/:-?{-~!"^_`[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`[\]a-zA-Z0-9]{4,}/,
    text: /\w*/,
    tel: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
  };

  validate(state: any, config: IValidatorConfig, fieldsType: Record<string, string | Record<string, string>>) {
    let isFullValid = true;

    Object.keys(fieldsType)
      .filter((type) => type)
      .forEach((field) => {
        const typeConfig = fieldsType[field];
        const fieldValue = state[config.form][field] ? state[config.form][field].toString().trim() : '';

        if (!fieldValue) {
          if (!config.ignoreEmpty) {
            isFullValid = false;
            state[config.errors][field] = Validator.ERROR_MESSAGES.empty;
          }
        } else if (typeof typeConfig === 'object') {
          this.handleUncommon(
            typeConfig,
            state[config.form] as Record<string, string>,
            state[config.errors] as Record<string, string>
          );
        } else {
          const isValid = this.rules[typeConfig].test(fieldValue);

          if (!isValid) {
            isFullValid = false;
            state[config.errors][field] = this.setErrorMessage(typeConfig);
          } else {
            state[config.errors][field] = '';
          }
        }
      });

    return isFullValid;
  }

  handleUncommon(config: Record<string, string>, state: Record<string, string>, errors: Record<string, string>) {
    const { type } = config;
    const value = state[config.field];

    const isValid = this.rules[type].test(value.toString());

    if (!isValid) {
      state[config.field] = this.setErrorMessage(type);
    } else if (config.compare) {
      if (state[config.field] === state[config.compare]) {
        errors[config.field] = '';

        /*  prettier-ignore */
        if (
          !errors[config.compare].length
          || (errors[config.compare].length && errors[config.compare] === Validator.ERROR_MESSAGES.compare)
        ) {
          errors[config.compare] = '';
        }
      } else {
        errors[config.field] = Validator.ERROR_MESSAGES.compare;
        errors[config.compare] = Validator.ERROR_MESSAGES.compare;
      }
    }

    return !!errors[config.field].length;
  }

  setErrorMessage = (type: string): string => Validator.ERROR_MESSAGES[type];
}

export const FormValidator = new Validator();
