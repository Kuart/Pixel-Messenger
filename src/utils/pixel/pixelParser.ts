class PixelParser {
  private template: string;

  constructor(template: string) {
    this.template = template;
    this.parseHTMLtoAST();
  }
}

export default PixelParser;
