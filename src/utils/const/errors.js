const componentParseError = (componentName) =>
  `Компонент ${componentName} не зарегистрирован или неверный синтаксис объявления компонента`;

const nodeSearchError = (className) =>
  `Не удалось найти элемент ${className}. В context не передано свойство class либо оно не является селектором класса`;

export { componentParseError, nodeSearchError };
