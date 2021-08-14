import Parser from './parser';
import { IData } from './parser.type';
import { pixelDOM, VTextNode } from '../pixelDom';
import { bindProps, slicePropStorage } from './utils';

export class TextParser {
  private replaceRegExp = new RegExp(/{{([^{}]*)}}/g);

  private parserInstant: Parser;

  constructor(parserInstant: Parser) {
    this.parserInstant = parserInstant;
  }

  parse(text: string, data: IData): VTextNode | null {
    if (text.length) {
      const reg = new RegExp(this.replaceRegExp);
      const temp = reg.exec(text);

      /* check for template replacement */
      if (temp && temp[0]) {
        const [store, path] = slicePropStorage(temp[1]);
        const props = {};

        bindProps(props, path, data[store], path);
        return pixelDOM.nodeFabric.create({ props, text }) as VTextNode;
      }

      return pixelDOM.nodeFabric.create({ text }) as VTextNode;
    }

    return null;
  }
}
