import { componentParseError } from '../const/errors';

export class PixelParser {
  constructor(pixelDOM) {
    this.pixelDOM = pixelDOM;
    this.replaceRegExp = new RegExp(/{{([^{}]*)}}/g);
  }

  /* 
    context - контекст блока в который вставляется компонент / собственный контекст
    component.context - собственный контекст
    props - дополнительный параметры из строки компонента
    slots - компоненты встраиваемые внутрь компонентов
  */
  parseHTML(template, context) {
    return template.replace(this.replaceRegExp, (match, index) => {
      const isComponent = match.startsWith('{{@');

      if (isComponent) {
        try {
          const [_, componentName, ...componentData] = match.split('@');
          const component = this.pixelDOM.components[componentName.trim()];

          if (!component) throw Error(componentParseError(componentName));

          const props = this.parseComponent(componentData, context);
          let slots = {};

          if (context.slots) {
            slots = this.parseSlots(context.slots);
          }

          return this.parseHTML(component.template, { ...component.context, ...context, ...slots, ...props });
        } catch (error) {
          console.error(error);
        }
      } else {
        const contextValue = this.parseObjectPath(context, match);
        return contextValue;
      }
    });
  }

  parseComponent(componentData, context) {
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

  parseObjectPath(context, path) {
    try {
      const clearPath = path.substring(2, path.length - 2).trim();
      const keys = clearPath.split('.');

      let result = context;

      for (let key of keys) {
        if (key.startsWith('_event')) {
          const [event, functName, target] = key.split('=');
          const listenerType = event.substring(6).toLowerCase();
          console.log(event, functName, target);
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
