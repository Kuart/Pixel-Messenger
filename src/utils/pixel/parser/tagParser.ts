import { LIST_TYPE, PREFIXES } from './const';
import { IData, IParsedTag } from './parser.type';
import { Props, EventHandler } from '../pixelDom';
import { slicePropStorage, bindProps, takePropInStore, parseObjectPathTag } from './utils';
import PixelParser from './parser';

export class TagParser {
  parserInstant: PixelParser;

  private attrRegExp: RegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  private replaceRegExp = /{{([^{}]*)}}/g;

  constructor(parser: PixelParser) {
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
    let isDisplay = true;
    let listProps = null;

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
        } else if (type === PREFIXES.CONDITION) {
          const [store, path] = slicePropStorage(currentValue);
          isDisplay = this.conditionHandler(cleanName, data[store], path);
        } else if (type === PREFIXES.LIST) {
          const [store, path] = slicePropStorage(currentValue);
          listProps = this.listHandler(cleanName, data[store], path);
        }
      }
    } while (attr);

    return { props, tagName: this.getTagName(tagString), events, isDisplay, listProps };
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

  conditionHandler = <T>(type: string, store: T, path: string) => {
    const value: any = parseObjectPathTag(store, path);
    let isTruthy = true;

    if (!value) {
      isTruthy = false;
    } else if (value && Array.isArray(value)) {
      if (!value.length) {
        isTruthy = false;
      }
    }

    if ((isTruthy && type === 'truthy') || (!isTruthy && type !== 'truthy')) {
      return true;
    }

    return false;
  };

  listHandler = <T>(name: string, store: T, valueString: string) => {
    if (name === LIST_TYPE.OBJECT_ARRAY) {
      return parseObjectPathTag(store, valueString) as Props;
    }
  };

  getTagName = (tag: string) => tag.split(' ')[0].slice(1).trim().replace('>', '');
}
