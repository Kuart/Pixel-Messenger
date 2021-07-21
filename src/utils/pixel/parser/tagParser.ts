import { Parser } from '.';
import { PREFIXES } from './const';
import { IData, IParsedTag } from './parser.type';
import { VComponentNode, EventHadnlerConfig, Props, EventHandler } from '../pixelDom';
import { slicePropStorage, bindProps, takePropInStore } from './utils';

export class TagParser {
  parserInstant: Parser;

  private attrRegExp: RegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  private replaceRegExp = /{{([^{}]*)}}/g;

  constructor(parser: Parser) {
    this.parserInstant = parser;
  }

  parse(tagString: string, data: IData): IParsedTag {
    const attrReg = new RegExp(this.attrRegExp);
    let attr: RegExpExecArray | null = null;
    let cleanName = '';

    let currentValue = '';
    let isMod = -1;

    const props: Props = {};
    const events: EventHandler = new Map();

    do {
      attr = attrReg.exec(tagString);

      if (attr) {
        let type = '';
        const [name, value] = attr[0].trim().split('=');
        currentValue = value ? value.substring(1, value.length - 1) : '';
        isMod = name.indexOf(':');

        if (isMod !== -1) {
          type = name.substring(0, isMod + 1);
          cleanName = name.substring(isMod + 1);
        }

        if (!type) {
          props[name] = currentValue;
        } else if (type === PREFIXES.PROPS) {
          this.setProps(props, cleanName, data, currentValue);
        } else if (type === PREFIXES.BIND) {
          const [store, path] = slicePropStorage(currentValue);
          bindProps(props, cleanName, data[store], path);
        } else if (type === PREFIXES.EVENT) {
          const event = takePropInStore(currentValue, data);
          events.set(cleanName, event as Function);
        }
      }
    } while (attr);

    return { props, tagName: this.getTagName(tagString), events };
  }

  setProps(props: Props, name: string, store: IData, valueString: string) {
    const reg = new RegExp(this.replaceRegExp);
    const temp = reg.exec(valueString);

    const isReplaceValue = temp !== null && temp[0];
    let value = '';
    if (isReplaceValue) {
      const replaceValue = takePropInStore(temp[1], store);
      value = valueString.replace(temp[0], replaceValue as string);
    } else {
      value = takePropInStore(valueString, store, store.props) as string;
    }

    props[name] = value;
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
