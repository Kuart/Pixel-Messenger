import { Parser } from '.';
import { PREFIXES } from './const';
import { IData, IParsedTag } from './parser.type';
import { VComponentNode, EventHadnlerConfig, Props } from '../pixelDom';
import { slicePropStorage, bindProps } from './utils';

export class TagParser {
  parserInstant: Parser;

  attrRegExp: RegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  replaceRegExp = new RegExp(/{{([^{}]*)}}/g);

  constructor(parser: Parser) {
    this.parserInstant = parser;
  }

  parse(tagString: string, data: IData): IParsedTag {
    const attrReg = new RegExp(this.attrRegExp);
    let attr: RegExpExecArray | null = null;
    let cleanName = '';
    let type = '';
    let currentValue = '';
    let isMod = -1;

    const props: Props = {};

    do {
      attr = attrReg.exec(tagString);

      if (attr) {
        const [name, value] = attr[0].trim().split('=');
        currentValue = value ? value.substring(1, value.length - 1) : '';
        isMod = name.indexOf(':');

        if (isMod !== -1) {
          type = name.substring(0, isMod + 1);
          cleanName = name.substring(isMod + 1);
        }

        if (!type) {
          props[name] = currentValue;
        } else if (type === PREFIXES.BIND) {
          const [store, path] = slicePropStorage(currentValue);
          bindProps(props, cleanName, data[store], path);
        } else if (type === PREFIXES.EVENT) {
        } else {
        }
      }
    } while (attr);

    return { props, tagName: this.getTagName(tagString) };
  }

  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["props", "attrs"] }] */
  setProps(name: string, currentValue: string, props: Props, attrs: Attributes, parentComponent?: VComponentNode) {
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

  handleEvent = (name: string, currentValue: string, propHandlers: Record<string, EventHadnlerConfig>) => {
    propHandlers[currentValue] = { event: name, name: currentValue };
  };

  conditionHandler = (name: string, currentValue: string, attrs: Attributes, parentComponent?: VComponentNode) => {
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

  getTagName = (tag: string) => tag.split(' ')[0].slice(1).trim().replace('>', '');
}
