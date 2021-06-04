import { componentParseError } from '../const/errors';

export class PixelParser {
  constructor(pixelDOM) {
    this.pixelDOM = pixelDOM;
    this.replaceRegExp = new RegExp(/{{([^{}]*)}}/g);
  }

  parserTypes = {
    '{{@': this.parseComponent.bind(this),
    '{{#': this.parseLoop.bind(this),
    '{{?': this.parseCondition.bind(this)
  };
  /* 
    context - контекст блока в который вставляется компонент / собственный контекст
    component.context - собственный контекст
    props - дополнительный параметры из строки компонента
    slots - компоненты встраиваемые внутрь компонентов
  */
  parseHTML(template, context) {
    return template.replace(this.replaceRegExp, (match, index) => {
      const type = match.substring(0, 3);
      return this.parserTypes[type] ? this.parserTypes[type](match, context) : this.parseObjectPath(context, match);
    });
  }

  parseComponent(match, context) {
    try {
      const [_, componentName, ...componentData] = match.split('@');
      const component = this.pixelDOM.components[componentName.trim()];

      if (!component) throw Error(componentParseError(componentName));

      const props = this.parseComponentProps(componentData, context);
      let slots = {};

      if (context.slots) {
        slots = this.parseSlots(context.slots);
      }

      return this.parseHTML(component.template, { ...component.context, ...context, ...slots, ...props });
    } catch (error) {
      console.error(error);
    }
  }

  parseComponentProps(componentData, context) {
    const props = {};

    componentData.forEach((prop) => {
      const splited = prop.split('=');
      const [name, value, target] = splited;

      if (splited.length > 1) {
        if (name.startsWith('_event')) {
          const listenerType = name.substring(6).toLowerCase();
          this.pixelDOM.registerListener(listenerType, target, context[value]);
        } else {
          props[name] = value ? value.trim() : '';
        }
      }
    });

    return props;
  }

  parseLoop(match, context) {
    let result = ``;
    const [options] = match.split('{{#')[1].split('#}}');
    const [contextProp, componentName, ...staticProps] = options
      .trim()
      .split('@')
      .filter((value) => value)
      .map((value) => value.trim());

    const props = staticProps.reduce((acc, string) => {
      const [key, value] = string.split('=');
      acc[key] = value;
      return acc;
    }, {});

    context[contextProp].forEach((item) => {
      const component = this.pixelDOM._components[componentName]();
      result += this.parseHTML(component.template, { ...props, ...item });
    });
    return result;
  }

  parseCondition(match, context) {
    const [options] = match.split('{{?')[1].split('?}}');
    const [ifCondition, propName] = options.split('if=')[1].split('=');

    const ifString = `(?<=if=${ifCondition}=)([\\s\\S]+?)(?==if)`;
    const elseString = `(?<=else=)([\\s\\S]+?)(?==else)`;
    const ifRegExp = new RegExp(ifString, 'gi');
    const elseRegExp = new RegExp(elseString, 'gi');

    const ifContent = ifRegExp.exec(options);
    const elseContent = elseRegExp.exec(options);
    const replaceFieldArray = /(?<=@)([\s\S]+?)(?=@)/gi.exec(options);
    const replaceField = replaceFieldArray && replaceFieldArray[0];

    if (context[ifCondition] ?? false) {
      if (ifContent && replaceField) {
        return this.parseHTML(ifContent[0].replaceAll(`@${replaceField}@`, `${context[replaceField]}`), context);
      } else if (ifContent) {
        return this.parseHTML(ifContent[0], context);
      }
    } else if (elseContent && replaceField) {
      return this.parseHTML(elseContent[0].replaceAll(`@${replaceField}@`, `${context[replaceField]}`), context);
    }

    return '';
  }

  parseObjectPath(context, path) {
    try {
      const clearPath = path.substring(2, path.length - 2).trim();
      const keys = clearPath.split('.');

      let result = context;

      for (let key of keys) {
        if (key.startsWith('_event')) {
          const [event, functName, target] = key.split('=');
          const listenerType = event.substring(6).toLowerCase();

          this.pixelDOM.registerListener(listenerType, target, context[functName]);
          return '';
        }

        const value = result[key];

        if (typeof value === 'function') {
          result = value();

          continue;
        }

        if (!value) {
          return '';
        }

        result = value;
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  parseSlots(slots) {
    const parsedSlots = { slots: {} };

    for (const key in slots) {
      parsedSlots.slots[key] = this.parseHTML(slots[key].template.trim(), slots[key].context);
    }

    return parsedSlots;
  }
}
