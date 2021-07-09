import { Parser } from '.';
import { PREFIXES } from './const';
import { Component, EventHadnlerConfig, Props } from '../utils';
import { Attributes, IParsedTag } from './parser.type';

export class TagParser {
  parserInstant: Parser;

  attrRegExp: RegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  replaceRegExp = new RegExp(/{{([^{}]*)}}/g);

  constructor(parser: Parser) {
    this.parserInstant = parser;
  }

  parse = (tag: string, reqProps: string[] = [], parentComponent?: Component, componentTag?: string): IParsedTag => {
    const tagName = tag.split(' ')[0].trim().substr(1).split('>')[0];
    const currentTag = `${tag} ${componentTag ?? ''}`;
    const reg = new RegExp(this.attrRegExp);

    let attr: RegExpExecArray | null = null;
    const attrs: Attributes = {};
    const propHandlers: Record<string, EventHadnlerConfig> = {};
    const usedPropsList: string[] = [];

    const props = reqProps.reduce((acc: Props, item: string) => {
      acc[item] = null;
      return acc;
    }, {});

    do {
      attr = reg.exec(currentTag);
      if (attr) {
        const [name, value] = attr[0].trim().split('=');
        let cleanName = name;
        let type = name;
        const mod = name.indexOf(':');
        const currentValue = value ? value.substring(1, value.length - 1) : '';

        if (mod !== -1) {
          cleanName = cleanName.substring(mod + 1);
          type = type.substring(0, mod + 1);
        }

        if (type === PREFIXES.STATIC) {
          props[cleanName] = currentValue;
        } else if (type === PREFIXES.PROPS) {
          this.setProps(cleanName, currentValue, props, attrs, parentComponent);
        } else if (type === PREFIXES.BIND) {
          usedPropsList.push(currentValue);
          this.bindProps(cleanName, currentValue, props, parentComponent);
        } else if (type === PREFIXES.HANLDER) {
          this.handleEvent(cleanName, currentValue, propHandlers);
        } else if (type === PREFIXES.IF_CONDITION || type === PREFIXES.ELSE_CONDITION) {
          this.conditionHandler(cleanName, currentValue, attrs, parentComponent);
        } else {
          attrs[name] = currentValue;
        }
      }
    } while (attr);

    return { tagName, attrs, propHandlers, props, usedPropsList };
  };

  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["props", "attrs"] }] */
  setProps(name: string, currentValue: string, props: Props, attrs: Attributes, parentComponent?: Component) {
    if (parentComponent && currentValue) {
      let value = currentValue;
      const reg = new RegExp(this.replaceRegExp);
      const replacePaternString = reg.exec(value);
      const isReplace = replacePaternString && replacePaternString[1];

      if (isReplace) {
        value = replacePaternString![1].trim();
      }

      if (value in parentComponent.props) {
        let propValue = this.parseObjectPathTag(parentComponent.props, value);

        if (isReplace) {
          propValue = currentValue.replace(replacePaternString![0], propValue as string);
        }

        props[name] = propValue;
        attrs[name] = propValue as string;
      }
    }
  }

  /* eslint-disable no-param-reassign */
  bindProps(name: string, currentValue: string, props: Props, parentComponent?: Component) {
    if (parentComponent) {
      const [propName] = currentValue.split('.');

      if (propName in parentComponent.props) {
        props[name] = this.parseObjectPathTag(parentComponent.props, currentValue);
      } else if (propName in parentComponent.state) {
        props[name] = this.parseObjectPathTag(parentComponent.state as Props, currentValue);
      }
    }
  }

  handleEvent = (name: string, currentValue: string, propHandlers: Record<string, EventHadnlerConfig>) => {
    propHandlers[currentValue] = { event: name, name: currentValue };
  };

  conditionHandler = (name: string, currentValue: string, attrs: Attributes, parentComponent?: Component) => {
    if (parentComponent) {
      const isFalseType = name[0] === '!';
      let parentProp = false;
      let prop = isFalseType ? name.slice(1) : name;

      if (prop[prop.length - 1] === '>') {
        prop = prop.slice(0, -1);
      }

      if (prop in parentComponent.props) {
        parentProp = parentComponent.props[prop] as boolean;
      } else if (prop in parentComponent.state) {
        parentProp = parentComponent.props[prop] as boolean;
      }

      if (!parentProp && !isFalseType) {
        attrs.style = 'display: none';
      } else if (parentProp && isFalseType) {
        attrs.style = 'display: none';
      }
    }
  };

  parseObjectPathTag = (props: Props, path: string) => {
    try {
      const keys = path.split('.');
      let result: Props = props;

      for (const key of keys) {
        const value = result[key];

        if (!value) {
          return '';
        }

        result = value as Props;
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  };
}
