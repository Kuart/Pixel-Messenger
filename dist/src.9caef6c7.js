// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/images/Icon/maskGroup.svg":[function(require,module,exports) {
module.exports = "/maskGroup.16e5bf07.svg";
},{}],"../src/modules/Messanger/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SETTING_OPTIONS = exports.MESSANGER_ERRORS = exports.MESSANGER_SERVICE = void 0;
var CHAT_LIST;

(function (CHAT_LIST) {
  CHAT_LIST["signup"] = "signup";
  CHAT_LIST["signin"] = "signin";
  CHAT_LIST["user"] = "user";
  CHAT_LIST["logout"] = "logout";
})(CHAT_LIST || (CHAT_LIST = {}));

var CHAT;

(function (CHAT) {
  CHAT["signup"] = "signup";
  CHAT["signin"] = "signin";
  CHAT["user"] = "user";
  CHAT["logout"] = "logout";
})(CHAT || (CHAT = {}));

var MESSANGER_ERRORS;

(function (MESSANGER_ERRORS) {
  MESSANGER_ERRORS["RFNV"] = "Registration form is not valid";
  MESSANGER_ERRORS["LFNV"] = "Login form is not valid";
})(MESSANGER_ERRORS || (MESSANGER_ERRORS = {}));

exports.MESSANGER_ERRORS = MESSANGER_ERRORS;
var SETTING_OPTIONS;

(function (SETTING_OPTIONS) {
  SETTING_OPTIONS["PROFILE"] = "PROFILE";
  SETTING_OPTIONS["CREATE_CHAT"] = "CREATE_CHAT";
  SETTING_OPTIONS["LOGOUT"] = "LOGOUT";
})(SETTING_OPTIONS || (SETTING_OPTIONS = {}));

exports.SETTING_OPTIONS = SETTING_OPTIONS;
var MESSANGER_SERVICE = {
  CHAT: CHAT,
  CHAT_LIST: CHAT_LIST
};
exports.MESSANGER_SERVICE = MESSANGER_SERVICE;
},{}],"../src/modules/Messanger/Header/Menu/Menu.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

var const_1 = require("../../const");

function Menu() {
  return {
    template: "\n    <div class=\"header__settings\" >\n      <div class=\"settings__option\" data-name=\"" + const_1.SETTING_OPTIONS.PROFILE + "\" e:click=\"props.optionClick\">\u041F\u0440\u043E\u0444\u0438\u043B\u044C</div>\n      \n      <div class=\"settings__option\" \n          data-name=\"" + const_1.SETTING_OPTIONS.CREATE_CHAT + "\" \n          e:click=\"props.optionClick\">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0447\u0430\u0442</div>\n\n      <div class=\"settings__option\" data-name=\"" + const_1.SETTING_OPTIONS.LOGOUT + "\" e:click=\"props.optionClick\">\u0412\u044B\u0439\u0442\u0438</div>\n    </div>\n    "
  };
}

exports.Menu = Menu;
},{"../../const":"../src/modules/Messanger/const.ts"}],"assets/images/Icon/close.svg":[function(require,module,exports) {
module.exports = "/close.7037c6b9.svg";
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/components/Modal/Modal.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/Modal/Modal.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var close_svg_1 = __importDefault(require("../../../static/assets/images/Icon/close.svg"));

require("./Modal.css");

function Modal(children, icons, headerData, buttons) {
  if (icons === void 0) {
    icons = '';
  }

  if (headerData === void 0) {
    headerData = '';
  }

  if (buttons === void 0) {
    buttons = '';
  }

  return {
    template: "\n    <div class=\"modal-window__container\">\n      <section class=\"modal-window__main\">\n        <header class=\"modal-window__header\">\n          <div class=\"modal-window__title\">\n            " + icons + "\n            <h3>{{props.headerText}}</h3>\n            " + headerData + "\n          </div>\n\n          <div class=\"modal-window__actions\">\n            " + buttons + "\n            <img class=\"modal-window__close\" src=\"" + close_svg_1.default + "\" e:click=\"props.modalClose\"/>\n          </div>\n        </header>\n        <div class=\"modal-window__body\">" + children + "</div>              \n      </section>\n    </div>\n    "
  };
}

exports.default = Modal;
},{"../../../static/assets/images/Icon/close.svg":"assets/images/Icon/close.svg","./Modal.css":"../src/components/Modal/Modal.css"}],"../src/components/Modal/ShortModal.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/Modal/ShortModal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortModal = void 0;

require("./ShortModal.css");

function ShortModal(children) {
  return {
    template: "\n    <div class=\"short-modal__container\">\n      " + children + "\n    </div>\n    "
  };
}

exports.ShortModal = ShortModal;
},{"./ShortModal.css":"../src/components/Modal/ShortModal.css"}],"../src/components/Modal/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortModal = void 0;

var Modal_1 = __importDefault(require("./Modal"));

var ShortModal_1 = require("./ShortModal");

Object.defineProperty(exports, "ShortModal", {
  enumerable: true,
  get: function get() {
    return ShortModal_1.ShortModal;
  }
});
exports.default = Modal_1.default;
},{"./Modal":"../src/components/Modal/Modal.ts","./ShortModal":"../src/components/Modal/ShortModal.ts"}],"../src/components/Button/Button.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/Button/Button.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

require("./Button.css");

function Button() {
  return {
    template: "\n      <button\n        p:type=\"type\"\n        p:class=\"button {{props.class}}\"\n        e:submit=\"props.onClick\"\n        e:click=\"props.onClick\">{{props.text}}</button>\n    "
  };
}

exports.Button = Button;
},{"./Button.css":"../src/components/Button/Button.css"}],"../src/components/Button/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var Button_1 = require("./Button");

Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return Button_1.Button;
  }
});
},{"./Button":"../src/components/Button/Button.ts"}],"../src/components/PagesContainer/PagesContainer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesContainer = void 0;

function PagesContainer() {
  return {
    template: "\n    <div>\n      {{children}}\n    </div>\n    "
  };
}

exports.PagesContainer = PagesContainer;
},{}],"../src/components/PagesContainer/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesContainer = void 0;

var PagesContainer_1 = require("./PagesContainer");

Object.defineProperty(exports, "PagesContainer", {
  enumerable: true,
  get: function get() {
    return PagesContainer_1.PagesContainer;
  }
});
},{"./PagesContainer":"../src/components/PagesContainer/PagesContainer.ts"}],"assets/images/Icon/no_img.png":[function(require,module,exports) {
module.exports = "/no_img.e0229a61.png";
},{}],"../src/components/UserPhoto/UserPhoto.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/UserPhoto/UserPhoto.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserPhoto = void 0;

var no_img_png_1 = __importDefault(require("../../../static/assets/images/Icon/no_img.png"));

require("./UserPhoto.css");

function UserPhoto() {
  return {
    template: "\n    <div p:class=\"user-avatar__container {{props.containerClass}}\">\n      <img if:truthy=\"props.photo\" \n        p:src=\"https://ya-praktikum.tech/api/v2/resources/{{props.photo}}\" \n        p:class=\"user-avatar__img {{props.imgClass}}\" />\n      <img if:falsy=\"props.photo\" src=\"" + no_img_png_1.default + "\" p:class=\"user-avatar__img {{props.imgClass}}\" />\n\n      <label if:truthy=\"props.inputId\" p:for=\"inputId\" class=\"user-avatar__overlay\"></label>\n      <input if:truthy=\"props.inputId\" \n        type=\"file\" \n        name=\"avatar\" \n        accept=\"image/*\"\n        e:change=\"props.onChange\"\n        class=\"user-avatar__input\" \n        p:id=\"inputId\"\n      />\n    </div>\n    "
  };
}

exports.UserPhoto = UserPhoto;
},{"../../../static/assets/images/Icon/no_img.png":"assets/images/Icon/no_img.png","./UserPhoto.css":"../src/components/UserPhoto/UserPhoto.css"}],"../src/components/UserPhoto/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserPhoto = void 0;

var UserPhoto_1 = require("./UserPhoto");

Object.defineProperty(exports, "UserPhoto", {
  enumerable: true,
  get: function get() {
    return UserPhoto_1.UserPhoto;
  }
});
},{"./UserPhoto":"../src/components/UserPhoto/UserPhoto.ts"}],"../src/components/Form/Input.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/Form/Input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

require("./Input.css");

function Input() {
  return {
    template: "\n    <div class=\"input\">\n      <label p:class=\"input__label {{props.loginClass || ''}}\" p:for=\"id\">{{props.label}}</label>\n      <div class=\"input__control-wrapper\">\n        <input \n          class=\"input__control\" \n          p:name=\"name\" \n          p:type=\"type\" \n          p:placeholder=\"{{props.placeholder || ''}}\" \n          p:id=\"id\" \n          p:value=\"value\"\n          e:input=\"props.onChange\"\n        />\n        <span class=\"input__underline\"></span>\n      </div>\n      <div class=\"input__error\">{{props.error}}</div>\n    </div>"
  };
}

exports.Input = Input;
},{"./Input.css":"../src/components/Form/Input.css"}],"../src/components/Form/EditInput/EditInput.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/Form/EditInput/EditInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditInput = void 0;

var Input_1 = require("../Input");

var Button_1 = require("../../Button");

require("./EditInput.css");

function EditInput() {
  return {
    components: {
      Input: Input_1.Input,
      Button: Button_1.Button
    },
    template: "\n    <div class=\"edit-input__container\">\n      <Input \n        b:label=\"props.label\" \n        b:name=\"props.name\" \n        type=\"text\" \n        b:id=\"props.id\" \n        b:value=\"props.value\"\n        b:loginClass=\"props.loginClass\"\n        b:error=\"props.error\"\n        b:onChange=\"props.onChange\"\n      />\n\n      <Button \n        b:disabled=\"props.isDisabled\"\n        b:text=\"props.buttonText\" \n        class=\"button_transparent button_transparent_send\" \n        b:onClick=\"props.onClick\" />\n    </div>"
  };
}

exports.EditInput = EditInput;
},{"../Input":"../src/components/Form/Input.ts","../../Button":"../src/components/Button/index.ts","./EditInput.css":"../src/components/Form/EditInput/EditInput.css"}],"../src/components/Form/EditInput/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditInput = void 0;

var EditInput_1 = require("./EditInput");

Object.defineProperty(exports, "EditInput", {
  enumerable: true,
  get: function get() {
    return EditInput_1.EditInput;
  }
});
},{"./EditInput":"../src/components/Form/EditInput/EditInput.ts"}],"../src/components/Form/SearchInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchInput = void 0;

require("./Input.css");

function SearchInput() {
  return {
    template: "\n    <div class=\"input\">\n      <input \n        type=\"search\" \n        p:class=\"class\" \n        p:name=\"name\" \n        p:placeholder=\"placeholder\" \n        p:value=\"value\"\n        e:input=\"props.onChange\"\n        />\n    </div>"
  };
}

exports.SearchInput = SearchInput;
},{"./Input.css":"../src/components/Form/Input.css"}],"../src/components/Form/Textarea.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;

require("./Input.css");

function Textarea() {
  return {
    state: {
      error: ''
    },
    methods: {
      keyHandler: function keyHandler(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          this.componentProps.onKeyDown();
        }
      }
    },
    template: "\n    <div class=\"input\">\n      <div class=\"input__control-wrapper\">\n        <textarea \n          class=\"input__control message-form__textarea \" \n          p:name=\"name\" \n          p:type=\"type\" \n          p:placeholder=\"placeholder\" \n          p:value=\"value\"\n          e:keydown=\"methods.keyHandler\"\n          e:input=\"props.onChange\"/>\n        <span class=\"input__underline\"></span>\n      </div>\n      <div class=\"input__error\">{{state.error}}</div>\n    </div>"
  };
}

exports.Textarea = Textarea;
},{"./Input.css":"../src/components/Form/Input.css"}],"../src/components/Form/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = exports.SearchInput = exports.EditInput = exports.Input = void 0;

var Input_1 = require("./Input");

Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return Input_1.Input;
  }
});

var EditInput_1 = require("./EditInput");

Object.defineProperty(exports, "EditInput", {
  enumerable: true,
  get: function get() {
    return EditInput_1.EditInput;
  }
});

var SearchInput_1 = require("./SearchInput");

Object.defineProperty(exports, "SearchInput", {
  enumerable: true,
  get: function get() {
    return SearchInput_1.SearchInput;
  }
});

var Textarea_1 = require("./Textarea");

Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function get() {
    return Textarea_1.Textarea;
  }
});
},{"./Input":"../src/components/Form/Input.ts","./EditInput":"../src/components/Form/EditInput/index.ts","./SearchInput":"../src/components/Form/SearchInput.ts","./Textarea":"../src/components/Form/Textarea.ts"}],"../src/components/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = exports.UserPhoto = exports.PagesContainer = exports.ShortModal = exports.Button = void 0;

var Modal_1 = __importDefault(require("./Modal"));

exports.Modal = Modal_1.default;

var Button_1 = require("./Button");

Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return Button_1.Button;
  }
});

var Modal_2 = require("./Modal");

Object.defineProperty(exports, "ShortModal", {
  enumerable: true,
  get: function get() {
    return Modal_2.ShortModal;
  }
});

var PagesContainer_1 = require("./PagesContainer");

Object.defineProperty(exports, "PagesContainer", {
  enumerable: true,
  get: function get() {
    return PagesContainer_1.PagesContainer;
  }
});

var UserPhoto_1 = require("./UserPhoto");

Object.defineProperty(exports, "UserPhoto", {
  enumerable: true,
  get: function get() {
    return UserPhoto_1.UserPhoto;
  }
});

__exportStar(require("./Form"), exports);
},{"./Modal":"../src/components/Modal/index.ts","./Button":"../src/components/Button/index.ts","./PagesContainer":"../src/components/PagesContainer/index.ts","./UserPhoto":"../src/components/UserPhoto/index.ts","./Form":"../src/components/Form/index.ts"}],"../src/api/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASE = void 0;
exports.BASE = 'https://ya-praktikum.tech/api/v2';
},{}],"../src/utils/helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUniqId = exports.uuid = void 0;

var generateUniqId = function generateUniqId() {
  return (Number(Date.now().toString().substring(10, 13)) * (Math.random() * (200 - 1) + 1)).toFixed(0);
};

exports.generateUniqId = generateUniqId;

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

exports.uuid = uuid;
},{}],"../src/utils/pixel/pixelDom/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PATCH_TYPE = exports.NODE_TYPE = void 0;
var NODE_TYPE;

(function (NODE_TYPE) {
  NODE_TYPE["TEXT_NODE"] = "TEXT_NODE";
  NODE_TYPE["COMMON_NODE"] = "COMMON_NODE";
  NODE_TYPE["COMPONENT_NODE"] = "COMPONENT_NODE";
})(NODE_TYPE || (NODE_TYPE = {}));

exports.NODE_TYPE = NODE_TYPE;
var PATCH_TYPE;

(function (PATCH_TYPE) {
  PATCH_TYPE["ADD"] = "ADD";
  PATCH_TYPE["TEXT"] = "TEXT";
  PATCH_TYPE["PROPS"] = "PROPS";
  PATCH_TYPE["REPLACE"] = "REPLACE";
  PATCH_TYPE["UPDATE"] = "UPDATE";
  PATCH_TYPE["DELETE"] = "DELETE";
})(PATCH_TYPE || (PATCH_TYPE = {}));

exports.PATCH_TYPE = PATCH_TYPE;
},{}],"../src/utils/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = void 0;
var EVENTS;

(function (EVENTS) {
  EVENTS["NDM"] = "node-did-mount";
  EVENTS["NU"] = "node-unmount";
  EVENTS["PSU"] = "pixel-store-update";
})(EVENTS = exports.EVENTS || (exports.EVENTS = {}));
},{}],"../src/utils/pixel/utils/EventBus.ts":[function(require,module,exports) {
"use strict";

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventBus = function () {
  function EventBus() {
    var _this = this;

    this.on = function (event, callback) {
      if (!_this.listeners[event]) {
        _this.listeners[event] = [];
      }

      _this.listeners[event].push(callback);
    };

    this.off = function (event, callback) {
      if (!_this.listeners[event]) {
        throw new Error("Event " + event + " is undefined ");
      }

      _this.listeners[event] = _this.listeners[event].filter(function (listener) {
        return listener !== callback;
      });
    };

    this.emit = function (event) {
      var args = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }

      if (!_this.listeners[event]) {
        throw new Error("Event " + event + " is undefined ");
      }

      _this.listeners[event].forEach(function (listener) {
        listener.apply(void 0, __spreadArray([], __read(args)));
      });
    };

    this.listeners = {};
  }

  return EventBus;
}();

exports.default = EventBus;
},{}],"../src/utils/pixel/utils/structures/stack.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0;

var Stack = function () {
  function Stack() {
    this.stack = [];
  }

  Stack.prototype.push = function (value) {
    this.stack.push(value);
  };

  Stack.prototype.pop = function () {
    if (this.isEmpty()) {
      throw Error(Stack.ERRORS.EMPTY_POP);
    }

    return this.stack.pop();
  };

  Stack.prototype.peek = function () {
    return this.stack[this.stack.length - 1];
  };

  Stack.prototype.isEmpty = function () {
    return this.stack.length === 0;
  };

  Stack.ERRORS = {
    EMPTY_POP: "Can't pop, stack is empty"
  };
  return Stack;
}();

exports.Stack = Stack;
},{}],"../src/utils/pixel/utils/structures/queue.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = void 0;

var Queue = function () {
  function Queue() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  Queue.prototype.enqueue = function (value) {
    var node = {
      value: value,
      next: null,
      prev: null
    };
    node.prev = this.tail;

    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.size += 1;
  };

  Queue.prototype.dequeue = function () {
    if (this.isEmpty()) {
      throw new Error(Queue.ERRORS.EMPTY_DEQUEUE);
    }

    var node = this.head;
    var nextNode = node.next;

    if (nextNode) {
      node.next = null;
      nextNode.prev = null;
    }

    this.head = nextNode;

    if (this.tail === node) {
      this.tail = nextNode;
    }

    this.size -= 1;
    return node.value;
  };

  Queue.prototype.peek = function () {
    return this.head;
  };

  Queue.prototype.isEmpty = function () {
    return this.head === null;
  };

  Queue.ERRORS = {
    EMPTY_DEQUEUE: "Can't dequeue, queue is empty"
  };
  return Queue;
}();

exports.Queue = Queue;
},{}],"../src/utils/pixel/utils/structures/structures.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils/pixel/utils/structures/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IStackNode = exports.IQueueNode = exports.Queue = exports.Stack = void 0;

var stack_1 = require("./stack");

Object.defineProperty(exports, "Stack", {
  enumerable: true,
  get: function get() {
    return stack_1.Stack;
  }
});

var queue_1 = require("./queue");

Object.defineProperty(exports, "Queue", {
  enumerable: true,
  get: function get() {
    return queue_1.Queue;
  }
});

var structures_type_1 = require("./structures.type");

Object.defineProperty(exports, "IQueueNode", {
  enumerable: true,
  get: function get() {
    return structures_type_1.IQueueNode;
  }
});
Object.defineProperty(exports, "IStackNode", {
  enumerable: true,
  get: function get() {
    return structures_type_1.IStackNode;
  }
});
},{"./stack":"../src/utils/pixel/utils/structures/stack.ts","./queue":"../src/utils/pixel/utils/structures/queue.ts","./structures.type":"../src/utils/pixel/utils/structures/structures.type.ts"}],"../src/utils/pixel/utils/bfs.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bfsFirstParents = exports.BFS = void 0;

var pixelDom_1 = require("../pixelDom");

var structures_1 = require("./structures");

function BFS(root, callback, args) {
  var queue = new structures_1.Queue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    var node = queue.dequeue();
    callback(node, args);

    if (!(node instanceof pixelDom_1.VTextNode)) {
      for (var i = 0; i < node.children.length; i += 1) {
        queue.enqueue(node.children[i]);
      }
    }
  }
}

exports.BFS = BFS;

function bfsFirstParents(root, target) {
  var queue = new structures_1.Queue();
  var found = [];
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    var node = queue.dequeue();
  }

  return found;
}

exports.bfsFirstParents = bfsFirstParents;
},{"../pixelDom":"../src/utils/pixel/pixelDom/index.ts","./structures":"../src/utils/pixel/utils/structures/index.ts"}],"../src/utils/pixel/utils/dfs.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DFS = void 0;

var pixelDom_1 = require("../pixelDom");

var structures_1 = require("./structures");

var DFS = function DFS(root, callback) {
  var stack = new structures_1.Stack();
  stack.push(root);

  while (!stack.isEmpty()) {
    var current = stack.pop();

    if (!(current instanceof pixelDom_1.VTextNode) && current.children.length) {
      callback(current, stack);
    }
  }
};

exports.DFS = DFS;
},{"../pixelDom":"../src/utils/pixel/pixelDom/index.ts","./structures":"../src/utils/pixel/utils/structures/index.ts"}],"../src/utils/pixel/utils/proxy.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProxyObject = void 0;

function createProxyObject(props, callback, name) {
  if (props === void 0) {
    props = {};
  }

  var validator = {
    get: function get(target, prop) {
      if (_typeof(target[prop]) === 'object' && target[prop] !== null) {
        return createProxyObject(target[prop], callback, name ? name + "." + prop : prop);
      }

      return target[prop];
    },
    set: function set(target, prop, value) {
      var _a, _b;

      target[prop] = value;
      callback([(_a = {}, _a[prop] = target[prop], _a), (_b = {}, _b[prop] = value, _b), name ? name + "." + prop : name]);
      return true;
    },
    deleteProperty: function deleteProperty() {
      return false;
    }
  };
  return new Proxy(props, validator);
}

exports.createProxyObject = createProxyObject;
},{}],"../src/utils/pixel/utils/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProxyObject = exports.DFS = exports.bfsFirstParents = exports.BFS = exports.IQueueNode = exports.Queue = exports.Stack = exports.IStackNode = exports.EventBus = void 0;

var EventBus_1 = __importDefault(require("./EventBus"));

exports.EventBus = EventBus_1.default;

var structures_1 = require("./structures");

Object.defineProperty(exports, "IStackNode", {
  enumerable: true,
  get: function get() {
    return structures_1.IStackNode;
  }
});
Object.defineProperty(exports, "Stack", {
  enumerable: true,
  get: function get() {
    return structures_1.Stack;
  }
});
Object.defineProperty(exports, "Queue", {
  enumerable: true,
  get: function get() {
    return structures_1.Queue;
  }
});
Object.defineProperty(exports, "IQueueNode", {
  enumerable: true,
  get: function get() {
    return structures_1.IQueueNode;
  }
});

var bfs_1 = require("./bfs");

Object.defineProperty(exports, "BFS", {
  enumerable: true,
  get: function get() {
    return bfs_1.BFS;
  }
});
Object.defineProperty(exports, "bfsFirstParents", {
  enumerable: true,
  get: function get() {
    return bfs_1.bfsFirstParents;
  }
});

var dfs_1 = require("./dfs");

Object.defineProperty(exports, "DFS", {
  enumerable: true,
  get: function get() {
    return dfs_1.DFS;
  }
});

var proxy_1 = require("./proxy");

Object.defineProperty(exports, "createProxyObject", {
  enumerable: true,
  get: function get() {
    return proxy_1.createProxyObject;
  }
});
},{"./EventBus":"../src/utils/pixel/utils/EventBus.ts","./structures":"../src/utils/pixel/utils/structures/index.ts","./bfs":"../src/utils/pixel/utils/bfs.ts","./dfs":"../src/utils/pixel/utils/dfs.ts","./proxy":"../src/utils/pixel/utils/proxy.ts"}],"../src/utils/pixel/pixelDom/Nodes/abstract/VNode.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var helpers_1 = require("../../../../helpers");

var VNode = function () {
  function VNode() {
    this.key = helpers_1.uuid();
  }

  return VNode;
}();

exports.default = VNode;
},{"../../../../helpers":"../src/utils/helpers.ts"}],"../src/utils/pixel/pixelDom/Nodes/abstract/VParentNode.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var helpers_1 = require("../../../../helpers");

var utils_1 = require("../../../utils");

var VParentNode = function () {
  function VParentNode() {
    this.eventBus = new utils_1.EventBus();
    this.children = [];
    this.key = helpers_1.uuid();
  }

  VParentNode.prototype.nodeDidMount = function (callback) {
    var _this = this;

    if (this.eventHandlers.size) {
      this.eventHandlers.forEach(function (value, key) {
        _this.domEl.addEventListener(key, value, true);
      });
    }

    if (callback) {
      callback();
    }
  };

  VParentNode.prototype.nodeUnmount = function (callback) {
    var _this = this;

    if (this.eventHandlers.size) {
      this.eventHandlers.forEach(function (value, key) {
        _this.domEl.removeEventListener(key, value, true);
      });
    }

    if (callback) {
      callback();
    }
  };

  return VParentNode;
}();

exports.default = VParentNode;
},{"../../../../helpers":"../src/utils/helpers.ts","../../../utils":"../src/utils/pixel/utils/index.ts"}],"../src/utils/pixel/pixelDom/Nodes/abstract/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VParentNode = exports.VNode = void 0;

var VNode_1 = __importDefault(require("./VNode"));

exports.VNode = VNode_1.default;

var VParentNode_1 = __importDefault(require("./VParentNode"));

exports.VParentNode = VParentNode_1.default;
},{"./VNode":"../src/utils/pixel/pixelDom/Nodes/abstract/VNode.ts","./VParentNode":"../src/utils/pixel/pixelDom/Nodes/abstract/VParentNode.ts"}],"../src/utils/pixel/router/router.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Router = function () {
  function Router(pixelInstantce) {
    var _this = this;

    this.withAuth = true;
    this.isAuth = false;

    this.start = function () {
      window.onpopstate = function (event) {
        var target = event.currentTarget;

        _this.checkRoute(target);
      };

      _this.checkRoute(window);
    };

    this.checkRoute = function (target, authChange) {
      if (target === void 0) {
        target = window;
      }

      var currentRoute = target.location.pathname.slice(1);

      if (!currentRoute) {
        currentRoute = _this.defaultRoute.path;
      } else if (!_this.routes[currentRoute]) {
        currentRoute = 'wrong';
      }

      if (_this.currentPlace !== currentRoute || authChange) {
        if (_this.withAuth) {
          _this.replaceWithAuth(currentRoute);
        } else {
          _this.changeLayout(_this.routes[currentRoute].component, currentRoute);
        }
      }
    };

    this.changeLayout = function (componentName, currentRoute) {
      _this.currentPlace = currentRoute;

      _this.pixelInstantce.render("<" + componentName + "  />");
    };

    if (Router.instantce) {
      return Router.instantce;
    }

    this.setPixelInstantce(pixelInstantce);
    this.history = window.history;
    Router.instantce = this;
  }

  Router.prototype.setPixelInstantce = function (pixelInstantce) {
    if (pixelInstantce) {
      this.pixelInstantce = pixelInstantce;
    }
  };

  Router.prototype.handleAuthChange = function (isAuth) {
    if (!isAuth) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }

    this.checkRoute(window, true);
  };

  Router.prototype.setRoutes = function (routesConfig) {
    return __awaiter(this, void 0, void 0, function () {
      var routes, defaultRoute, auth, redirect, check, permittedRoutes, authRedirect, error_1;

      var _a;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            routes = routesConfig.routes, defaultRoute = routesConfig.defaultRoute, auth = routesConfig.auth;
            _b.label = 1;

          case 1:
            _b.trys.push([1, 5,, 6]);

            if (!defaultRoute) {
              throw Error(Router.ERRORS.NO_DEF_CONF);
            }

            if (!defaultRoute.path) {
              throw Error(Router.ERRORS.NO_DEF_ROUTES);
            }

            if (!this.pixelInstantce.components[defaultRoute.component]) {
              throw Error(Router.ERRORS.WRONG_DEF_COMP);
            }

            if (!routes) {
              throw Error(Router.ERRORS.NO_ROUTES);
            }

            Object.keys(routes).forEach(function (key) {
              if (!routes[key] || !_this.pixelInstantce.components[routes[key].component]) {
                throw Error(Router.ERRORS.WRONG_COMP);
              }
            });
            this.defaultRoute = defaultRoute;
            this.routes = __assign(__assign({}, routes), (_a = {}, _a[defaultRoute.path] = defaultRoute, _a));
            if (!auth) return [3, 3];
            redirect = auth.redirect, check = auth.check, permittedRoutes = auth.permittedRoutes, authRedirect = auth.authRedirect;
            this.redirect = redirect;
            this.authRedirect = authRedirect;
            this.permittedRoutes = permittedRoutes;
            return [4, check()];

          case 2:
            _b.sent();

            return [3, 4];

          case 3:
            this.withAuth = false;
            _b.label = 4;

          case 4:
            this.start();
            return [3, 6];

          case 5:
            error_1 = _b.sent();
            console.error(error_1);
            return [3, 6];

          case 6:
            return [2];
        }
      });
    });
  };

  Router.prototype.go = function (pathname) {
    this.history.pushState({
      page: pathname
    }, '', pathname);
    this.checkRoute(window);
  };

  Router.prototype.replaceWithAuth = function (currentRoute) {
    var isFromBasePermitted = this.permittedRoutes.some(function (route) {
      return route === currentRoute;
    });

    if (!this.isAuth && !isFromBasePermitted) {
      this.go(this.redirect);
    } else if (this.isAuth && isFromBasePermitted) {
      this.go(this.authRedirect);
    } else {
      this.changeLayout(this.routes[currentRoute].component, currentRoute);
    }
  };

  Router.ERRORS = {
    NO_DEF_CONF: 'Router default config not found',
    NO_DEF_ROUTES: 'Router default path not found',
    WRONG_DEF_COMP: 'Router default component has not found',
    NO_ROUTES: 'Path has not been added to the router',
    WRONG_COMP: 'Router has not found required component'
  };
  Router.EVENTS = {
    INIT: 'init',
    UPDATE: 'update'
  };
  return Router;
}();

exports.default = Router;
},{}],"../src/utils/pixel/router/router.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils/pixel/router/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDefaultRoute = exports.IRouterState = exports.IRoutesConfig = exports.Router = void 0;

var router_1 = __importDefault(require("./router"));

exports.Router = router_1.default;

var router_type_1 = require("./router.type");

Object.defineProperty(exports, "IRoutesConfig", {
  enumerable: true,
  get: function get() {
    return router_type_1.IRoutesConfig;
  }
});
Object.defineProperty(exports, "IRouterState", {
  enumerable: true,
  get: function get() {
    return router_type_1.IRouterState;
  }
});
Object.defineProperty(exports, "IDefaultRoute", {
  enumerable: true,
  get: function get() {
    return router_type_1.IDefaultRoute;
  }
});
},{"./router":"../src/utils/pixel/router/router.ts","./router.type":"../src/utils/pixel/router/router.type.ts"}],"../src/utils/pixel/store/store.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;

var const_1 = require("../../const");

var Store = function () {
  function Store(pixelInstance) {
    var _this = this;

    this.authListenters = [];
    this.listeners = {};

    this.unsubscribe = function (event, listener) {
      if (!_this.listeners[event]) {
        throw new Error("Event " + event + " is undefined ");
      }

      _this.listeners[event] = _this.listeners[event].filter(function (item) {
        return item !== listener;
      });
    };

    this.forceUpdate = function (field, component) {
      if (_this.store[field]) {
        component.eventBus.emit(const_1.EVENTS.PSU, [field, _this.store[field]]);
      }
    };

    this.emit = function (field) {
      if (_this.listeners[field]) {
        _this.listeners[field].forEach(function (listener) {
          listener.eventBus.emit(const_1.EVENTS.PSU, [field, _this.store[field]]);
        });
      }
    };

    this.emitAuthListenters = function (isAuth) {
      _this.authListenters.forEach(function (listener) {
        if (listener && listener.handleAuthChange) {
          listener.handleAuthChange(isAuth);
        }
      });
    };

    this.pixelInstance = pixelInstance;
    this.authListenters.push(this.pixelInstance.router);
    this.currentUser = this.createUserStore();
  }

  Store.prototype.init = function (baseStore) {
    if (baseStore === void 0) {
      baseStore = {};
    }

    this.store = this.createStore(__assign(__assign({}, baseStore), {
      currentUser: this.currentUser
    }));
  };

  Store.prototype.createStore = function (baseStore) {
    var self = this;
    var validator = {
      get: function get(target, key) {
        return target[key];
      },
      set: function set(target, prop, value) {
        if (prop in target) {
          target[prop] = value;
          self.emit(prop);
          return true;
        }

        console.error(Store.ERRORS.missStoreField(prop));
        return false;
      },
      deleteProperty: function deleteProperty() {
        return false;
      }
    };
    return new Proxy(baseStore, validator);
  };

  Store.prototype.createUserStore = function () {
    var self = this;
    var validator = {
      get: function get(target, key) {
        return target[key];
      },
      set: function set(target, prop, value) {
        target[prop] = value;

        if (prop === 'isAuth') {
          self.emitAuthListenters(value);
        }

        return true;
      },
      deleteProperty: function deleteProperty() {
        return false;
      }
    };
    return new Proxy({
      isAuth: false
    }, validator);
  };

  Store.prototype.subscribe = function (field, listener) {
    if (!this.listeners[field]) {
      this.listeners[field] = [];
      this.store[field] = null;
    }

    this.listeners[field].push(listener);
  };

  Store.prototype.dispatch = function (field, value) {
    this.store[field] = value;
  };

  Store.prototype.setUserData = function (data) {
    var _this = this;

    Object.keys(data).forEach(function (key) {
      _this.currentUser[key] = data[key];
    });
  };

  Store.ERRORS = {
    missStoreField: function missStoreField(field) {
      return "Store does't have field - " + field;
    }
  };
  return Store;
}();

exports.Store = Store;
},{"../../const":"../src/utils/const.ts"}],"../src/utils/pixel/store/store.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils/pixel/store/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IPixelStoreUpdateProp = exports.Store = void 0;

var store_1 = require("./store");

Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return store_1.Store;
  }
});

var store_type_1 = require("./store.type");

Object.defineProperty(exports, "IPixelStoreUpdateProp", {
  enumerable: true,
  get: function get() {
    return store_type_1.IPixelStoreUpdateProp;
  }
});
},{"./store":"../src/utils/pixel/store/store.ts","./store.type":"../src/utils/pixel/store/store.type.ts"}],"../src/utils/pixel/root/pixel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PixelStore = exports.PixelRouter = exports.Pixel = void 0;

var parser_1 = require("../parser");

var pixelDom_1 = require("../pixelDom");

var router_1 = require("../router");

var const_1 = require("../../const");

var store_1 = require("../store");

var Pixel = function () {
  function Pixel() {
    var _this = this;

    this.components = {};
    this.isInitiated = false;
    this.initiatedComponents = {};

    this.setRootEl = function (selector) {
      try {
        var root = document.querySelector(selector);

        if (!root) {
          throw new Error(Pixel.ERROR.ROOT_NF(selector));
        } else {
          _this.root = root;
        }
      } catch (err) {
        console.error(err);
      }
    };

    this.init = function (routerConfig, template) {
      if (routerConfig === void 0) {
        routerConfig = null;
      }

      if (template === void 0) {
        template = null;
      }

      if (routerConfig) {
        _this.router.setRoutes(routerConfig);
      } else if (template) {
        _this.render(template);
      }
    };

    this.render = function (template) {
      try {
        if (_this.VDOM) {
          pixelDom_1.pixelDOM.unmount(_this.VDOM);
        }

        _this.VDOM = parser_1.Parser.parseHTML(template);

        if (!_this.VDOM) {
          throw Error(Pixel.ERROR.VDOM_NF);
        }

        _this.mount(_this.VDOM);
      } catch (error) {
        console.error(error);
      }
    };

    this.mount = function (VDOM) {
      try {
        pixelDom_1.pixelDOM.render(VDOM);

        if (!VDOM.domEl) {
          throw Error(Pixel.ERROR.ROOT_DOM_NF(VDOM.tagName));
        }

        if (_this.root.childNodes.length) {
          _this.root.replaceChild(VDOM.domEl, _this.root.childNodes[0]);
        } else {
          _this.root.appendChild(VDOM.domEl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    this.router = new router_1.Router(this);
    this.store = new store_1.Store(this);
  }

  Pixel.prototype.config = function (config) {
    if (this.isInitiated) {
      throw new Error(Pixel.ERROR.INITIATED);
    }

    this.setRootEl(config.el);
    this.store.init(config.store);
    this.registerComponents(config.components);
    this.init(config.routerConfig, config.template);
    this.isInitiated = true;
  };

  Pixel.prototype.registerComponents = function (components) {
    var _this = this;

    if (components) {
      Object.keys(components).forEach(function (componentName) {
        if (!_this.components[componentName]) {
          _this.components[componentName] = components[componentName];
        }
      });
    }
  };

  Pixel.prototype.callComponentModel = function (componentName) {
    if (this.components[componentName]) {
      var componentModel = this.components[componentName]();
      componentModel.name = componentName;
      return componentModel;
    }

    throw Error(Pixel.ERROR.FRONG_COMPONENT(componentName));
  };

  Pixel.ERROR = {
    ROOT_NF: function ROOT_NF(selector) {
      return "Root element " + selector + " is not found";
    },
    ROOT_DOM_NF: function ROOT_DOM_NF(tagName) {
      return "Root dom element " + tagName + " has not created valid dom node";
    },
    VDOM_NF: 'Failed to build VDOM',
    PIXEL_ISALRE: 'Failed to build VDOM',
    INITIATED: 'Pixel already in use',
    FRONG_COMPONENT: function FRONG_COMPONENT(name) {
      return "Component \"" + name + "\" is not registered";
    }
  };
  Pixel.CONST = {
    CDM: const_1.EVENTS.NDM
  };
  return Pixel;
}();

exports.Pixel = Pixel;
var PixelRoot = new Pixel();
exports.default = PixelRoot;
exports.PixelRouter = PixelRoot.router;
exports.PixelStore = PixelRoot.store;
},{"../parser":"../src/utils/pixel/parser/index.ts","../pixelDom":"../src/utils/pixel/pixelDom/index.ts","../router":"../src/utils/pixel/router/index.ts","../../const":"../src/utils/const.ts","../store":"../src/utils/pixel/store/index.ts"}],"../src/utils/pixel/root/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pixel = exports.PixelStore = exports.PixelRouter = void 0;

var pixel_1 = __importDefault(require("./pixel"));

exports.Pixel = pixel_1.default;

var pixel_2 = require("./pixel");

Object.defineProperty(exports, "PixelRouter", {
  enumerable: true,
  get: function get() {
    return pixel_2.PixelRouter;
  }
});
Object.defineProperty(exports, "PixelStore", {
  enumerable: true,
  get: function get() {
    return pixel_2.PixelStore;
  }
});
},{"./pixel":"../src/utils/pixel/root/pixel.ts"}],"../src/utils/pixel/pixelDom/Nodes/VComponentNode.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VComponentNode = void 0;

var const_1 = require("../../../const");

var pixelDom_1 = require("../pixelDom");

var utils_1 = require("../../utils");

var abstract_1 = require("./abstract");

var parser_1 = require("../../parser");

var root_1 = require("../../root");

var VComponentNode = function (_super) {
  __extends(VComponentNode, _super);

  function VComponentNode(options) {
    var _this = _super.call(this) || this;

    _this.type = pixelDom_1.NODE_TYPE.COMPONENT_NODE;
    _this.pixelStore = new Set();
    _this.pixelStoreFields = [];
    _this.name = options.name;
    _this.keyIndex = 0;
    _this.methods = options.methods;
    _this.componentProps = utils_1.createProxyObject(options.componentProps, _this.defaultPropsHandler.bind(_this));
    _this.state = utils_1.createProxyObject(options.state, _this.defaultPropsHandler.bind(_this));
    _this.componentDidMountFunc = options.componentDidMount || null;
    _this.componentWillUnmountFunc = options.componentWillUnmount || null;
    _this.componentDidUpdateFunc = options.componentDidUpdate || null;
    _this.pixelStoreFields = options.pixelStore;

    _this.registerEvents();

    return _this;
  }

  VComponentNode.prototype.init = function (options) {
    this.props = utils_1.createProxyObject(options.props, this.defaultPropsHandler.bind(this));
    this.eventHandlers = options.eventHandlers;
    this.tagName = options.tagName;
    this.children = options.children || [];
  };

  VComponentNode.prototype.updateProps = function (props) {
    this.props = utils_1.createProxyObject(props, this.defaultPropsHandler.bind(this));
  };

  VComponentNode.prototype.registerEvents = function () {
    this.eventBus.on(VComponentNode.EVENTS.CDM, this.nodeDidMount.bind(this, this.componentDidMount.bind(this)));
    this.eventBus.on(VComponentNode.EVENTS.CDU, this.componentDidUpdate.bind(this));
    this.eventBus.on(VComponentNode.EVENTS.CU, this.nodeUnmount.bind(this, this.componentWillUnmount.bind(this)));
    this.eventBus.on(VComponentNode.EVENTS.PSU, this.setNewPixelStoreProps.bind(this));
  };

  VComponentNode.prototype.defaultPropsHandler = function (args) {
    var _a;

    (_a = this.eventBus).emit.apply(_a, __spreadArray([VComponentNode.EVENTS.CDU], __read(args)));
  };

  VComponentNode.prototype.conectToPixelStore = function (fields) {
    var _this = this;

    if (fields) {
      fields.forEach(function (field) {
        if (!_this.pixelStore.has(field)) {
          _this.pixelStore.add(field);

          root_1.PixelStore.subscribe(field, _this);
          root_1.PixelStore.forceUpdate(field, _this);
        }
      });
    }
  };

  VComponentNode.prototype.setParentNode = function (parent) {
    this.parent = parent;
  };

  VComponentNode.prototype.componentDidMount = function () {
    this.conectToPixelStore(this.pixelStoreFields);

    if (this.componentDidMountFunc) {
      this.componentDidMountFunc.call(this, this);
    }
  };

  VComponentNode.prototype.componentDidUpdate = function (oldProps, newProps) {
    var _this = this;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function () {
      var newTree = parser_1.Parser.componentParser.reParse(_this.name, _this);
      pixelDom_1.pixelDOM.patch(_this, newTree);

      if (_this.componentDidUpdateFunc) {
        _this.componentDidUpdateFunc(oldProps, newProps);
      }
    }, 150);
  };

  VComponentNode.prototype.componentWillUnmount = function () {
    var _this = this;

    if (this.componentWillUnmountFunc) {
      this.componentWillUnmountFunc.call(this, this);
    }

    if (this.pixelStore.size) {
      this.pixelStore.forEach(function (field) {
        root_1.PixelStore.unsubscribe(field, _this);
      });
    }
  };

  VComponentNode.prototype.setNewPixelStoreProps = function (_a) {
    var _b = __read(_a, 2),
        field = _b[0],
        value = _b[1];

    if (field in this.state) {
      this.state[field] = value;
    }
  };

  VComponentNode.EVENTS = {
    CDM: const_1.EVENTS.NDM,
    CDU: 'component-did-update',
    CU: const_1.EVENTS.NU,
    PSU: const_1.EVENTS.PSU
  };
  return VComponentNode;
}(abstract_1.VParentNode);

exports.VComponentNode = VComponentNode;
},{"../../../const":"../src/utils/const.ts","../pixelDom":"../src/utils/pixel/pixelDom/pixelDom.ts","../../utils":"../src/utils/pixel/utils/index.ts","./abstract":"../src/utils/pixel/pixelDom/Nodes/abstract/index.ts","../../parser":"../src/utils/pixel/parser/index.ts","../../root":"../src/utils/pixel/root/index.ts"}],"../src/utils/pixel/pixelDom/Nodes/VTextNode.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VTextNode = void 0;

var const_1 = require("../const");

var abstract_1 = require("./abstract");

var VTextNode = function (_super) {
  __extends(VTextNode, _super);

  function VTextNode(config) {
    var _this = _super.call(this) || this;

    _this.type = const_1.NODE_TYPE.TEXT_NODE;
    var text = config.text,
        props = config.props;

    if (props) {
      Object.keys(props).forEach(function (key) {
        _this.text = props[key];
        _this.propsKey = key;
      });
      _this.props = props;
    } else {
      _this.text = text;
    }

    return _this;
  }

  VTextNode.prototype.updateText = function (text) {
    if (text === void 0) {
      text = '';
    }

    this.text = text;

    if (this.propsKey) {
      this.props[this.propsKey] = text;
    }
  };

  VTextNode.prototype.setParentNode = function (parent) {
    this.parent = parent;
  };

  return VTextNode;
}(abstract_1.VNode);

exports.VTextNode = VTextNode;
},{"../const":"../src/utils/pixel/pixelDom/const.ts","./abstract":"../src/utils/pixel/pixelDom/Nodes/abstract/index.ts"}],"../src/utils/pixel/pixelDom/Nodes/VCommonNode.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VCommonNode = void 0;

var const_1 = require("../const");

var abstract_1 = require("./abstract");

var utils_1 = require("../../utils");

var const_2 = require("../../../const");

var VCommonNode = function (_super) {
  __extends(VCommonNode, _super);

  function VCommonNode(_a) {
    var props = _a.props,
        tagName = _a.tagName,
        events = _a.events;

    var _this = _super.call(this) || this;

    _this.type = const_1.NODE_TYPE.COMMON_NODE;

    _this.update = function (up) {
      console.warn('node update', up);
    };

    _this.tagName = tagName;
    _this.eventHandlers = events;
    _this.props = utils_1.createProxyObject(props, _this.update);

    _this.registerEvents();

    return _this;
  }

  VCommonNode.prototype.updateProps = function (props) {
    this.props = utils_1.createProxyObject(props, this.update.bind(this));
  };

  VCommonNode.prototype.registerEvents = function () {
    this.eventBus.on(const_2.EVENTS.NDM, this.nodeDidMount.bind(this));
    this.eventBus.on(const_2.EVENTS.NU, this.nodeUnmount.bind(this));
  };

  VCommonNode.prototype.setParentNode = function (parent) {
    this.parent = parent;
  };

  VCommonNode.prototype.setNewPixelStoreProps = function (_a) {
    var _b = __read(_a, 2),
        field = _b[0],
        value = _b[1];

    this.props[field] = value;
  };

  return VCommonNode;
}(abstract_1.VParentNode);

exports.VCommonNode = VCommonNode;
},{"../const":"../src/utils/pixel/pixelDom/const.ts","./abstract":"../src/utils/pixel/pixelDom/Nodes/abstract/index.ts","../../utils":"../src/utils/pixel/utils/index.ts","../../../const":"../src/utils/const.ts"}],"../src/utils/pixel/pixelDom/Nodes/componentNode.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils/pixel/pixelDom/Nodes/nodes.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils/pixel/pixelDom/Nodes/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VCommonNode = exports.VTextNode = exports.VComponentNode = void 0;

var VComponentNode_1 = require("./VComponentNode");

Object.defineProperty(exports, "VComponentNode", {
  enumerable: true,
  get: function get() {
    return VComponentNode_1.VComponentNode;
  }
});

var VTextNode_1 = require("./VTextNode");

Object.defineProperty(exports, "VTextNode", {
  enumerable: true,
  get: function get() {
    return VTextNode_1.VTextNode;
  }
});

var VCommonNode_1 = require("./VCommonNode");

Object.defineProperty(exports, "VCommonNode", {
  enumerable: true,
  get: function get() {
    return VCommonNode_1.VCommonNode;
  }
});

__exportStar(require("./componentNode.type"), exports);

__exportStar(require("./nodes.type"), exports);
},{"./VComponentNode":"../src/utils/pixel/pixelDom/Nodes/VComponentNode.ts","./VTextNode":"../src/utils/pixel/pixelDom/Nodes/VTextNode.ts","./VCommonNode":"../src/utils/pixel/pixelDom/Nodes/VCommonNode.ts","./componentNode.type":"../src/utils/pixel/pixelDom/Nodes/componentNode.type.ts","./nodes.type":"../src/utils/pixel/pixelDom/Nodes/nodes.type.ts"}],"../src/utils/pixel/pixelDom/NodeFabric.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Nodes_1 = require("./Nodes");

var NodeFabric = function () {
  function NodeFabric() {
    this.createNode = function (props) {
      return new Nodes_1.VCommonNode(props);
    };

    this.createText = function (props) {
      return new Nodes_1.VTextNode(props);
    };

    this.createComponent = function (componentConfig, parsed) {
      var props = {
        componentProps: parsed.props,
        pixelStore: componentConfig.pixelStore,
        state: componentConfig.state,
        name: componentConfig.name,
        methods: componentConfig.methods || {},
        componentDidMount: componentConfig.componentDidMount,
        componentWillUnmount: componentConfig.componentWillUnmount,
        componentDidUpdate: componentConfig.componentDidUpdate
      };
      return new Nodes_1.VComponentNode(props);
    };
  }

  NodeFabric.prototype.create = function (config, componentParsed) {
    if ('name' in config) {
      return this.createComponent(config, componentParsed);
    }

    if ('tagName' in config) {
      return this.createNode(config);
    }

    return this.createText(config);
  };

  return NodeFabric;
}();

exports.default = NodeFabric;
},{"./Nodes":"../src/utils/pixel/pixelDom/Nodes/index.ts"}],"../src/utils/pixel/pixelDom/pixelDom.ts":[function(require,module,exports) {
"use strict";

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PixelDOM = exports.NODE_TYPE = exports.pixelDOM = void 0;

var const_1 = require("./const");

Object.defineProperty(exports, "NODE_TYPE", {
  enumerable: true,
  get: function get() {
    return const_1.NODE_TYPE;
  }
});

var NodeFabric_1 = __importDefault(require("./NodeFabric"));

var Nodes_1 = require("./Nodes");

var const_2 = require("../../const");

var utils_1 = require("../utils");

var PixelDOM = function () {
  function PixelDOM() {
    var _this = this;

    this.mountTextNode = function (node) {
      var domNode = document.createTextNode(node.text);
      node.domEl = domNode;
      return node;
    };

    this.mountNode = function (node) {
      var domNode = window.document.createElement(node.tagName);
      node.domEl = domNode;
      node.eventBus.emit(const_2.EVENTS.NDM);

      _this.setProps(node);

      node.children.forEach(function (child, index) {
        child.setParentNode(node);

        if (child instanceof Nodes_1.VTextNode) {
          _this.mountTextNode(child);
        } else {
          child.keyIndex = index;

          _this.mountNode(child);
        }

        domNode.appendChild(child.domEl);
      });
      return node;
    };

    this.setProps = function (node, newNode, pDiff) {
      if (pDiff) {
        pDiff.forEach(function (value, key) {
          if (value === undefined) {
            _this.removeAttribute(node, key, value);
          } else {
            _this.setAttribute(node, key, value);
          }

          node.updateProps(newNode.props);
        });
      } else {
        var props = Object.entries(node.props);
        props.forEach(function (_a) {
          var _b = __read(_a, 2),
              key = _b[0],
              value = _b[1];

          _this.setAttribute(node, key, value);
        });
      }
    };

    this.setAttribute = function (node, key, value) {
      if (typeof value === 'boolean' || key === 'value') {
        node.domEl.value = value;
      } else if (value) {
        node.domEl.setAttribute(key, value);
      }
    };

    this.removeAttribute = function (node, key, value) {
      if (typeof value === 'boolean') {
        node.domEl.value = false;
      } else if (key === 'value') {
        node.domEl.value = '';
      } else {
        node.domEl.removeAttribute(key);
      }
    };

    this.patch = function (oldNode, newNode) {
      var patches = [];

      _this.diff(oldNode, newNode, patches);

      _this.update(patches);
    };

    this.diff = function (oldNode, newNode, patches) {
      if (oldNode.type !== newNode.type) {
        patches.push({
          type: const_1.PATCH_TYPE.REPLACE,
          newNode: newNode,
          oldNode: oldNode
        });
      } else if (newNode instanceof Nodes_1.VTextNode) {
        if (oldNode.text !== newNode.text) {
          patches.push({
            type: const_1.PATCH_TYPE.TEXT,
            newNode: newNode,
            oldNode: oldNode
          });
        }
      } else if (oldNode.tagName !== newNode.tagName) {
        patches.push({
          type: const_1.PATCH_TYPE.REPLACE,
          newNode: newNode,
          oldNode: oldNode
        });
      } else {
        var pDiff = _this.diffProps(oldNode.props, newNode.props);

        if (pDiff.size) {
          patches.push({
            type: const_1.PATCH_TYPE.PROPS,
            newNode: newNode,
            oldNode: oldNode,
            pDiff: pDiff
          });
        }

        _this.diffChildren(oldNode, newNode, patches);
      }
    };

    this.diffChildren = function (oldNode, newNode, patches) {
      var oChildren = oldNode.children;
      var nChildren = newNode.children;
      var maxLength = Math.max(oChildren.length, nChildren.length);

      for (var i = 0; i < maxLength; i += 1) {
        var oChild = oChildren[i];
        var nChild = nChildren[i];

        if (!nChild) {
          patches.push({
            type: const_1.PATCH_TYPE.DELETE,
            oldNode: oChild,
            newNode: nChild
          });
        } else if (!oChild) {
          patches.push({
            type: const_1.PATCH_TYPE.ADD,
            oldNode: oChild,
            newNode: nChild,
            parent: oldNode
          });
        } else {
          _this.diff(oChild, nChild, patches);
        }
      }
    };

    this.diffProps = function (oldProps, newProps) {
      var diff = new Map();

      for (var key in oldProps) {
        if (oldProps[key] !== newProps[key]) {
          diff.set(key, newProps[key]);
        }
      }

      for (var key in newProps) {
        if (oldProps[key] === undefined) {
          diff.set(key, newProps[key]);
        }
      }

      return diff;
    };

    this.unmount = function (node) {
      var callUnmount = function callUnmount(vnode) {
        if (!(vnode instanceof Nodes_1.VTextNode)) {
          vnode.eventBus.emit(const_2.EVENTS.NU);
        }
      };

      utils_1.BFS(node, callUnmount);
    };

    if (PixelDOM.instance) {
      return PixelDOM.instance;
    }

    this.nodeFabric = new NodeFabric_1.default();
    PixelDOM.instance = this;
  }

  PixelDOM.prototype.render = function (node) {
    if (node instanceof Nodes_1.VTextNode) {
      return this.mountTextNode(node);
    }

    return this.mountNode(node);
  };

  PixelDOM.prototype.update = function (patches) {
    var _this = this;

    patches.forEach(function (patch) {
      var oldNode = patch.oldNode,
          newNode = patch.newNode,
          type = patch.type,
          pDiff = patch.pDiff,
          parent = patch.parent;

      if (type === const_1.PATCH_TYPE.REPLACE) {
        _this.replace(oldNode, newNode);
      } else if (type === const_1.PATCH_TYPE.TEXT) {
        oldNode.updateText(newNode.text);
        oldNode.domEl.textContent = newNode.text;
      } else if (type === const_1.PATCH_TYPE.PROPS) {
        _this.setProps(oldNode, newNode, pDiff);
      } else if (type === const_1.PATCH_TYPE.ADD) {
        var node = _this.render(newNode);

        node.setParentNode(parent);
        parent === null || parent === void 0 ? void 0 : parent.domEl.appendChild(node.domEl);
        parent === null || parent === void 0 ? void 0 : parent.children.push(node);
        parent === null || parent === void 0 ? void 0 : parent.children.forEach(function (child, index) {
          child.keyIndex = index;
        });
      } else if (type === const_1.PATCH_TYPE.DELETE) {
        _this.removeChild(oldNode);
      }
    });
  };

  PixelDOM.prototype.replace = function (oldNode, newNode) {
    var parent = oldNode.parent;
    var node = this.render(newNode);
    node.setParentNode(parent);
    node.keyIndex = oldNode.keyIndex;
    parent.children[oldNode.keyIndex] = node;
    parent.domEl.replaceChild(node.domEl, oldNode.domEl);
    this.unmount(oldNode);
  };

  PixelDOM.prototype.removeChild = function (node) {
    node.parent.domEl.removeChild(node.domEl);
    node.parent.children.splice(node.keyIndex, 1);
    node.parent.children.forEach(function (child, index) {
      child.keyIndex = index;
    });
    this.unmount(node);
  };

  return PixelDOM;
}();

exports.PixelDOM = PixelDOM;
var pixelDOM = new PixelDOM();
exports.pixelDOM = pixelDOM;
},{"./const":"../src/utils/pixel/pixelDom/const.ts","./NodeFabric":"../src/utils/pixel/pixelDom/NodeFabric.ts","./Nodes":"../src/utils/pixel/pixelDom/Nodes/index.ts","../../const":"../src/utils/const.ts","../utils":"../src/utils/pixel/utils/index.ts"}],"../src/utils/pixel/pixelDom/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NODE_TYPE = exports.pixelDOM = void 0;

var pixelDom_1 = require("./pixelDom");

Object.defineProperty(exports, "pixelDOM", {
  enumerable: true,
  get: function get() {
    return pixelDom_1.pixelDOM;
  }
});

var const_1 = require("./const");

Object.defineProperty(exports, "NODE_TYPE", {
  enumerable: true,
  get: function get() {
    return const_1.NODE_TYPE;
  }
});

__exportStar(require("./Nodes"), exports);
},{"./pixelDom":"../src/utils/pixel/pixelDom/pixelDom.ts","./const":"../src/utils/pixel/pixelDom/const.ts","./Nodes":"../src/utils/pixel/pixelDom/Nodes/index.ts"}],"../src/utils/pixel/parser/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROP_STORAGES = exports.LIST_TYPE = exports.PREFIXES = exports.ERRORS = void 0;
exports.ERRORS = {
  missedBindStore: function missedBindStore(value) {
    return "The binding string (" + value + ") does not refer to valid objects - IPropStorages";
  },
  missedBindProperty: function missedBindProperty(prop) {
    return "IPropStorages storage does't have \"" + prop + "\"";
  }
};
exports.PREFIXES = {
  BIND: 'b:',
  EVENT: 'e:',
  PROPS: 'p:',
  CONDITION: 'if:',
  LIST: 'map:'
};
exports.LIST_TYPE = {
  OBJECT_ARRAY: 'array'
};
exports.PROP_STORAGES = {
  state: 'state',
  props: 'props',
  methods: 'methods'
};
},{}],"../src/utils/pixel/parser/utils.ts":[function(require,module,exports) {
"use strict";

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takePropInStore = exports.bindProps = exports.slicePropStorage = exports.parseObjectPathTag = void 0;

var const_1 = require("./const");

var parseObjectPathTag = function parseObjectPathTag(store, path, alt) {
  var e_1, _a;

  try {
    var keys = path.split('.');
    var result = store;

    try {
      for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
        var key = keys_1_1.value;
        var value = result[key];

        if (value === undefined || value === null) {
          if (alt) {
            return alt;
          }

          return '';
        }

        result = value;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return result;
  } catch (error) {
    throw Error(const_1.ERRORS.missedBindProperty(path));
  }
};

exports.parseObjectPathTag = parseObjectPathTag;

var slicePropStorage = function slicePropStorage(value) {
  var altSplit = value.split('||');
  var isAlt = altSplit.length > 1;

  if (isAlt) {
    var _a = __read(altSplit[0].trim().split('.')),
        store_1 = _a[0],
        path_1 = _a.slice(1);

    var altStore = '';
    var altPath = '';

    if (altSplit[1].trim() !== "''") {
      var _b = __read(altSplit[1].trim().split('.')),
          aStore = _b[0],
          aPath = _b.slice(1);

      altStore = const_1.PROP_STORAGES[aStore] ? const_1.PROP_STORAGES[aStore] : aStore;
      altPath = aPath.join('.');
    }

    if (!const_1.PROP_STORAGES[store_1]) {
      throw Error(const_1.ERRORS.missedBindStore(value));
    }

    return [const_1.PROP_STORAGES[store_1], path_1.join('.'), altStore, altPath];
  }

  var _c = __read(value.split('.')),
      store = _c[0],
      path = _c.slice(1);

  if (!const_1.PROP_STORAGES[store]) {
    throw Error(const_1.ERRORS.missedBindStore(value));
  }

  return [const_1.PROP_STORAGES[store], path.join('.')];
};

exports.slicePropStorage = slicePropStorage;

var bindProps = function bindProps(props, name, store, path) {
  props[name] = parseObjectPathTag(store, path);
};

exports.bindProps = bindProps;

var takePropInStore = function takePropInStore(value, data, predefinedStore) {
  if (predefinedStore) {
    return parseObjectPathTag(predefinedStore, value);
  }

  var _a = __read(slicePropStorage(value), 4),
      store = _a[0],
      path = _a[1],
      aStore = _a[2],
      aPath = _a[3];

  var altStore = const_1.PROP_STORAGES[aStore];
  var altValue = aPath && altStore ? parseObjectPathTag(data[aStore], aPath) : aStore;

  if (altValue !== undefined) {
    return parseObjectPathTag(data[store], path, altValue);
  }

  return parseObjectPathTag(data[store], path);
};

exports.takePropInStore = takePropInStore;
},{"./const":"../src/utils/pixel/parser/const.ts"}],"../src/utils/pixel/parser/tagParser.ts":[function(require,module,exports) {
"use strict";

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagParser = void 0;

var const_1 = require("./const");

var utils_1 = require("./utils");

var TagParser = function () {
  function TagParser(parser) {
    this.attrRegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
    this.replaceRegExp = /{{([^{}]*)}}/g;

    this.conditionHandler = function (type, store, path, fullValue) {
      var checkValue = '';

      if (fullValue.indexOf('===') !== -1) {
        var _a = __read(fullValue.split('"')[1].split('===').map(function (string) {
          return string.trim();
        }), 2),
            _ = _a[0],
            newCheckValue = _a[1];

        checkValue = newCheckValue;
      }

      var value = utils_1.parseObjectPathTag(store, path);
      var isTruthy = true;

      if (checkValue) {
        isTruthy = value === checkValue;
      } else if (!value) {
        isTruthy = false;
      } else if (value && Array.isArray(value)) {
        if (!value.length) {
          isTruthy = false;
        }
      }

      if (isTruthy && type === 'truthy' || !isTruthy && type !== 'truthy') {
        return true;
      }

      return false;
    };

    this.listHandler = function (name, store, valueString) {
      if (name === const_1.LIST_TYPE.OBJECT_ARRAY) {
        return utils_1.parseObjectPathTag(store, valueString);
      }
    };

    this.getTagName = function (tag) {
      return tag.split(' ')[0].slice(1).trim().replace('>', '');
    };

    this.parserInstant = parser;
  }

  TagParser.prototype.parse = function (tagString, data) {
    var attrReg = new RegExp(this.attrRegExp);
    var attr = null;
    var cleanName = '';
    var currentValue = '';
    var isMod = -1;
    var props = {};
    var events = new Map();
    var isDisplay = true;
    var listProps = null;

    do {
      attr = attrReg.exec(tagString);

      if (attr) {
        var type = '';

        var _a = __read(attr[0].trim().split('='), 2),
            name = _a[0],
            value = _a[1];

        currentValue = value ? value.substring(1, value.length - 1) : '';
        isMod = name.indexOf(':');

        if (isMod !== -1) {
          type = name.substring(0, isMod + 1);
          cleanName = name.substring(isMod + 1);
        }

        if (!type) {
          props[name] = currentValue;
        } else if (type === const_1.PREFIXES.PROPS) {
          this.setProps(props, cleanName, data, currentValue);
        } else if (type === const_1.PREFIXES.BIND) {
          var _b = __read(utils_1.slicePropStorage(currentValue), 2),
              store = _b[0],
              path = _b[1];

          utils_1.bindProps(props, cleanName, data[store], path);
        } else if (type === const_1.PREFIXES.EVENT) {
          var event = utils_1.takePropInStore(currentValue, data);
          events.set(cleanName, event);
        } else if (type === const_1.PREFIXES.CONDITION) {
          var _c = __read(utils_1.slicePropStorage(currentValue), 2),
              store = _c[0],
              path = _c[1];

          isDisplay = this.conditionHandler(cleanName, data[store], path, attr[0].trim());
        } else if (type === const_1.PREFIXES.LIST) {
          var _d = __read(utils_1.slicePropStorage(currentValue), 2),
              store = _d[0],
              path = _d[1];

          listProps = this.listHandler(cleanName, data[store], path);
        }
      }
    } while (attr);

    return {
      props: props,
      tagName: this.getTagName(tagString),
      events: events,
      isDisplay: isDisplay,
      listProps: listProps
    };
  };

  TagParser.prototype.setProps = function (props, name, store, valueString) {
    var reg = new RegExp(this.replaceRegExp);
    var temp = reg.exec(valueString);
    var isReplaceValue = temp !== null && temp[0];
    var value = '';

    if (isReplaceValue) {
      var replaceValue = utils_1.takePropInStore(temp[1], store);
      value = valueString.replace(temp[0], replaceValue);
    } else {
      value = utils_1.takePropInStore(valueString, store, store.props);
    }

    props[name] = value;
  };

  return TagParser;
}();

exports.TagParser = TagParser;
},{"./const":"../src/utils/pixel/parser/const.ts","./utils":"../src/utils/pixel/parser/utils.ts"}],"../src/utils/pixel/parser/componentParser.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentParser = void 0;

var pixelDom_1 = require("../pixelDom");

var root_1 = require("../root");

var ComponentParser = function () {
  function ComponentParser(parser) {
    var _this = this;

    this.componentNameRegExp = /<\/?[\s*]?([^\s]+?)[/\s>]/;
    this.tagRegExp = /<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;

    this.bindMethods = function (methods, self) {
      var methodsEntries = Object.entries(methods);
      return methodsEntries.reduce(function (acc, _a) {
        var _b = __read(_a, 2),
            key = _b[0],
            value = _b[1];

        acc[key] = value.bind(self);
        return acc;
      }, {});
    };

    this.handleList = function (config, data) {
      var components = data.listProps.map(function (item) {
        return pixelDom_1.pixelDOM.nodeFabric.create(config, __assign(__assign({}, data), {
          props: __assign(__assign({}, item), data.props),
          events: data.events
        }));
      });
      var componentsParsedTag = components.map(function (component, index) {
        return _this.parserInstance.parseHTML(config.template, {
          componentProps: __assign(__assign({}, data.props), data.listProps[index]) || {},
          state: config.state || {},
          methods: _this.bindMethods(config.methods || {}, component)
        });
      });
      componentsParsedTag.forEach(function (tagConfig, index) {
        components[index].init(tagConfig);
      });
      return components;
    };

    this.parserInstance = parser;
  }

  ComponentParser.prototype.parse = function (html, parentData) {
    try {
      var _a = parentData || {},
          _b = _a.componentProps,
          componentProps = _b === void 0 ? {} : _b,
          _c = _a.state,
          state = _c === void 0 ? {} : _c,
          _d = _a.methods,
          methods = _d === void 0 ? {} : _d;

      var _e = __read(html.match(this.componentNameRegExp), 2),
          notCleanName = _e[0],
          componentName = _e[1];

      var componentConfig = root_1.Pixel.callComponentModel(componentName);

      if (componentConfig.components) {
        root_1.Pixel.registerComponents(componentConfig.components);
      }

      var componentParsedData = this.parserInstance.tagParser.parse(html.slice(notCleanName.length), {
        props: componentProps,
        state: state,
        methods: methods
      });

      if (!componentParsedData.isDisplay) {
        return null;
      }

      if (componentParsedData.listProps) {
        return this.handleList(componentConfig, componentParsedData);
      }

      var component = pixelDom_1.pixelDOM.nodeFabric.create(componentConfig, componentParsedData);
      var componentParsedTag = this.parserInstance.parseHTML(componentConfig.template, {
        componentProps: componentParsedData.props || {},
        state: componentConfig.state || {},
        methods: this.bindMethods(componentConfig.methods || {}, component)
      });
      component.init(componentParsedTag);
      return component;
    } catch (error) {
      throw new Error(error);
    }
  };

  ComponentParser.prototype.reParse = function (name, oldComponent) {
    var componentConfig = root_1.Pixel.callComponentModel(name);
    componentConfig.state = oldComponent.state || componentConfig.state;
    var component = pixelDom_1.pixelDOM.nodeFabric.create(componentConfig, {
      props: oldComponent.componentProps
    });
    var componentParsedTag = this.parserInstance.parseHTML(componentConfig.template, {
      componentProps: component.componentProps || {},
      state: componentConfig.state || {},
      methods: this.bindMethods(componentConfig.methods || {}, oldComponent)
    });
    component.init(componentParsedTag);
    return component;
  };

  return ComponentParser;
}();

exports.ComponentParser = ComponentParser;
},{"../pixelDom":"../src/utils/pixel/pixelDom/index.ts","../root":"../src/utils/pixel/root/index.ts"}],"../src/utils/pixel/parser/textParser.ts":[function(require,module,exports) {
"use strict";

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextParser = void 0;

var pixelDom_1 = require("../pixelDom");

var utils_1 = require("./utils");

var TextParser = function () {
  function TextParser(parserInstant) {
    this.replaceRegExp = new RegExp(/{{([^{}]*)}}/g);
    this.parserInstant = parserInstant;
  }

  TextParser.prototype.parse = function (text, data) {
    if (text.length) {
      var reg = new RegExp(this.replaceRegExp);
      var temp = reg.exec(text);

      if (temp && temp[0]) {
        var _a = __read(utils_1.slicePropStorage(temp[1]), 2),
            store = _a[0],
            path = _a[1];

        var props = {};
        utils_1.bindProps(props, path, data[store], path);
        return pixelDom_1.pixelDOM.nodeFabric.create({
          props: props,
          text: text
        });
      }

      return pixelDom_1.pixelDOM.nodeFabric.create({
        text: text
      });
    }

    return null;
  };

  return TextParser;
}();

exports.TextParser = TextParser;
},{"../pixelDom":"../src/utils/pixel/pixelDom/index.ts","./utils":"../src/utils/pixel/parser/utils.ts"}],"../src/utils/pixel/parser/parser.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var pixelDom_1 = require("../pixelDom");

var utils_1 = require("../utils");

var tagParser_1 = require("./tagParser");

var componentParser_1 = require("./componentParser");

var textParser_1 = require("./textParser");

var PixelParser = function () {
  function PixelParser() {
    var _this = this;

    this.tagRegExp = /<[\s*]?[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g;
    this.componentRegExp = /<[\\/]?[\s*]?[A-Z\-!](?:"[^"]*"|'[^']*'|[^'">])*>/g;
    this.replaceRegExp = new RegExp(/{{([^{}]*)}}/g);

    this.addAsChild = function (stack, node) {
      var parent = stack.peek();

      if (parent) {
        parent.children.push(node);
      } else if (!(node instanceof pixelDom_1.VTextNode)) {
        stack.push(node);
      }
    };

    this.isComponent = function (tag) {
      return tag.match(_this.componentRegExp);
    };

    this.isXHTML = function (tag) {
      return tag[tag.length - 2] === '/';
    };

    this.tagParser = new tagParser_1.TagParser(this);
    this.componentParser = new componentParser_1.ComponentParser(this);
    this.textParser = new textParser_1.TextParser(this);
  }

  PixelParser.prototype.parseHTML = function (html, parentProps) {
    var _this = this;

    var stack = new utils_1.Stack();
    var ignoreStack = new utils_1.Stack();
    var tagReg = new RegExp(this.tagRegExp);
    var el = null;

    var _a = parentProps || {},
        _b = _a.componentProps,
        componentProps = _b === void 0 ? {} : _b,
        _c = _a.state,
        state = _c === void 0 ? {} : _c,
        _d = _a.methods,
        methods = _d === void 0 ? {} : _d;

    var data = {
      props: componentProps,
      state: state,
      methods: methods
    };

    do {
      el = tagReg.exec(html);

      if (el) {
        var isIgnoreStackEmpty = ignoreStack.isEmpty();
        var tag = el[0];
        var index = el.index;
        var isComponent = this.isComponent(tag);
        var isXHTML = this.isXHTML(tag);
        var isCloseTag = tag[1] === '/';

        if (isComponent) {
          if (isIgnoreStackEmpty) {
            var component = this.componentParser.parse(tag, parentProps);

            if (component && Array.isArray(component)) {
              component.forEach(function (item) {
                return _this.addAsChild(stack, item);
              });
            } else if (component) {
              this.addAsChild(stack, component);
            }
          }
        } else if (isXHTML) {
          if (isIgnoreStackEmpty) {
            var parsedTag = this.tagParser.parse(tag, data);

            if (parsedTag.isDisplay) {
              var node = pixelDom_1.pixelDOM.nodeFabric.create(parsedTag);
              this.addAsChild(stack, node);
            }
          }
        } else if (isCloseTag) {
          if (isIgnoreStackEmpty) {
            var node = stack.pop();
            this.addAsChild(stack, node);
          } else {
            ignoreStack.pop();
          }
        } else {
          var textNode = null;
          var start = index + tag.trim().length;
          var nextChar = html[start];
          var parsedTag = this.tagParser.parse(tag, data);
          var node = pixelDom_1.pixelDOM.nodeFabric.create(parsedTag);

          if (nextChar && nextChar !== '<') {
            var text = html.slice(start, html.indexOf('<', start)).trim();
            textNode = this.textParser.parse(text, data);
          }

          if (isIgnoreStackEmpty && parsedTag.isDisplay) {
            stack.push(node);

            if (textNode) {
              this.addAsChild(stack, textNode);
            }
          } else {
            ignoreStack.push(node);
          }
        }
      }
    } while (el);

    return stack.pop();
  };

  return PixelParser;
}();

exports.default = PixelParser;
exports.Parser = new PixelParser();
},{"../pixelDom":"../src/utils/pixel/pixelDom/index.ts","../utils":"../src/utils/pixel/utils/index.ts","./tagParser":"../src/utils/pixel/parser/tagParser.ts","./componentParser":"../src/utils/pixel/parser/componentParser.ts","./textParser":"../src/utils/pixel/parser/textParser.ts"}],"../src/utils/pixel/parser/parser.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils/pixel/parser/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IParsedTag = exports.Parser = void 0;

var parser_1 = require("./parser");

Object.defineProperty(exports, "Parser", {
  enumerable: true,
  get: function get() {
    return parser_1.Parser;
  }
});

var parser_type_1 = require("./parser.type");

Object.defineProperty(exports, "IParsedTag", {
  enumerable: true,
  get: function get() {
    return parser_type_1.IParsedTag;
  }
});
},{"./parser":"../src/utils/pixel/parser/parser.ts","./parser.type":"../src/utils/pixel/parser/parser.type.ts"}],"../src/utils/pixel/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IComponentModel = exports.Pixel = exports.PixelStore = exports.PixelRouter = exports.Router = exports.IRoutesConfig = exports.IRouterState = exports.IDefaultRoute = exports.Store = exports.IParsedTag = void 0;

var parser_1 = require("./parser");

Object.defineProperty(exports, "IParsedTag", {
  enumerable: true,
  get: function get() {
    return parser_1.IParsedTag;
  }
});

var store_1 = require("./store");

Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return store_1.Store;
  }
});

var router_1 = require("./router");

Object.defineProperty(exports, "IDefaultRoute", {
  enumerable: true,
  get: function get() {
    return router_1.IDefaultRoute;
  }
});
Object.defineProperty(exports, "IRouterState", {
  enumerable: true,
  get: function get() {
    return router_1.IRouterState;
  }
});
Object.defineProperty(exports, "IRoutesConfig", {
  enumerable: true,
  get: function get() {
    return router_1.IRoutesConfig;
  }
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function get() {
    return router_1.Router;
  }
});

var root_1 = require("./root");

Object.defineProperty(exports, "PixelRouter", {
  enumerable: true,
  get: function get() {
    return root_1.PixelRouter;
  }
});
Object.defineProperty(exports, "PixelStore", {
  enumerable: true,
  get: function get() {
    return root_1.PixelStore;
  }
});
Object.defineProperty(exports, "Pixel", {
  enumerable: true,
  get: function get() {
    return root_1.Pixel;
  }
});

var pixelDom_1 = require("./pixelDom");

Object.defineProperty(exports, "IComponentModel", {
  enumerable: true,
  get: function get() {
    return pixelDom_1.IComponentModel;
  }
});
},{"./parser":"../src/utils/pixel/parser/index.ts","./store":"../src/utils/pixel/store/index.ts","./router":"../src/utils/pixel/router/index.ts","./root":"../src/utils/pixel/root/index.ts","./pixelDom":"../src/utils/pixel/pixelDom/index.ts"}],"../src/utils/formValidator/FormValidator.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormValidator = void 0;

var Validator = function () {
  function Validator() {
    this.rules = {
      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      password: /(?=[#$-/:-?{-~!"^_`[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`[\]]))(?=[#$-/:-?{-~!"^_`[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`[\]a-zA-Z0-9]{4,}/,
      text: /\w*/,
      tel: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/
    };

    this.setErrorMessage = function (type) {
      return Validator.ERROR_MESSAGES[type];
    };
  }

  Validator.prototype.validate = function (state, config, fieldsType) {
    var _this = this;

    var isFullValid = true;
    Object.keys(fieldsType).filter(function (type) {
      return type;
    }).forEach(function (field) {
      var typeConfig = fieldsType[field];
      var fieldValue = state[config.form][field] ? state[config.form][field].toString().trim() : '';

      if (!fieldValue) {
        if (!config.ignoreEmpty) {
          isFullValid = false;
          state[config.errors][field] = Validator.ERROR_MESSAGES.empty;
        }
      } else if (_typeof(typeConfig) === 'object') {
        _this.handleUncommon(typeConfig, state[config.form], state[config.errors]);
      } else {
        var isValid = _this.rules[typeConfig].test(fieldValue);

        if (!isValid) {
          isFullValid = false;
          state[config.errors][field] = _this.setErrorMessage(typeConfig);
        } else {
          state[config.errors][field] = '';
        }
      }
    });
    return isFullValid;
  };

  Validator.prototype.handleUncommon = function (config, state, errors) {
    var type = config.type;
    var value = state[config.field];
    var isValid = this.rules[type].test(value.toString());

    if (!isValid) {
      state[config.field] = this.setErrorMessage(type);
    } else if (config.compare) {
      if (state[config.field] === state[config.compare]) {
        errors[config.field] = '';

        if (!errors[config.compare].length || errors[config.compare].length && errors[config.compare] === Validator.ERROR_MESSAGES.compare) {
          errors[config.compare] = '';
        }
      } else {
        errors[config.field] = Validator.ERROR_MESSAGES.compare;
        errors[config.compare] = Validator.ERROR_MESSAGES.compare;
      }
    }

    return !!errors[config.field].length;
  };

  Validator.ERROR_MESSAGES = {
    empty: 'Поле не может быть пустым',
    password: 'Пароль не проходит условия',
    text: 'Минимум 3 лат. буквы',
    tel: 'Не правильный формат телефонного номера',
    email: 'Не похоже на почту ',
    compare: 'Значение полей не совпадает'
  };
  return Validator;
}();

exports.FormValidator = new Validator();
},{}],"../src/utils/formValidator/FormValidator.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils/formValidator/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IValidatorConfig = exports.FormValidator = void 0;

var FormValidator_1 = require("./FormValidator");

Object.defineProperty(exports, "FormValidator", {
  enumerable: true,
  get: function get() {
    return FormValidator_1.FormValidator;
  }
});

var FormValidator_type_1 = require("./FormValidator.type");

Object.defineProperty(exports, "IValidatorConfig", {
  enumerable: true,
  get: function get() {
    return FormValidator_type_1.IValidatorConfig;
  }
});
},{"./FormValidator":"../src/utils/formValidator/FormValidator.ts","./FormValidator.type":"../src/utils/formValidator/FormValidator.type.ts"}],"../src/utils/date-handler/dateHandler.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateHandler = void 0;

var DateHandler = function () {
  function DateHandler() {
    this.convertToDateString = function (value) {
      var localValue = value.toString();

      if (localValue.length === 1) {
        return "0" + localValue;
      }

      return localValue;
    };

    this.convertToDate = function (date) {
      if (typeof date === 'string') {
        return new Date(date);
      }

      return date;
    };

    this.convertWeekDay = function (date) {
      if (typeof date === 'string') {
        return new Date(date);
      }

      return date;
    };
  }

  DateHandler.prototype.parseDate = function (date) {
    var localDate = this.convertToDate(date);
    var weekday = new Intl.DateTimeFormat('ru-RU', {
      weekday: 'short'
    }).format(localDate);
    var day = this.convertToDateString(localDate.getDate());
    var month = this.convertToDateString(localDate.getMonth() + 1);
    var year = localDate.getFullYear().toString();
    var hours = localDate.getHours();
    var minuts = localDate.getMinutes();
    var seconds = localDate.getSeconds();
    return {
      weekday: weekday,
      day: day,
      month: month,
      year: year,
      hours: hours,
      minuts: minuts,
      seconds: seconds
    };
  };

  DateHandler.prototype.parseToChatFormat = function (isoDate) {
    var date = this.parseDate(isoDate);
    var currentDate = this.parseDate(new Date());
    var dayDiff = Number(currentDate.day) - Number(date.day);

    if (date.year === currentDate.year && date.month === currentDate.month && date.day === currentDate.day) {
      return date.hours + ":" + date.minuts;
    }

    if (date.year === currentDate.year && date.month === currentDate.month && dayDiff === 1) {
      return 'вчера';
    }

    if (date.year === currentDate.year && date.month === currentDate.month && dayDiff > 1 && dayDiff < 5) {
      return date.weekday;
    }

    if (date.year === currentDate.year) {
      return date.day + "." + date.month;
    }

    return date.day + "." + date.month + "." + date.year;
  };

  return DateHandler;
}();

exports.dateHandler = new DateHandler();
},{}],"../src/utils/date-handler/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateHandler = void 0;

var dateHandler_1 = require("./dateHandler");

Object.defineProperty(exports, "dateHandler", {
  enumerable: true,
  get: function get() {
    return dateHandler_1.dateHandler;
  }
});
},{"./dateHandler":"../src/utils/date-handler/dateHandler.ts"}],"../src/utils/http/methods.enum.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.METHODS = void 0;
var METHODS;

(function (METHODS) {
  METHODS["GET"] = "GET";
  METHODS["PUT"] = "PUT";
  METHODS["POST"] = "POST";
  METHODS["DELETE"] = "DELETE";
})(METHODS = exports.METHODS || (exports.METHODS = {}));
},{}],"../src/utils/http/HTTPTransport.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPTransport = void 0;

var methods_enum_1 = require("./methods.enum");

function parseObject(obj) {
  return Object.entries(obj).reduce(function (acc, _a) {
    var _b = __read(_a, 2),
        key = _b[0],
        value = _b[1];

    if (_typeof(value) !== 'object') {
      acc += "&" + key + "=" + value;
    } else if (Array.isArray(value)) {
      acc += "&" + key + "=" + value.join(',');
    } else if (_typeof(value) === 'object' && value !== null) {
      acc += "" + parseObject(value);
    }

    return acc;
  }, '');
}

function queryStringify(data) {
  if (typeof data === 'string') {
    if (data.startsWith('?')) {
      return data;
    }

    return "? + " + data;
  }

  var query = parseObject(data);

  if (query.length) {
    return "?" + query.substring(1);
  }

  return '';
}

var HTTPTransport = function () {
  function HTTPTransport(base, baseHeaders) {
    var _this = this;

    this.get = function (url, options) {
      if (url === void 0) {
        url = '';
      }

      if (options === void 0) {
        options = {};
      }

      var currentUrl = url;

      if (options.data) {
        currentUrl = url + queryStringify(options.data);
      }

      return _this.request(currentUrl, __assign(__assign({}, options), {
        method: methods_enum_1.METHODS.GET
      }), options.timeout);
    };

    this.baseUrl = base;
    this.baseHeaders = baseHeaders;
  }

  HTTPTransport.prototype.put = function (url, options) {
    if (url === void 0) {
      url = '';
    }

    if (options === void 0) {
      options = {};
    }

    return this.request(url, __assign(__assign({}, options), {
      method: methods_enum_1.METHODS.PUT
    }), options.timeout);
  };

  HTTPTransport.prototype.post = function (url, options) {
    if (url === void 0) {
      url = '';
    }

    if (options === void 0) {
      options = {};
    }

    return this.request(url, __assign(__assign({}, options), {
      method: methods_enum_1.METHODS.POST
    }), options.timeout);
  };

  HTTPTransport.prototype.delete = function (url, options) {
    if (url === void 0) {
      url = '';
    }

    if (options === void 0) {
      options = {};
    }

    return this.request(url, __assign(__assign({}, options), {
      method: methods_enum_1.METHODS.DELETE
    }), options.timeout);
  };

  HTTPTransport.prototype.request = function (url, options, timeout) {
    var _this = this;

    if (url === void 0) {
      url = '';
    }

    if (timeout === void 0) {
      timeout = 5000;
    }

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(options.method, _this.baseUrl + url);
      xhr.withCredentials = true;
      options.headers = __assign(__assign({}, _this.baseHeaders), options.headers);

      if (options && !options.isNoHeader && options.headers) {
        Object.keys(options.headers).forEach(function (key) {
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            var parsed = xhr.response ? JSON.parse(xhr.response) : '';
            resolve(parsed);
          } catch (error) {
            resolve('');
          }
        } else {
          try {
            reject(JSON.parse(xhr.response));
          } catch (_a) {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.ontimeout = reject;
      xhr.onerror = reject;

      if (options.method === methods_enum_1.METHODS.GET || !options.data) {
        xhr.send();
      } else if (!options.isNoHeader) {
        xhr.send(JSON.stringify(options.data ? options.data : {}));
      } else {
        xhr.send(options.data ? options.data : {});
      }
    });
  };

  return HTTPTransport;
}();

exports.HTTPTransport = HTTPTransport;
},{"./methods.enum":"../src/utils/http/methods.enum.ts"}],"../src/utils/http/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPTransport = void 0;

var HTTPTransport_1 = require("./HTTPTransport");

Object.defineProperty(exports, "HTTPTransport", {
  enumerable: true,
  get: function get() {
    return HTTPTransport_1.HTTPTransport;
  }
});
},{"./HTTPTransport":"../src/utils/http/HTTPTransport.ts"}],"../src/utils/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPTransport = exports.dateHandler = exports.IValidatorConfig = exports.FormValidator = exports.PixelStore = exports.PixelRouter = exports.Pixel = exports.IComponentModel = exports.generateUniqId = void 0;

var helpers_1 = require("./helpers");

Object.defineProperty(exports, "generateUniqId", {
  enumerable: true,
  get: function get() {
    return helpers_1.generateUniqId;
  }
});

var pixel_1 = require("./pixel");

Object.defineProperty(exports, "IComponentModel", {
  enumerable: true,
  get: function get() {
    return pixel_1.IComponentModel;
  }
});
Object.defineProperty(exports, "Pixel", {
  enumerable: true,
  get: function get() {
    return pixel_1.Pixel;
  }
});
Object.defineProperty(exports, "PixelRouter", {
  enumerable: true,
  get: function get() {
    return pixel_1.PixelRouter;
  }
});
Object.defineProperty(exports, "PixelStore", {
  enumerable: true,
  get: function get() {
    return pixel_1.PixelStore;
  }
});

var formValidator_1 = require("./formValidator");

Object.defineProperty(exports, "FormValidator", {
  enumerable: true,
  get: function get() {
    return formValidator_1.FormValidator;
  }
});
Object.defineProperty(exports, "IValidatorConfig", {
  enumerable: true,
  get: function get() {
    return formValidator_1.IValidatorConfig;
  }
});

var date_handler_1 = require("./date-handler");

Object.defineProperty(exports, "dateHandler", {
  enumerable: true,
  get: function get() {
    return date_handler_1.dateHandler;
  }
});

var http_1 = require("./http");

Object.defineProperty(exports, "HTTPTransport", {
  enumerable: true,
  get: function get() {
    return http_1.HTTPTransport;
  }
});
},{"./helpers":"../src/utils/helpers.ts","./pixel":"../src/utils/pixel/index.ts","./formValidator":"../src/utils/formValidator/index.ts","./date-handler":"../src/utils/date-handler/index.ts","./http":"../src/utils/http/index.ts"}],"../src/api/base-api.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAPI = void 0;

var utils_1 = require("../utils");

var const_1 = require("./const");

var BaseAPI = function () {
  function BaseAPI(path, defaultBase) {
    if (defaultBase === void 0) {
      defaultBase = const_1.BASE;
    }

    this.http = new utils_1.HTTPTransport(defaultBase + path, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true
    });
  }

  return BaseAPI;
}();

exports.BaseAPI = BaseAPI;
},{"../utils":"../src/utils/index.ts","./const":"../src/api/const.ts"}],"../src/api/chat.api.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatAPI = void 0;

var base_api_1 = require("./base-api");

var ChatAPI = function (_super) {
  __extends(ChatAPI, _super);

  function ChatAPI() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ChatAPI.prototype.get = function () {
    return this.http.get('');
  };

  ChatAPI.prototype.getSingle = function (id) {
    return this.http.post("/token/" + id);
  };

  ChatAPI.prototype.create = function (data) {
    return this.http.post('', {
      data: data
    });
  };

  ChatAPI.prototype.delete = function (data) {
    return this.http.delete('', {
      data: data
    });
  };

  ChatAPI.prototype.uploadAvatar = function (data) {
    return this.http.put('/avatar', {
      isNoHeader: true,
      data: data
    });
  };

  ChatAPI.prototype.getUsers = function (id) {
    return this.http.get("/" + id + "/users");
  };

  ChatAPI.prototype.addUser = function (data) {
    return this.http.put('/users', {
      data: data
    });
  };

  ChatAPI.prototype.deleteUser = function (data) {
    return this.http.delete('/users', {
      data: data
    });
  };

  return ChatAPI;
}(base_api_1.BaseAPI);

exports.chatAPI = new ChatAPI('/chats');
},{"./base-api":"../src/api/base-api.ts"}],"../src/api/auth.api.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authAPI = void 0;

var base_api_1 = require("./base-api");

var AuthAPI = function (_super) {
  __extends(AuthAPI, _super);

  function AuthAPI() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AuthAPI.prototype.getUserData = function () {
    return this.http.get('/user');
  };

  AuthAPI.prototype.register = function (data) {
    return this.http.post('/signup', {
      data: data
    });
  };

  AuthAPI.prototype.login = function (data) {
    return this.http.post('/signin', {
      data: data
    });
  };

  AuthAPI.prototype.logout = function () {
    return this.http.post('/logout');
  };

  return AuthAPI;
}(base_api_1.BaseAPI);

exports.authAPI = new AuthAPI('/auth');
},{"./base-api":"../src/api/base-api.ts"}],"../src/api/user.api.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAPI = void 0;

var base_api_1 = require("./base-api");

var UserAPI = function (_super) {
  __extends(UserAPI, _super);

  function UserAPI() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  UserAPI.prototype.changeProfile = function (data) {
    return this.http.put('/profile', {
      data: data
    });
  };

  UserAPI.prototype.changePassword = function (data) {
    return this.http.put('/password', {
      data: data
    });
  };

  UserAPI.prototype.changeAvatar = function (formData) {
    return this.http.put('/profile/avatar', {
      isNoHeader: true,
      data: formData
    });
  };

  return UserAPI;
}(base_api_1.BaseAPI);

exports.userAPI = new UserAPI('/user');
},{"./base-api":"../src/api/base-api.ts"}],"../src/api/chat-web-socket.api.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatWebSocket = void 0;

var ChatWebSocket = function () {
  function ChatWebSocket(userId, chat, token, callbacks) {
    var _this = this;

    this.openHandler = function () {
      _this.sendMessage('0', ChatWebSocket.TYPES.MESSAGES_HISTORY);
    };

    this.messageHandler = function (callback, event) {
      var data = event.data ? JSON.parse(event.data) : '';

      if (data && Array.isArray(data) || data.type !== 'pong') {
        callback(_this.chat.id, data);
      }
    };

    this.errorHandler = function (event) {};

    this.closeHandler = function (callback, event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
    };

    this.socket = new WebSocket("wss://ya-praktikum.tech/ws/chats/" + userId + "/" + chat.id + "/" + token);
    this.socket.addEventListener('open', this.openHandler.bind(this, callbacks === null || callbacks === void 0 ? void 0 : callbacks.openCB));
    this.socket.addEventListener('close', this.closeHandler.bind(this, callbacks === null || callbacks === void 0 ? void 0 : callbacks.closeCB));
    this.socket.addEventListener('message', this.messageHandler.bind(this, callbacks === null || callbacks === void 0 ? void 0 : callbacks.messageCB));
    this.socket.addEventListener('error', this.errorHandler.bind(this, callbacks === null || callbacks === void 0 ? void 0 : callbacks.errorCB));
    this.chat = __assign(__assign({}, chat), {
      messages: []
    });
  }

  ChatWebSocket.prototype.sendMessage = function (content, type) {
    if (type === void 0) {
      type = ChatWebSocket.TYPES.MESSAGE;
    }

    var payload = {
      type: type
    };

    if (content) {
      payload.content = content;
    }

    this.socket.send(JSON.stringify(payload));
  };

  ChatWebSocket.TYPES = {
    MESSAGE: 'message',
    MESSAGES_HISTORY: 'get old'
  };
  return ChatWebSocket;
}();

exports.ChatWebSocket = ChatWebSocket;
},{}],"../src/api/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatWebSocket = exports.userAPI = exports.authAPI = exports.chatAPI = exports.BASE = void 0;

var const_1 = require("./const");

Object.defineProperty(exports, "BASE", {
  enumerable: true,
  get: function get() {
    return const_1.BASE;
  }
});

var chat_api_1 = require("./chat.api");

Object.defineProperty(exports, "chatAPI", {
  enumerable: true,
  get: function get() {
    return chat_api_1.chatAPI;
  }
});

var auth_api_1 = require("./auth.api");

Object.defineProperty(exports, "authAPI", {
  enumerable: true,
  get: function get() {
    return auth_api_1.authAPI;
  }
});

var user_api_1 = require("./user.api");

Object.defineProperty(exports, "userAPI", {
  enumerable: true,
  get: function get() {
    return user_api_1.userAPI;
  }
});

var chat_web_socket_api_1 = require("./chat-web-socket.api");

Object.defineProperty(exports, "ChatWebSocket", {
  enumerable: true,
  get: function get() {
    return chat_web_socket_api_1.ChatWebSocket;
  }
});
},{"./const":"../src/api/const.ts","./chat.api":"../src/api/chat.api.ts","./auth.api":"../src/api/auth.api.ts","./user.api":"../src/api/user.api.ts","./chat-web-socket.api":"../src/api/chat-web-socket.api.ts"}],"../src/controllers/cookie-auth.controller.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookieAuthController = void 0;

var api_1 = require("../api");

var utils_1 = require("../utils");

var CookieAuthController = function () {
  function CookieAuthController() {
    var _this = this;

    this.checkAuth = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var userData, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4, api_1.authAPI.getUserData()];

            case 1:
              userData = _a.sent();
              utils_1.PixelStore.setUserData(__assign(__assign({}, userData), {
                isAuth: true
              }));
              utils_1.PixelStore.dispatch('currentUser', __assign({}, userData));
              return [3, 3];

            case 2:
              error_1 = _a.sent();
              console.error(error_1);
              return [3, 3];

            case 3:
              return [2];
          }
        });
      });
    };
  }

  return CookieAuthController;
}();

exports.CookieAuthController = CookieAuthController;
},{"../api":"../src/api/index.ts","../utils":"../src/utils/index.ts"}],"../src/controllers/chat.controller.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatController = void 0;

var _1 = require(".");

var api_1 = require("../api");

var pixel_1 = require("../utils/pixel");

var ChatController = function () {
  function ChatController() {
    var _this = this;

    this.getChats = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var chats, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4, api_1.chatAPI.get()];

            case 1:
              chats = _a.sent();

              _1.messagesController.init(chats);

              pixel_1.PixelStore.dispatch('chats', []);
              setTimeout(function () {
                pixel_1.PixelStore.dispatch('chats', _1.messagesController.chats);
              }, 300);
              return [3, 3];

            case 2:
              error_1 = _a.sent();
              console.error(error_1);
              return [3, 3];

            case 3:
              return [2];
          }
        });
      });
    };

    this.createChat = function (data) {
      return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3,, 4]);

              if (!data.title.trim()) {
                throw Error('Поле должно быть заполнено');
              }

              return [4, api_1.chatAPI.create({
                title: data.title
              })];

            case 1:
              _a.sent();

              data.error = '';
              data.title = '';
              return [4, this.getChats()];

            case 2:
              _a.sent();

              return [3, 4];

            case 3:
              error_2 = _a.sent();
              data.error = 'Поле должно быть заполнено';
              return [3, 4];

            case 4:
              return [2];
          }
        });
      });
    };
  }

  return ChatController;
}();

exports.ChatController = ChatController;
},{".":"../src/controllers/index.ts","../api":"../src/api/index.ts","../utils/pixel":"../src/utils/pixel/index.ts"}],"../src/controllers/auth.controller.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthController = void 0;

var api_1 = require("../api");

var utils_1 = require("../utils");

var AuthController = function () {
  function AuthController() {
    var _this = this;

    this.checkAuth = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var userData, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4, api_1.authAPI.getUserData()];

            case 1:
              userData = _a.sent();
              utils_1.PixelStore.setUserData(__assign(__assign({}, userData), {
                isAuth: true
              }));
              utils_1.PixelStore.dispatch('currentUser', __assign({}, userData));
              return [3, 3];

            case 2:
              error_1 = _a.sent();
              console.error(error_1);
              return [3, 3];

            case 3:
              return [2];
          }
        });
      });
    };

    this.logout = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4, api_1.authAPI.logout()];

            case 1:
              _a.sent();

              utils_1.PixelStore.setUserData({
                isAuth: false
              });
              utils_1.PixelStore.dispatch('currentUser', {});
              return [3, 3];

            case 2:
              error_2 = _a.sent();
              console.error(error_2);
              return [3, 3];

            case 3:
              return [2];
          }
        });
      });
    };
  }

  return AuthController;
}();

exports.AuthController = AuthController;
},{"../api":"../src/api/index.ts","../utils":"../src/utils/index.ts"}],"../src/controllers/messages.controller.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messagesController = void 0;

var api_1 = require("../api");

var utils_1 = require("../utils");

var MessagesController = function () {
  function MessagesController() {
    var _this = this;

    this.sockets = new Map();
    this.chatInArray = new Map();
    this.users = new Map();

    this.init = function (chats) {
      return __awaiter(_this, void 0, void 0, function () {
        var id, chatsToInit, chatUsers, usedChats, tokens, users, i, _a, _b, item;

        var e_1, _c;

        var _this = this;

        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              id = utils_1.PixelStore.currentUser.id;
              chatsToInit = [];
              chatUsers = [];
              usedChats = new Map();
              chats.forEach(function (chat) {
                if (!_this.sockets.has(chat.id)) {
                  chatsToInit.push({
                    chatId: chat.id,
                    tokenReq: api_1.chatAPI.getSingle(chat.id)
                  });
                  chatUsers.push({
                    chatId: chat.id,
                    userReq: api_1.chatAPI.getUsers(chat.id)
                  });
                }

                usedChats.set(chat.id, chat);
              });
              return [4, Promise.all(chatsToInit.map(function (chatConf) {
                return chatConf.tokenReq;
              }))];

            case 1:
              tokens = _d.sent();
              return [4, Promise.all(chatUsers.map(function (chatConf) {
                return chatConf.userReq;
              }))];

            case 2:
              users = _d.sent();
              chatsToInit.forEach(function (chat, index) {
                _this.initSocket(id, usedChats.get(chat.chatId), tokens[index].token);
              });
              this.chatInArray.clear();
              this.clearSockets(usedChats);
              this.chats = [];
              i = 0;

              try {
                for (_a = __values(this.sockets), _b = _a.next(); !_b.done; _b = _a.next()) {
                  item = _b.value;
                  this.chatInArray.set(item[1].chat.id, i);
                  item[1].chat.users = this.convertUsers(users[i]);
                  item[1].chat.index = i;
                  this.chats.push(item[1].chat);
                  i += 1;
                }
              } catch (e_1_1) {
                e_1 = {
                  error: e_1_1
                };
              } finally {
                try {
                  if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }

              return [2];
          }
        });
      });
    };

    this.convertMessages = function (messages) {
      var id = utils_1.PixelStore.currentUser.id;
      var toConvert = Array.isArray(messages) ? messages.reverse() : [messages];
      var converted = toConvert.map(function (message) {
        var time = utils_1.dateHandler.parseToChatFormat(message.time);

        var user = _this.users.get(message.user_id);

        var isAuthor = (user === null || user === void 0 ? void 0 : user.id) === id;
        return __assign(__assign({}, message), {
          isAuthor: isAuthor,
          time: time,
          avatar: user === null || user === void 0 ? void 0 : user.avatar,
          name: (user === null || user === void 0 ? void 0 : user.display_name) ? user.display_name : user === null || user === void 0 ? void 0 : user.login
        });
      });
      var lastMessage = null;

      if (converted.length && converted.length > 1) {
        lastMessage = converted[converted.length - 1];
      } else if (converted.length) {
        lastMessage = converted[0];
      }

      return {
        messages: converted,
        lastMessage: lastMessage
      };
    };

    this.timer = setInterval(function () {
      _this.pingPong();
    }, 25000);
  }

  MessagesController.prototype.initSocket = function (userId, chat, token) {
    var socket = new api_1.ChatWebSocket(userId, chat, token, {
      messageCB: this.onMessage.bind(this)
    });
    this.sockets.set(chat.id, socket);
  };

  MessagesController.prototype.onMessage = function (chatId, wsMessage) {
    var _a;

    var _b = this.convertMessages(wsMessage),
        messages = _b.messages,
        lastMessage = _b.lastMessage;

    (_a = this.chats[this.chatInArray.get(chatId)].messages).push.apply(_a, __spreadArray([], __read(messages)));

    this.chats[this.chatInArray.get(chatId)].lastMessage = lastMessage;
    utils_1.PixelStore.dispatch('chats', this.chats);

    if (utils_1.PixelStore.store.selectedChat && utils_1.PixelStore.store.selectedChat.id === chatId) {
      utils_1.PixelStore.dispatch('selectedChat', this.chats[this.chatInArray.get(chatId)]);
    }
  };

  MessagesController.prototype.pingPong = function () {
    this.sockets.forEach(function (socket) {
      socket.sendMessage('', MessagesController.TYPES.PING);
    });
  };

  MessagesController.prototype.send = function (chatId, message) {
    var _a;

    (_a = this.sockets.get(chatId)) === null || _a === void 0 ? void 0 : _a.sendMessage(message);
  };

  MessagesController.prototype.clearSockets = function (usedChats) {
    var _this = this;

    this.sockets.forEach(function (socket, key) {
      if (!usedChats.has(key)) {
        socket.socket.close();

        _this.sockets.delete(key);
      }
    });
  };

  MessagesController.prototype.convertUsers = function (users) {
    var _this = this;

    if (users) {
      return users.map(function (user) {
        _this.users.set(user.id, user);

        return user;
      });
    }

    return [];
  };

  MessagesController.TYPES = {
    PING: 'ping'
  };
  return MessagesController;
}();

exports.messagesController = new MessagesController();
},{"../api":"../src/api/index.ts","../utils":"../src/utils/index.ts"}],"../src/controllers/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messagesController = exports.AuthController = exports.ChatController = exports.CookieAuthController = void 0;

var cookie_auth_controller_1 = require("./cookie-auth.controller");

Object.defineProperty(exports, "CookieAuthController", {
  enumerable: true,
  get: function get() {
    return cookie_auth_controller_1.CookieAuthController;
  }
});

var chat_controller_1 = require("./chat.controller");

Object.defineProperty(exports, "ChatController", {
  enumerable: true,
  get: function get() {
    return chat_controller_1.ChatController;
  }
});

var auth_controller_1 = require("./auth.controller");

Object.defineProperty(exports, "AuthController", {
  enumerable: true,
  get: function get() {
    return auth_controller_1.AuthController;
  }
});

var messages_controller_1 = require("./messages.controller");

Object.defineProperty(exports, "messagesController", {
  enumerable: true,
  get: function get() {
    return messages_controller_1.messagesController;
  }
});
},{"./cookie-auth.controller":"../src/controllers/cookie-auth.controller.ts","./chat.controller":"../src/controllers/chat.controller.ts","./auth.controller":"../src/controllers/auth.controller.ts","./messages.controller":"../src/controllers/messages.controller.ts"}],"../src/modules/Messanger/Header/Menu/CreateModal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateModal = void 0;

var components_1 = require("../../../../components");

var controllers_1 = require("../../../../controllers");

var chatController = new controllers_1.ChatController();

function CreateModal() {
  return {
    state: {
      title: '',
      error: ''
    },
    components: {
      Input: components_1.Input,
      Button: components_1.Button
    },
    methods: {
      close: function close(event) {
        event.preventDefault();
        this.props.closeModal();
      },
      chatInputHandler: function chatInputHandler(event) {
        var _a = event.target,
            name = _a.name,
            value = _a.value;
        this.state[name] = value;
      },
      createChatSubmitForm: function createChatSubmitForm(event) {
        event.preventDefault();
        chatController.createChat(this.state);
        this.componentProps.modalClose();
      },
      handleEsc: function handleEsc(event) {
        if (event.key === 'Escape') {
          this.componentProps.modalClose();
        }
      }
    },
    componentDidMount: function componentDidMount() {
      this.methods.handleEsc = this.methods.handleEsc.bind(this);
      window.addEventListener('keydown', this.methods.handleEsc);
    },
    componentWillUnmount: function componentWillUnmount() {
      window.removeEventListener('keydown', this.methods.handleEsc);
    },
    template: "\n    " + components_1.Modal("\n      <form class=\"create-chat__form\" id=\"id-create-chat\">\n        <Input \n          label=\"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0447\u0430\u0442\u0430\"\n          name=\"title\" \n          type=\"text\" \n          id=\"create_chat_title\" \n          b:onChange=\"methods.chatInputHandler\" \n          b:error=\"state.error\"\n          b:value=\"state.title\" />\n\n        <footer class=\"modal-window__footer\">\n          <Button \n            text=\"\u041E\u041A\" \n            class=\"button_accent button_accent-short\" \n            type=\"button\" \n            b:onClick=\"methods.createChatSubmitForm\" \n            form=\"id-create-chat\"/>\n        </footer>\n      </form>\n    ").template + "\n    "
  };
}

exports.CreateModal = CreateModal;
},{"../../../../components":"../src/components/index.ts","../../../../controllers":"../src/controllers/index.ts"}],"../src/modules/Messanger/Header/Menu/Profile/ProfileRow.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileRow = void 0;

function ProfileRow() {
  return {
    template: "\n      <div class=\"profile-row\">\n        <span p:class=\"profile-row__title profile-row__title_{{props.titleClass}}\">{{props.title}}</span>\n        <div class=\"profile-row__value\">{{props.value}}</div>\n      </div>\n    "
  };
}

exports.ProfileRow = ProfileRow;
},{}],"../src/modules/Messanger/Header/Menu/Profile/ProfileInfo.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileInfo = void 0;

var ProfileRow_1 = require("./ProfileRow");

var components_1 = require("../../../../../components");

function ProfileInfo() {
  return {
    components: {
      ProfileRow: ProfileRow_1.ProfileRow,
      UserPhoto: components_1.UserPhoto
    },
    template: "\n    <div class=\"profile__body\">\n      <div class=\"profile__info-title\">\n        <UserPhoto b:photo=\"props.user.avatar\" containerClass=\"profile__avatar-container\" />\n        <div class=\"profile__user-container\">\n          <div class=\"profile__user-title\">\n            <span>{{props.user.first_name}}</span>  \n            <span>{{props.user.second_name}}</span>\n          </div>\n          <ProfileRow title=\"\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0435 \u0438\u043C\u044F\" b:value=\"props.user.display_name\" titleClass=\"low\" />\n        </div>\n      </div>\n      <ProfileRow title=\"\u041F\u043E\u0447\u0442\u0430\" b:value=\"props.user.email\" />\n      <ProfileRow title=\"\u041B\u043E\u0433\u0438\u043D\" b:value=\"props.user.login\" />\n      <ProfileRow title=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" b:value=\"props.user.phone\" />\n    </div>\n    }\n  "
  };
}

exports.ProfileInfo = ProfileInfo;
},{"./ProfileRow":"../src/modules/Messanger/Header/Menu/Profile/ProfileRow.ts","../../../../../components":"../src/components/index.ts"}],"../src/modules/Messanger/Header/Menu/Profile/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELD_TYPE_FULL = exports.FIELD_TYPE = void 0;
exports.FIELD_TYPE = {
  login: 'text',
  email: 'email',
  first_name: 'text',
  second_name: 'text',
  display_name: 'text',
  phone: 'tel'
};
exports.FIELD_TYPE_FULL = {
  login: 'text',
  email: 'email',
  first_name: 'text',
  second_name: 'text',
  display_name: 'text',
  phone: 'tel',
  oldPassword: 'password',
  newPassword: 'password',
  passwordRepeat: {
    compare: 'newPassword',
    type: 'password',
    field: 'passwordRepeat'
  }
};
},{}],"../src/modules/Messanger/Header/Menu/Profile/profile-edit.controller.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileEditController = void 0;

var utils_1 = require("../../../../../utils");

var const_1 = require("./const");

var api_1 = require("../../../../../api");

var validConfig = {
  form: 'formFields',
  errors: 'errors'
};
var ERRORS;

(function (ERRORS) {
  ERRORS["NV"] = "Form is not valid";
})(ERRORS || (ERRORS = {}));

var ProfileEditController = function () {
  function ProfileEditController() {
    var _this = this;

    this.update = function (comp) {
      return __awaiter(_this, void 0, void 0, function () {
        var state, type, isValid, newData, _a, oldPassword, newPassword, error_1;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 4,, 5]);

              state = comp.state;
              type = state.isPasswordEdit ? const_1.FIELD_TYPE_FULL : const_1.FIELD_TYPE;
              isValid = utils_1.FormValidator.validate(state, validConfig, type);

              if (!isValid) {
                throw Error(ERRORS.NV);
              }

              return [4, api_1.userAPI.changeProfile(state.formFields)];

            case 1:
              newData = _b.sent();
              utils_1.PixelStore.setUserData(__assign({}, newData));
              utils_1.PixelStore.dispatch('currentUser', __assign({}, newData));
              if (!state.isPasswordEdit) return [3, 3];
              _a = state.formFields, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
              return [4, api_1.userAPI.changePassword({
                oldPassword: oldPassword,
                newPassword: newPassword
              })];

            case 2:
              _b.sent();

              _b.label = 3;

            case 3:
              comp.componentProps.onClose();
              return [3, 5];

            case 4:
              error_1 = _b.sent();
              console.log(error_1);
              return [3, 5];

            case 5:
              return [2];
          }
        });
      });
    };

    this.updateAvatar = function (event, component) {
      return __awaiter(_this, void 0, void 0, function () {
        var newForm, user;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              newForm = new FormData();
              newForm.append('avatar', event.target.files[0]);
              return [4, api_1.userAPI.changeAvatar(newForm)];

            case 1:
              user = _a.sent();
              utils_1.PixelStore.dispatch('currentUser', user);
              component.state.formFields.avatar = user.avatar;
              return [2];
          }
        });
      });
    };
  }

  return ProfileEditController;
}();

exports.ProfileEditController = ProfileEditController;
},{"../../../../../utils":"../src/utils/index.ts","./const":"../src/modules/Messanger/Header/Menu/Profile/const.ts","../../../../../api":"../src/api/index.ts"}],"../src/modules/Messanger/Header/Menu/Profile/ProfileEdit.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileEdit = void 0;

var utils_1 = require("../../../../../utils");

var components_1 = require("../../../../../components");

var const_1 = require("./const");

var profile_edit_controller_1 = require("./profile-edit.controller");

var validConfig = {
  form: 'formFields',
  errors: 'errors'
};
var profileEditController = new profile_edit_controller_1.ProfileEditController();

function ProfileEdit() {
  var profileForm = 'id-profile_form';
  return {
    state: {
      isPasswordEdit: false,
      formFields: {
        avatar: '',
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
        passwordRepeat: ''
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
        passwordRepeat: ''
      }
    },
    methods: {
      formFocusHandler: function formFocusHandler() {
        var type = this.state.isPasswordEdit ? const_1.FIELD_TYPE_FULL : const_1.FIELD_TYPE;
        utils_1.FormValidator.validate(this.state, validConfig, type);
      },
      formBlurHandler: function formBlurHandler() {
        var type = this.state.isPasswordEdit ? const_1.FIELD_TYPE_FULL : const_1.FIELD_TYPE;
        utils_1.FormValidator.validate(this.state, validConfig, type);
      },
      submitForm: function submitForm(event) {
        event.preventDefault();
        profileEditController.update(this);
      },
      inputHandler: function inputHandler(event) {
        var _a = event.target,
            name = _a.name,
            value = _a.value;
        this.state.formFields[name] = value;
      },
      changePassword: function changePassword(event) {
        event.preventDefault();
        this.state.isPasswordEdit = !this.state.isPasswordEdit;
      },
      handlePhotoChange: function handlePhotoChange(event) {
        event.preventDefault();
        profileEditController.updateAvatar(event, this);
      }
    },
    components: {
      Input: components_1.Input,
      Button: components_1.Button,
      UserPhoto: components_1.UserPhoto
    },
    componentDidMount: function componentDidMount() {
      var user = this.componentProps.user;

      for (var key in user) {
        if (key in this.state.formFields) {
          this.state.formFields[key] = user[key];
        }
      }
    },
    template: "\n      <form \n        class=\"profile-form\" \n        e:submit=\"methods.submitForm\" \n        e:focus=\"methods.formFocusHandler\" \n        e:blur=\"methods.formBlurHandler\" \n        id=\"" + profileForm + "\" >\n\n        <div class=\"profile-form__body\">\n          <div class=\"profile-form__row\">\n            <UserPhoto \n              b:photo=\"state.formFields.avatar\" \n              containerClass=\"profile__avatar-container profile__avatar-container_edit\" \n              inputId=\"profile_change_photo\"\n              b:onChange=\"methods.handlePhotoChange\"\n            />\n\n            <div class=\"profile-form__column\">\n              <div class=\"profile-form__row\">\n                <Input \n                  label=\"\u0418\u043C\u044F\" \n                  name=\"first_name\" \n                  type=\"text\" \n                  id=\"profile_firstName\" \n                  b:value=\"state.formFields.first_name\"\n                  loginClass=\"login--shadow\"\n                  b:error=\"state.errors.first_name\"\n                  b:onChange=\"methods.inputHandler\"\n                />\n\n                <Input \n                  label=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" \n                  name=\"second_name\" \n                  type=\"text\" \n                  id=\"profile_secondName\" \n                  b:value=\"state.formFields.second_name\"\n                  loginClass=\"login--shadow\"\n                  b:error=\"state.errors.second_name\"\n                  b:onChange=\"methods.inputHandler\"\n                />\n              </div>\n\n              <Input \n                label=\"\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0435 \u0438\u043C\u044F\" \n                name=\"display_name\" \n                type=\"text\" \n                id=\"profile_display_name\" \n                b:value=\"state.formFields.display_name\"\n                loginClass=\"login--shadow\"\n                b:error=\"state.errors.display_name\"\n                b:onChange=\"methods.inputHandler\"\n              />\n            </div>\n            \n          </div>\n\n          <div class=\"profile-form__row\">\n            <Input \n              label=\"\u041F\u043E\u0447\u0442\u0430\" \n              name=\"email\" \n              type=\"email\" \n              id=\"profile_mail\" \n              b:value=\"state.formFields.email\"\n              loginClass=\"login--shadow\"\n              b:error=\"state.errors.email\"\n              b:onChange=\"methods.inputHandler\"\n            />\n\n            <Input \n              label=\"\u041B\u043E\u0433\u0438\u043D\" \n              name=\"login\" \n              type=\"text\" \n              id=\"profile_login\" \n              b:value=\"state.formFields.login\"\n              loginClass=\"login--shadow\"\n              b:error=\"state.errors.login\"\n              b:onChange=\"methods.inputHandler\"\n            />\n          </div>\n\n          <div class=\"profile-form__row profile-form__row_half-width\">\n            <Input \n              label=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" \n              name=\"phone\" \n              type=\"tel\" \n              id=\"profile_phoneNumber\" \n              b:value=\"state.formFields.phone\"\n              loginClass=\"login--shadow\"\n              b:error=\"state.errors.phone\"\n              b:onChange=\"methods.inputHandler\"\n            />\n          </div>\n        \n\n          <span class=\"button_text button_separator\" e:click=\"methods.changePassword\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</span>\n\n          <div if:truthy=\"state.isPasswordEdit\" class=\"profile-form__body\">\n            <div class=\"profile-form__row profile-form__row_half-width\">\n              <Input \n                label=\"\u041F\u0430\u0440\u043E\u043B\u044C\" \n                name=\"oldPassword\" \n                type=\"password\" \n                id=\"profile_current_password\" \n                b:value=\"state.formFields.oldPassword\"\n                b:error=\"state.errors.oldPassword\"\n                b:onChange=\"methods.inputHandler\"\n              />\n            </div>\n            \n            <div class=\"profile-form__row\">\n              <Input \n                label=\"\u041D\u043E\u0432\u044B\u0439 \u041F\u0430\u0440\u043E\u043B\u044C\" \n                name=\"newPassword\" \n                type=\"password\" \n                id=\"profile_next_password\" \n                b:value=\"state.formFields.newPassword\"\n                b:error=\"state.errors.newPassword\"\n                b:onChange=\"methods.inputHandler\"\n              />\n\n              <Input \n                label=\"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C\" \n                name=\"passwordRepeat\" \n                type=\"password\" \n                id=\"profile_repeat_password\" \n                b:value=\"state.formFields.passwordRepeat\"\n                b:error=\"state.errors.passwordRepeat\"\n                b:onChange=\"methods.inputHandler\"\n              />\n            </div>\n          </div>\n        </div>\n\n        <footer class=\"auth-form__footer\">\n          <Button \n            text=\"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\" \n            class=\"button_accent\" \n            type=\"submit\" \n            form=\"" + profileForm + "\"\n            b:onClick=\"methods.submitForm\" \n          />\n        </footer>\n      </form>\n    "
  };
}

exports.ProfileEdit = ProfileEdit;
},{"../../../../../utils":"../src/utils/index.ts","../../../../../components":"../src/components/index.ts","./const":"../src/modules/Messanger/Header/Menu/Profile/const.ts","./profile-edit.controller":"../src/modules/Messanger/Header/Menu/Profile/profile-edit.controller.ts"}],"assets/images/Icon/EditBtn.svg":[function(require,module,exports) {
module.exports = "/EditBtn.69c882c8.svg";
},{}],"assets/images/Icon/stopEdit.svg":[function(require,module,exports) {
module.exports = "/stopEdit.d0ce0f45.svg";
},{}],"../src/modules/Messanger/Header/Menu/Profile/Profile.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/Messanger/Header/Menu/Profile/Profile.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;

var components_1 = require("../../../../../components");

var ProfileInfo_1 = require("./ProfileInfo");

var ProfileEdit_1 = require("./ProfileEdit");

var EditBtn_svg_1 = __importDefault(require("../../../../../../static/assets/images/Icon/EditBtn.svg"));

var stopEdit_svg_1 = __importDefault(require("../../../../../../static/assets/images/Icon/stopEdit.svg"));

require("./Profile.css");

function Profile() {
  return {
    state: {
      isEditable: false,
      currentUser: {}
    },
    components: {
      UserPhoto: components_1.UserPhoto,
      Button: components_1.Button,
      ProfileInfo: ProfileInfo_1.ProfileInfo,
      ProfileEdit: ProfileEdit_1.ProfileEdit
    },
    methods: {
      editHander: function editHander() {
        this.state.isEditable = !this.state.isEditable;
      },
      handleEsc: function handleEsc(event) {
        if (event.key === 'Escape') {
          this.componentProps.modalClose();
        }
      }
    },
    componentDidMount: function componentDidMount() {
      this.methods.handleEsc = this.methods.handleEsc.bind(this);
      window.addEventListener('keydown', this.methods.handleEsc);
    },
    componentWillUnmount: function componentWillUnmount() {
      window.removeEventListener('keydown', this.methods.handleEsc);
    },
    pixelStore: ['currentUser'],
    template: "\n    " + components_1.Modal("\n          <ProfileInfo if:falsy=\"state.isEditable\"  b:user=\"state.currentUser\" />\n          <ProfileEdit if:truthy=\"state.isEditable\" b:user=\"state.currentUser\" b:onClose=\"methods.editHander\" />\n    ", '', '', "\n        <img if:falsy=\"state.isEditable\" class=\"modal-window__close\" src=\"" + EditBtn_svg_1.default + "\" e:click=\"methods.editHander\" />\n        <img if:truthy=\"state.isEditable\" class=\"modal-window__close\" src=\"" + stopEdit_svg_1.default + "\" e:click=\"methods.editHander\" />\n        \n        ").template + "\n    "
  };
}

exports.Profile = Profile;
},{"../../../../../components":"../src/components/index.ts","./ProfileInfo":"../src/modules/Messanger/Header/Menu/Profile/ProfileInfo.ts","./ProfileEdit":"../src/modules/Messanger/Header/Menu/Profile/ProfileEdit.ts","../../../../../../static/assets/images/Icon/EditBtn.svg":"assets/images/Icon/EditBtn.svg","../../../../../../static/assets/images/Icon/stopEdit.svg":"assets/images/Icon/stopEdit.svg","./Profile.css":"../src/modules/Messanger/Header/Menu/Profile/Profile.css"}],"../src/modules/Messanger/Header/Menu/Profile/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;

var Profile_1 = require("./Profile");

Object.defineProperty(exports, "Profile", {
  enumerable: true,
  get: function get() {
    return Profile_1.Profile;
  }
});
},{"./Profile":"../src/modules/Messanger/Header/Menu/Profile/Profile.ts"}],"../src/modules/Messanger/Header/Menu/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateModal = exports.Menu = void 0;

var Menu_1 = require("./Menu");

Object.defineProperty(exports, "Menu", {
  enumerable: true,
  get: function get() {
    return Menu_1.Menu;
  }
});

var CreateModal_1 = require("./CreateModal");

Object.defineProperty(exports, "CreateModal", {
  enumerable: true,
  get: function get() {
    return CreateModal_1.CreateModal;
  }
});

__exportStar(require("./Profile"), exports);
},{"./Menu":"../src/modules/Messanger/Header/Menu/Menu.ts","./CreateModal":"../src/modules/Messanger/Header/Menu/CreateModal.ts","./Profile":"../src/modules/Messanger/Header/Menu/Profile/index.ts"}],"../src/modules/Messanger/Header/ChatConfig/UserBadge.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/Messanger/Header/ChatConfig/UserBadge.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserBadge = void 0;

var close_svg_1 = __importDefault(require("../../../../../static/assets/images/Icon/close.svg"));

require("./UserBadge.css");

function UserBadge() {
  return {
    methods: {
      actionClick: function actionClick() {
        var id = this.componentProps.id;
        this.componentProps.onClick(id);
      }
    },
    template: "\n      <div class=\"user-badge__container\">\n        <img if:falsy=\"props.role === admin\" class=\"modal-window__close\" src=\"" + close_svg_1.default + "\" e:click=\"methods.actionClick\"/>\n        <div class=\"user-badge__title\">{{props.login}}</div>\n      </div>\n    "
  };
}

exports.UserBadge = UserBadge;
},{"../../../../../static/assets/images/Icon/close.svg":"assets/images/Icon/close.svg","./UserBadge.css":"../src/modules/Messanger/Header/ChatConfig/UserBadge.css"}],"../src/modules/Messanger/Header/ChatConfig/Participants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Participants = void 0;

var UserBadge_1 = require("./UserBadge");

function Participants() {
  return {
    components: {
      UserBadge: UserBadge_1.UserBadge
    },
    template: "\n      <div class=\"chat-config__participants\">\n        <UserBadge map:array=\"props.chatUsers\" b:onClick=\"props.removeUser\" />\n      </div>\n    "
  };
}

exports.Participants = Participants;
},{"./UserBadge":"../src/modules/Messanger/Header/ChatConfig/UserBadge.ts"}],"../src/modules/Messanger/Header/ChatConfig/chat-config.controller.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatConfigController = void 0;

var api_1 = require("../../../../api");

var controllers_1 = require("../../../../controllers");

var utils_1 = require("../../../../utils");

var chatController = new controllers_1.ChatController();

var ChatConfigController = function () {
  function ChatConfigController() {
    var _this = this;

    this.removeChat = function (component) {
      return __awaiter(_this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              id = component.componentProps.chat.id;
              return [4, api_1.chatAPI.delete({
                chatId: id
              })];

            case 1:
              _a.sent();

              return [4, chatController.getChats()];

            case 2:
              _a.sent();

              component.componentProps.modalClose();
              utils_1.PixelStore.dispatch('selectedChat', {});
              return [2];
          }
        });
      });
    };

    this.removeUser = function (userId, component) {
      var id = component.componentProps.chat.id;
      var chatUsers = component.state.chatUsers;
      api_1.chatAPI.deleteUser({
        users: [userId],
        chatId: id
      });
      component.state.chatUsers = chatUsers.filter(function (user) {
        return user.id !== userId;
      });
    };

    this.addUser = function (title, component) {
      return __awaiter(_this, void 0, void 0, function () {
        var id, users;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              id = component.componentProps.chat.id;
              return [4, api_1.chatAPI.addUser({
                users: [Number(title)],
                chatId: id
              })];

            case 1:
              _a.sent();

              return [4, api_1.chatAPI.getUsers(id)];

            case 2:
              users = _a.sent();
              component.state.chatUsers = users;
              component.state.title = '';
              return [2];
          }
        });
      });
    };

    this.updateAvatar = function (event, chatId) {
      return __awaiter(_this, void 0, void 0, function () {
        var newForm, chat;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              newForm = new FormData();
              newForm.append('avatar', event.target.files[0]);
              newForm.append('chatId', chatId);
              return [4, api_1.chatAPI.uploadAvatar(newForm)];

            case 1:
              chat = _a.sent();
              utils_1.PixelStore.dispatch('selectedChat', chat);
              return [2];
          }
        });
      });
    };
  }

  return ChatConfigController;
}();

exports.chatConfigController = new ChatConfigController();
},{"../../../../api":"../src/api/index.ts","../../../../controllers":"../src/controllers/index.ts","../../../../utils":"../src/utils/index.ts"}],"../src/modules/Messanger/Header/ChatConfig/ChatConfig.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/Messanger/Header/ChatConfig/Config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var components_1 = require("../../../../components");

var Participants_1 = require("./Participants");

var chat_config_controller_1 = require("./chat-config.controller");

require("./ChatConfig.css");

function Config() {
  return {
    state: {
      chatUsers: [],
      title: ''
    },
    methods: {
      changeTitle: function changeTitle(event) {
        var value = (event === null || event === void 0 ? void 0 : event.target).value;
        this.state.title = value;
      },
      addUser: function addUser(event) {
        event.preventDefault();
        chat_config_controller_1.chatConfigController.addUser(this.state.title, this);
      },
      removeUser: function removeUser(id) {
        chat_config_controller_1.chatConfigController.removeUser(id, this);
      },
      handlePhotoChange: function handlePhotoChange(event) {
        event.preventDefault();
        chat_config_controller_1.chatConfigController.updateAvatar(event, this.componentProps.chat.id);
      }
    },
    componentDidMount: function componentDidMount() {
      this.state.chatUsers = this.componentProps.chat.users;
    },
    components: {
      EditInput: components_1.EditInput,
      Participants: Participants_1.Participants
    },
    template: "\n      <div class=\"chat-config\">\n        <div class=\"chat-config__info-title\">\n          <div class=\"chat-config__title\">{{props.chat.title}}</div>\n          <UserPhoto \n            b:photo=\"props.chat.avatar\" \n            inputId=\"chat_change_photo\"\n            containerClass=\"chat__avatar-container profile__avatar-container_edit\" \n            b:onChange=\"methods.handlePhotoChange\" />\n        </div>\n        <div class=\"participants__container\">\n          <Participants b:chatUsers=\"state.chatUsers\" b:removeUser=\"methods.removeUser\"/>\n\n          <EditInput \n            buttonText=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430\" \n            name=\"title\"\n            id=\"add_user_id\"\n            b:value=\"state.title\" \n            b:onClick=\"methods.addUser\" \n            b:onChange=\"methods.changeTitle\"\n            b:isChanged=\"state.title\"\n          />\n        </div>\n      </div>\n    "
  };
}

exports.Config = Config;
},{"../../../../components":"../src/components/index.ts","./Participants":"../src/modules/Messanger/Header/ChatConfig/Participants.ts","./chat-config.controller":"../src/modules/Messanger/Header/ChatConfig/chat-config.controller.ts","./ChatConfig.css":"../src/modules/Messanger/Header/ChatConfig/ChatConfig.css"}],"assets/images/Icon/options.svg":[function(require,module,exports) {
module.exports = "/options.ff872095.svg";
},{}],"assets/images/Icon/Delete.svg":[function(require,module,exports) {
module.exports = "/Delete.a580d0fd.svg";
},{}],"../src/modules/Messanger/Header/ChatConfig/ChatConfig.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatConfig = void 0;

var components_1 = require("../../../../components");

var Config_1 = require("./Config");

var chat_config_controller_1 = require("./chat-config.controller");

var options_svg_1 = __importDefault(require("../../../../../static/assets/images/Icon/options.svg"));

var Delete_svg_1 = __importDefault(require("../../../../../static/assets/images/Icon/Delete.svg"));

function ChatConfig() {
  return {
    components: {
      Modal: components_1.Modal,
      Config: Config_1.Config
    },
    methods: {
      handleEsc: function handleEsc(event) {
        if (event.key === 'Escape') {
          this.componentProps.modalClose();
        }
      },
      deleteChat: function deleteChat() {
        chat_config_controller_1.chatConfigController.removeChat(this);
      }
    },
    componentDidMount: function componentDidMount() {
      this.methods.handleEsc = this.methods.handleEsc.bind(this);
      window.addEventListener('keydown', this.methods.handleEsc);
    },
    componentWillUnmount: function componentWillUnmount() {
      window.removeEventListener('keydown', this.methods.handleEsc);
    },
    template: "\n    <div class=\"header-title__chat-config\">\n      <img \n        class=\"header-title__options\" \n        src=\"" + options_svg_1.default + "\" \n        e:click=\"props.openChatConfig\" \n      />\n      <div if:truthy=\"props.isChatActionsOpen\">\n        " + components_1.Modal("\n            <Config \n              b:chat=\"props.chat\"\n            />\n        ", '', '', "\n        <img \n          class=\"header-title__options\" \n          src=\"" + Delete_svg_1.default + "\" \n          e:click=\"methods.deleteChat\" \n        />\n        ").template + "\n      </div>\n    </div>\n    "
  };
}

exports.ChatConfig = ChatConfig;
},{"../../../../components":"../src/components/index.ts","./Config":"../src/modules/Messanger/Header/ChatConfig/Config.ts","./chat-config.controller":"../src/modules/Messanger/Header/ChatConfig/chat-config.controller.ts","../../../../../static/assets/images/Icon/options.svg":"assets/images/Icon/options.svg","../../../../../static/assets/images/Icon/Delete.svg":"assets/images/Icon/Delete.svg"}],"../src/modules/Messanger/Header/ChatConfig/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatConfig = void 0;

var ChatConfig_1 = require("./ChatConfig");

Object.defineProperty(exports, "ChatConfig", {
  enumerable: true,
  get: function get() {
    return ChatConfig_1.ChatConfig;
  }
});
},{"./ChatConfig":"../src/modules/Messanger/Header/ChatConfig/ChatConfig.ts"}],"../src/modules/Messanger/Header/Header.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/Messanger/Header/Header.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var maskGroup_svg_1 = __importDefault(require("../../../../static/assets/images/Icon/maskGroup.svg"));

var Menu_1 = require("./Menu");

var ChatConfig_1 = require("./ChatConfig");

var controllers_1 = require("../../../controllers");

var const_1 = require("../const");

require("./Header.css");

var authController = new controllers_1.AuthController();

function Header() {
  return {
    components: {
      Menu: Menu_1.Menu,
      CreateModal: Menu_1.CreateModal,
      Profile: Menu_1.Profile,
      ChatConfig: ChatConfig_1.ChatConfig
    },
    state: {
      isMenu: false,
      isChatCreate: false,
      isProfileOpen: false,
      isChatActionsOpen: false,
      selectedChat: {}
    },
    methods: {
      settingClickHandler: function settingClickHandler() {
        this.state.isMenu = !this.state.isMenu;
      },
      closeCreateModal: function closeCreateModal() {
        this.state.isChatCreate = false;
      },
      closeProfileModal: function closeProfileModal() {
        this.state.isProfileOpen = false;
      },
      optionClick: function optionClick(event) {
        var name = event.target.dataset.name;

        switch (name) {
          case const_1.SETTING_OPTIONS.PROFILE:
            this.state.isProfileOpen = true;
            break;

          case const_1.SETTING_OPTIONS.CREATE_CHAT:
            this.state.isChatCreate = true;
            break;

          case const_1.SETTING_OPTIONS.LOGOUT:
            authController.logout();
            break;

          default:
        }
      },
      openChatConfig: function openChatConfig() {
        this.state.isChatActionsOpen = !this.state.isChatActionsOpen;
      },
      closeConfigModal: function closeConfigModal() {
        this.state.isChatActionsOpen = false;
      }
    },
    pixelStore: ['selectedChat'],
    template: "\n      <header class=\"messanger__header\">\n        <section class=\"messanger__header-title\">\n          <h2 class=\"header-title__logo\">Pixel Chat</h2>\n          <img class=\"header-title__settings\" src=\"" + maskGroup_svg_1.default + "\" e:click=\"methods.settingClickHandler\"/>\n          <Menu if:truthy=\"state.isMenu\" b:optionClick=\"methods.optionClick\"/>     \n        </section>\n        \n        <div class=\"messanger__chat-info\">\n          <div class=\"chat-info__container\">\n            <h2 class=\"chat-info__title\">{{state.selectedChat.title}}</h2>\n            <ChatConfig \n              if:truthy=\"state.selectedChat.id\" \n              headerText=\"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0447\u0430\u0442\u0430\"\n              b:isChatActionsOpen=\"state.isChatActionsOpen\"\n              b:modalClose=\"methods.closeConfigModal\"\n              b:openChatConfig=\"methods.openChatConfig\"\n              b:chat=\"state.selectedChat\"\n            />\n          </div>\n        </div>\n      </header>\n\n      <Profile \n        if:truthy=\"state.isProfileOpen\" \n        b:modalClose=\"methods.closeProfileModal\" \n        headerText=\"\u041F\u0440\u043E\u0444\u0438\u043B\u044C\"\n      />\n\n      <CreateModal \n        if:truthy=\"state.isChatCreate\" \n        b:modalClose=\"methods.closeCreateModal\" \n        headerText=\"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u0447\u0430\u0442\u0430\"\n      />\n\n      \n    "
  };
}

exports.Header = Header;
},{"../../../../static/assets/images/Icon/maskGroup.svg":"assets/images/Icon/maskGroup.svg","./Menu":"../src/modules/Messanger/Header/Menu/index.ts","./ChatConfig":"../src/modules/Messanger/Header/ChatConfig/index.ts","../../../controllers":"../src/controllers/index.ts","../const":"../src/modules/Messanger/const.ts","./Header.css":"../src/modules/Messanger/Header/Header.css"}],"../src/modules/Messanger/Header/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var Header_1 = require("./Header");

Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return Header_1.Header;
  }
});
},{"./Header":"../src/modules/Messanger/Header/Header.ts"}],"assets/images/Icon/badge.png":[function(require,module,exports) {
module.exports = "/badge.d179dd85.png";
},{}],"../src/modules/Messanger/ChatList/ListItem.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = void 0;

var components_1 = require("../../../components");

var badge_png_1 = __importDefault(require("../../../../static/assets/images/Icon/badge.png"));

function ListItem() {
  return {
    state: {
      isAuthor: false
    },
    components: {
      UserPhoto: components_1.UserPhoto
    },
    methods: {
      setChat: function setChat() {
        var _a = this.componentProps,
            setActiveChat = _a.setActiveChat,
            id = _a.id;
        setActiveChat(id);
      }
    },
    template: "\n      <li class=\"chat-list__item list-item\" e:click=\"methods.setChat\">\n        <div class=\"list-item__photo user-avatar\">\n          <UserPhoto b:photo=\"props.avatar\"/>\n        </div>\n        <div class=\"list-item__text\">\n          <h3 class=\"list-item__title\">{{props.title}}</h3>\n          <p class=\"list-item__message\" if:truthy=\"props.lastMessage\" >{{props.lastMessage.content}}</p>\n          <p class=\"list-item__message\" if:falsy=\"props.lastMessage\">\u041D\u0435\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439</p>\n        </div>\n        <div class=\"list-item__info\">\n          <h4 class=\"list-item__time\">{{props.lastMessage.time}}</h4>\n          <div class=\"list-item__budge message-budge\" if:truthy=\"props.unread_count\">\n            <img class=\"message-budge__icon\" src=\"" + badge_png_1.default + "\" />\n            <span class=\"message-budge__count\">{{props.unread_count}}</span>\n          </div>\n        </div>\n      </li>\n    "
  };
}

exports.ListItem = ListItem;
},{"../../../components":"../src/components/index.ts","../../../../static/assets/images/Icon/badge.png":"assets/images/Icon/badge.png"}],"../src/modules/Messanger/ChatList/List.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var ListItem_1 = require("./ListItem");

function List() {
  return {
    components: {
      ListItem: ListItem_1.ListItem
    },
    template: " \n    <div>\n    \n      <ul class=\"chat-list__list\" if:truthy=\"props.filteredChats\">\n        <ListItem map:array=\"props.filteredChats\" b:setActiveChat=\"props.setActiveChat\"/> \n      </ul>\n      \n      <p class=\"chat-list__list_blank\" if:falsy=\"props.filteredChats\">\n        <i>\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0447\u0430\u0442\u043E\u0432</i>\n      </p>\n      \n    </div>\n    "
  };
}

exports.List = List;
},{"./ListItem":"../src/modules/Messanger/ChatList/ListItem.ts"}],"../src/modules/Messanger/ChatList/chat-list.controller.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatListController = void 0;

var api_1 = require("../../../api");

var utils_1 = require("../../../utils");

var ChatListController = function () {
  function ChatListController() {
    var _this = this;

    this.createChat = function (title) {
      return __awaiter(_this, void 0, void 0, function () {
        var id, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4, api_1.chatAPI.create({
                title: title
              })];

            case 1:
              id = _a.sent().id;
              console.warn(id);
              return [3, 3];

            case 2:
              error_1 = _a.sent();
              console.error(error_1);
              return [3, 3];

            case 3:
              return [2];
          }
        });
      });
    };

    this.deleteChat = function (chatId) {
      return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4, api_1.chatAPI.delete({
                chatId: chatId
              })];

            case 1:
              _a.sent();

              return [3, 3];

            case 2:
              error_2 = _a.sent();
              console.error(error_2);
              return [3, 3];

            case 3:
              return [2];
          }
        });
      });
    };

    this.selectChat = function (chatId) {
      if (!utils_1.PixelStore.store.selectedChat || utils_1.PixelStore.store.selectedChat.id !== chatId) {
        utils_1.PixelStore.dispatch('selectedChat', utils_1.PixelStore.store.chats.find(function (chat) {
          return chat.id === chatId;
        }));
      }
    };
  }

  return ChatListController;
}();

exports.ChatListController = ChatListController;
},{"../../../api":"../src/api/index.ts","../../../utils":"../src/utils/index.ts"}],"../src/modules/Messanger/ChatList/ChatList.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/Messanger/ChatList/ChatList.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatList = void 0;

var components_1 = require("../../../components");

var List_1 = require("./List");

var chat_list_controller_1 = require("./chat-list.controller");

require("./ChatList.css");

var controllers_1 = require("../../../controllers");

var chatController = new controllers_1.ChatController();
var chatListController = new chat_list_controller_1.ChatListController();

function ChatList() {
  return {
    components: {
      SearchInput: components_1.SearchInput,
      List: List_1.List
    },
    state: {
      searchValue: '',
      chats: [],
      filteredChats: []
    },
    componentDidMount: function componentDidMount() {
      chatController.getChats();
    },
    methods: {
      filterChatList: function filterChatList(event) {
        var value = event.target.value;
        this.state.searchValue = value;
      },
      setActiveChat: function setActiveChat(chatId) {
        chatListController.selectChat(chatId);
      }
    },
    componentDidUpdate: function componentDidUpdate(_, props) {
      if ('searchValue' in props) {
        var chats = this.state.chats;
        this.state.filteredChats = chats.filter(function (chat) {
          return chat.title.indexOf(props.searchValue) !== -1;
        });
      } else if (props.chats) {
        if (this.state.searchValue) {
          this.state.filteredChats = props.chats.filter(function (chat) {
            return chat.title.indexOf(props.searchValue) !== -1;
          });
        } else {
          this.state.filteredChats = props.chats;
        }
      }
    },
    pixelStore: ['chats'],
    template: " \n    <aside class=\"messanger__chat-list\" >\n      <form class=\"search-form\">\n        <SearchInput \n          name=\"search\" \n          class=\"search-form__contol\" \n          placeholder=\"\u041F\u043E\u0438\u0441\u043A\" \n          b:onChange=\"methods.filterChatList\" \n          b:value=\"state.searchValue\" />\n      </form>\n      <List b:filteredChats=\"state.filteredChats\" b:setActiveChat=\"methods.setActiveChat\"/>\n    </aside>\n    "
  };
}

exports.ChatList = ChatList;
},{"../../../components":"../src/components/index.ts","./List":"../src/modules/Messanger/ChatList/List.ts","./chat-list.controller":"../src/modules/Messanger/ChatList/chat-list.controller.ts","./ChatList.css":"../src/modules/Messanger/ChatList/ChatList.css","../../../controllers":"../src/controllers/index.ts"}],"../src/modules/Messanger/ChatList/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = exports.ChatList = void 0;

var ChatList_1 = require("./ChatList");

Object.defineProperty(exports, "ChatList", {
  enumerable: true,
  get: function get() {
    return ChatList_1.ChatList;
  }
});

var ListItem_1 = require("./ListItem");

Object.defineProperty(exports, "ListItem", {
  enumerable: true,
  get: function get() {
    return ListItem_1.ListItem;
  }
});
},{"./ChatList":"../src/modules/Messanger/ChatList/ChatList.ts","./ListItem":"../src/modules/Messanger/ChatList/ListItem.ts"}],"../src/modules/Messanger/Chat/Message.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/Messanger/Chat/Message.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

require("./Message.css");

function Message() {
  return {
    template: "\n    <article class=\"messages-area__message\">\n      <div class=\"user-avatar__container user-avatar__container_message\">\n      <UserPhoto \n        imgClass=\"user-avatar__img user-avatar__img_message\" b:photo=\"props.avatar\" />\n     \n      </div>\n      <div class=\"messages-area__content\">\n        <span class=\"content__author content__author_own\" >{{props.name}}</span>\n        <p class=\"content__message\">{{props.content}}</p>\n      </div>\n      <div class=\"messages-area__time\">{{props.time}}</div>\n    </article>\n    "
  };
}

exports.Message = Message;
},{"./Message.css":"../src/modules/Messanger/Chat/Message.css"}],"../src/modules/Messanger/Chat/MessageArea.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageArea = void 0;

function MessageArea() {
  return {
    componentDidMount: function componentDidMount() {
      this.componentProps.setScrollEl(this.domEl);
    },
    template: "\n    <div class=\"chat__messages-area\">\n      <Message if:truthy=\"props.chat.messages\" map:array=\"props.chat.messages\" />\n      <div if:falsy=\"props.chat.messages\" class=\"messanger__chat-blank\">\u041D\u0435\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439</div>\n    </div>\n    "
  };
}

exports.MessageArea = MessageArea;
},{}],"assets/images/Icon/clip1.png":[function(require,module,exports) {
module.exports = "/clip1.59a4789a.png";
},{}],"assets/images/Icon/alien.png":[function(require,module,exports) {
module.exports = "/alien.8d5200cd.png";
},{}],"assets/images/Icon/_emj14.png":[function(require,module,exports) {
module.exports = "/_emj14.956f8faa.png";
},{}],"assets/images/Icon/emoji3.png":[function(require,module,exports) {
module.exports = "/emoji3.e2d9232e.png";
},{}],"assets/images/Icon/shock.png":[function(require,module,exports) {
module.exports = "/shock.ba02bf17.png";
},{}],"../src/modules/Messanger/Chat/Chat.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/Messanger/Chat/Chat.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;

var components_1 = require("../../../components");

var Message_1 = require("./Message");

var MessageArea_1 = require("./MessageArea");

var clip1_png_1 = __importDefault(require("../../../../static/assets/images/Icon/clip1.png"));

var alien_png_1 = __importDefault(require("../../../../static/assets/images/Icon/alien.png"));

var _emj14_png_1 = __importDefault(require("../../../../static/assets/images/Icon/_emj14.png"));

var emoji3_png_1 = __importDefault(require("../../../../static/assets/images/Icon/emoji3.png"));

var shock_png_1 = __importDefault(require("../../../../static/assets/images/Icon/shock.png"));

require("./Chat.css");

var controllers_1 = require("../../../controllers");

function Chat() {
  return {
    state: {
      selectedChat: {},
      stickers: false,
      currentUser: null,
      scrollEl: null,
      message: ''
    },
    methods: {
      inputHandler: function inputHandler(event) {
        this.state.message = event.target.value;
      },
      setScrollEl: function setScrollEl(domEl) {
        this.state.scrollEl = domEl;
      },
      sendMessage: function sendMessage(event) {
        var _a = this.state,
            message = _a.message,
            selectedChat = _a.selectedChat;

        if (event) {
          event.preventDefault();
        }

        if (message.trim().length) {
          controllers_1.messagesController.send(selectedChat.id, message);
          this.state.message = '';
        }
      }
    },
    components: {
      Input: components_1.Input,
      Message: Message_1.Message,
      UserPhoto: components_1.UserPhoto,
      Button: components_1.Button,
      Textarea: components_1.Textarea,
      MessageArea: MessageArea_1.MessageArea
    },
    componentDidUpdate: function componentDidUpdate(_, props) {
      if (props.selectedChat) {
        this.state.scrollEl.scrollTop = this.state.scrollEl.scrollHeight;
      }
    },
    pixelStore: ['selectedChat', 'currentUser'],
    template: "\n    <main class=\"messanger__chat\">\n      <span if:falsy=\"state.selectedChat.id\" class=\"messanger__chat-blank\">\u0427\u0430\u0442 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D</span>\n      <div if:truthy=\"state.selectedChat.id\" class=\"chat__container\" >\n        <MessageArea b:chat=\"state.selectedChat\" b:setScrollEl=\"methods.setScrollEl\"/>\n\n        <div class=\"chat__input-area\">\n          <UserPhoto \n            containerClass=\"user-avatar__container_input\" \n            imgClass=\"user-avatar__img_input\" b:photo=\"state.currentUser.avatar\" />\n\n          <form class=\"chat__message-form\" e:submit=\"methods.sendMessage\">\n\n            <div class=\"message-form__textarea-wraper\">\n              <Textarea \n                placeholder=\"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\" \n                name=\"newMessage\" \n                b:value=\"state.message\"  \n                b:onChange=\"methods.inputHandler\"\n                b:onKeyDown=\"methods.sendMessage\"\n              />\n              <img src=\"" + clip1_png_1.default + "\" class=\"message-form__options\"/>\n            </div>\n\n            <div class=\"message-form__action-line\">\n              <div class=\"action-line__emoji-bar\" >\n                <img src=\"" + alien_png_1.default + "\" class=\"emoji\"/>\n                <img src=\"" + emoji3_png_1.default + "\" class=\"emoji\"/>\n                <img src=\"" + shock_png_1.default + "\" class=\"emoji\"/>\n                <img src=\"" + _emj14_png_1.default + "\" class=\"emoji\"/>\n              </div>\n\n              <Button \n                type=\"submit\" \n                text=\"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C\" \n                class=\"button_transparent button_transparent_send\" \n                b:onClick=\"methods.sendMessage\" \n              />\n            </div>\n            \n          </form>\n\n          <UserPhoto \n            containerClass=\"user-avatar__container_input\" \n            imgClass=\"user-avatar__img_input\" b:photo=\"state.selectedChat.avatar\" />\n        </div>\n      </div>\n    </main>\n    "
  };
}

exports.Chat = Chat;
},{"../../../components":"../src/components/index.ts","./Message":"../src/modules/Messanger/Chat/Message.ts","./MessageArea":"../src/modules/Messanger/Chat/MessageArea.ts","../../../../static/assets/images/Icon/clip1.png":"assets/images/Icon/clip1.png","../../../../static/assets/images/Icon/alien.png":"assets/images/Icon/alien.png","../../../../static/assets/images/Icon/_emj14.png":"assets/images/Icon/_emj14.png","../../../../static/assets/images/Icon/emoji3.png":"assets/images/Icon/emoji3.png","../../../../static/assets/images/Icon/shock.png":"assets/images/Icon/shock.png","./Chat.css":"../src/modules/Messanger/Chat/Chat.css","../../../controllers":"../src/controllers/index.ts"}],"../src/modules/Messanger/Chat/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = exports.Chat = void 0;

var Chat_1 = require("./Chat");

Object.defineProperty(exports, "Chat", {
  enumerable: true,
  get: function get() {
    return Chat_1.Chat;
  }
});

var Message_1 = require("./Message");

Object.defineProperty(exports, "Message", {
  enumerable: true,
  get: function get() {
    return Message_1.Message;
  }
});
},{"./Chat":"../src/modules/Messanger/Chat/Chat.ts","./Message":"../src/modules/Messanger/Chat/Message.ts"}],"../src/modules/Messanger/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = exports.ChatList = exports.Header = void 0;

var Header_1 = require("./Header");

Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return Header_1.Header;
  }
});

var ChatList_1 = require("./ChatList");

Object.defineProperty(exports, "ChatList", {
  enumerable: true,
  get: function get() {
    return ChatList_1.ChatList;
  }
});

var Chat_1 = require("./Chat");

Object.defineProperty(exports, "Chat", {
  enumerable: true,
  get: function get() {
    return Chat_1.Chat;
  }
});
},{"./Header":"../src/modules/Messanger/Header/index.ts","./ChatList":"../src/modules/Messanger/ChatList/index.ts","./Chat":"../src/modules/Messanger/Chat/index.ts"}],"../src/modules/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatList = exports.Header = exports.Chat = void 0;

var Messanger_1 = require("./Messanger");

Object.defineProperty(exports, "Chat", {
  enumerable: true,
  get: function get() {
    return Messanger_1.Chat;
  }
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return Messanger_1.Header;
  }
});
Object.defineProperty(exports, "ChatList", {
  enumerable: true,
  get: function get() {
    return Messanger_1.ChatList;
  }
});
},{"./Messanger":"../src/modules/Messanger/index.ts"}],"../src/pages/Messanger/Messanger.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/Messanger/Messanger.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var modules_1 = require("../../modules");

require("./Messanger.css");

function Messanger() {
  return {
    components: {
      Header: modules_1.Header,
      ChatList: modules_1.ChatList,
      Chat: modules_1.Chat
    },
    template: "\n    <div class=\"container\">\n      <div class=\"messanger\">\n        <Header />\n        <ChatList />\n        <Chat />\n      </div>\n    </div>\n    "
  };
}

exports.default = Messanger;
},{"../../modules":"../src/modules/index.ts","./Messanger.css":"../src/pages/Messanger/Messanger.css"}],"../src/pages/Messanger/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Messanger_1 = __importDefault(require("./Messanger"));

exports.default = Messanger_1.default;
},{"./Messanger":"../src/pages/Messanger/Messanger.ts"}],"../src/pages/Auth/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AUTH_ERRORS = exports.LOGIN_FIELD_TYPE = exports.FIELD_TYPE = void 0;
var LOGIN_FIELD_TYPE = {
  login: 'text',
  password: 'password'
};
exports.LOGIN_FIELD_TYPE = LOGIN_FIELD_TYPE;
var FIELD_TYPE = {
  login: 'text',
  password: 'password',
  email: 'email',
  first_name: 'text',
  second_name: 'text',
  phone: 'tel',
  passwordRepeat: {
    compare: 'password',
    type: 'password',
    field: 'passwordRepeat'
  }
};
exports.FIELD_TYPE = FIELD_TYPE;
var AUTH_ERRORS;

(function (AUTH_ERRORS) {
  AUTH_ERRORS["RFNV"] = "Registration form is not valid";
  AUTH_ERRORS["LFNV"] = "Login form is not valid";
})(AUTH_ERRORS || (AUTH_ERRORS = {}));

exports.AUTH_ERRORS = AUTH_ERRORS;
},{}],"../src/routes.ts":[function(require,module,exports) {
"use strict";

var _a;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerConfig = exports.ROUTES = void 0;

var controllers_1 = require("./controllers");

var cookieAuthController = new controllers_1.CookieAuthController();
var ROUTES = {
  login: 'login',
  register: 'register',
  messanger: 'messanger',
  profile: 'profile'
};
exports.ROUTES = ROUTES;
var routerConfig = {
  auth: {
    check: cookieAuthController.checkAuth,
    redirect: ROUTES.login,
    authRedirect: ROUTES.messanger,
    permittedRoutes: [ROUTES.login, ROUTES.register]
  },
  defaultRoute: {
    path: ROUTES.login,
    component: 'Login',
    title: 'Вход'
  },
  routes: (_a = {}, _a[ROUTES.register] = {
    component: 'Registration',
    title: 'Регистрация'
  }, _a[ROUTES.messanger] = {
    component: 'Messanger',
    title: 'Чат'
  }, _a.wrong = {
    component: 'UserMissPage',
    title: 'Страница не найдена'
  }, _a.error = {
    component: 'ServerMissPage',
    title: 'Страница временно недоступна'
  }, _a)
};
exports.routerConfig = routerConfig;
},{"./controllers":"../src/controllers/index.ts"}],"../src/pages/Auth/Login/login.controller.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginController = void 0;

var api_1 = require("../../../api");

var controllers_1 = require("../../../controllers");

var utils_1 = require("../../../utils");

var const_1 = require("../const");

var cookieAuthAPI = new controllers_1.CookieAuthController();
var validatorConfig = {
  form: 'formFields',
  errors: 'errors'
};

var LoginController = function () {
  function LoginController() {
    var _this = this;

    this.login = function (data) {
      return __awaiter(_this, void 0, void 0, function () {
        var isValid, error_1, key;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3,, 4]);

              isValid = utils_1.FormValidator.validate(data, validatorConfig, const_1.LOGIN_FIELD_TYPE);

              if (!isValid) {
                throw Error(const_1.AUTH_ERRORS.LFNV);
              }

              return [4, api_1.authAPI.login(data[validatorConfig.form])];

            case 1:
              _a.sent();

              return [4, cookieAuthAPI.checkAuth()];

            case 2:
              _a.sent();

              return [3, 4];

            case 3:
              error_1 = _a.sent();

              if (error_1 && error_1.reason) {
                if (error_1.reason === 'Login or password is incorrect' || error_1.reason === 'Not found') {
                  for (key in data[validatorConfig.errors]) {
                    if (key in data[validatorConfig.errors]) {
                      data[validatorConfig.errors][key] = 'Неверные данные';
                    }
                  }
                }
              }

              return [3, 4];

            case 4:
              return [2];
          }
        });
      });
    };
  }

  return LoginController;
}();

exports.LoginController = LoginController;
},{"../../../api":"../src/api/index.ts","../../../controllers":"../src/controllers/index.ts","../../../utils":"../src/utils/index.ts","../const":"../src/pages/Auth/const.ts"}],"../src/pages/Auth/Auth.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/Auth/Login/Login.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../../../utils");

var components_1 = require("../../../components");

var const_1 = require("../const");

var routes_1 = require("../../../routes");

var login_controller_1 = require("./login.controller");

require("../Auth.css");

var loginController = new login_controller_1.LoginController();
var validConfig = {
  form: 'formFields',
  errors: 'errors'
};

function Login() {
  var loginFormId = 'id-login_form';
  return {
    state: {
      formFields: {
        login: '',
        password: ''
      },
      errors: {
        login: '',
        password: ''
      }
    },
    methods: {
      formFocusHandler: function formFocusHandler() {
        utils_1.FormValidator.validate(this.state, validConfig, const_1.LOGIN_FIELD_TYPE);
      },
      formBlurHandler: function formBlurHandler() {
        utils_1.FormValidator.validate(this.state, validConfig, const_1.LOGIN_FIELD_TYPE);
      },
      submitForm: function submitForm(event) {
        event.preventDefault();
        loginController.login(this.state);
      },
      replaceToRegister: function replaceToRegister(event) {
        event.preventDefault();
        utils_1.PixelRouter.go(routes_1.ROUTES.register);
      },
      inputHandler: function inputHandler(event) {
        var _a = event.target,
            name = _a.name,
            value = _a.value;
        this.state.formFields[name] = value;
      }
    },
    components: {
      Modal: components_1.Modal,
      PagesContainer: components_1.PagesContainer,
      Input: components_1.Input,
      Button: components_1.Button
    },
    template: "\n    <div class=\"container\">\n      <section class=\"auth\">\n        <header class=\"auth__header\">\n          <h2>\u0412\u0445\u043E\u0434</h2>\n        </header>\n        <div class=\"auth__body\">\n          <form \n            class=\"auth-form auth-form_login\" \n            e:submit=\"methods.submitForm\" \n            e:focus=\"methods.formFocusHandler\" \n            e:blur=\"methods.formBlurHandler\" \n          >\n            <div class=\"auth-form__body\">\n              <Input \n                label=\"\u041B\u043E\u0433\u0438\u043D\" \n                name=\"login\" \n                type=\"" + const_1.LOGIN_FIELD_TYPE.login + "\" \n                id=\"login_input_login\" \n                b:error=\"state.errors.login\"\n                b:value=\"state.formFields.login\" \n                b:onChange=\"methods.inputHandler\"\n                />\n\n              <Input \n                label=\"\u041F\u0430\u0440\u043E\u043B\u044C\" \n                name=\"" + const_1.LOGIN_FIELD_TYPE.password + "\" \n                type=\"password\" \n                id=\"login_input_password\" \n                b:error=\"state.errors.password\"\n                b:value=\"state.formFields.password\"\n                b:onChange=\"methods.inputHandler\"\n                />\n            </div>\n            <footer class=\"auth-form__footer\">\n              <Button \n                text=\"\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F\" \n                class=\"button_accent\" \n                type=\"submit\" \n                b:onClick=\"methods.submitForm\" \n              />\n\n              <Button \n                text=\"\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?\" \n                class=\"button_transparent\" \n                type=\"button\" \n                b:onClick=\"methods.replaceToRegister\"\n              />\n            </footer>\n          </form>\n        </div>             \n      </section>\n    </div>"
  };
}

exports.default = Login;
},{"../../../utils":"../src/utils/index.ts","../../../components":"../src/components/index.ts","../const":"../src/pages/Auth/const.ts","../../../routes":"../src/routes.ts","./login.controller":"../src/pages/Auth/Login/login.controller.ts","../Auth.css":"../src/pages/Auth/Auth.css"}],"../src/pages/Auth/Login/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Login_1 = __importDefault(require("./Login"));

exports.default = Login_1.default;
},{"./Login":"../src/pages/Auth/Login/Login.ts"}],"../src/pages/Auth/Registration/registration.controller.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterController = void 0;

var utils_1 = require("../../../utils");

var const_1 = require("../const");

var routes_1 = require("../../../routes");

var api_1 = require("../../../api");

var controllers_1 = require("../../../controllers");

var validationConfig = {
  form: 'formFields',
  errors: 'errors'
};
var authController = new controllers_1.AuthController();

var RegisterController = function () {
  function RegisterController() {
    var _this = this;

    this.register = function (data) {
      return __awaiter(_this, void 0, void 0, function () {
        var isValid, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3,, 4]);

              isValid = utils_1.FormValidator.validate(data, validationConfig, const_1.FIELD_TYPE);

              if (!isValid) {
                throw Error(const_1.AUTH_ERRORS.RFNV);
              }

              return [4, api_1.authAPI.register(data[validationConfig.form])];

            case 1:
              _a.sent();

              return [4, authController.checkAuth()];

            case 2:
              _a.sent();

              utils_1.PixelRouter.go(routes_1.ROUTES.messanger);
              return [3, 4];

            case 3:
              error_1 = _a.sent();

              if (error_1 && error_1.reason) {
                if (error_1.reason === 'Login already exists') {
                  data[validationConfig.errors].login = 'Используйте другой логин';
                }
              } else {
                console.warn(error_1);
              }

              return [3, 4];

            case 4:
              return [2];
          }
        });
      });
    };
  }

  return RegisterController;
}();

exports.RegisterController = RegisterController;
},{"../../../utils":"../src/utils/index.ts","../const":"../src/pages/Auth/const.ts","../../../routes":"../src/routes.ts","../../../api":"../src/api/index.ts","../../../controllers":"../src/controllers/index.ts"}],"../src/pages/Auth/Registration/Registration.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../../../utils");

var components_1 = require("../../../components");

var const_1 = require("../const");

var routes_1 = require("../../../routes");

var registration_controller_1 = require("./registration.controller");

require("../Auth.css");

var registerController = new registration_controller_1.RegisterController();
var validConfig = {
  form: 'formFields',
  errors: 'errors'
};

function Registration() {
  return {
    state: {
      formFields: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        passwordRepeat: ''
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        passwordRepeat: ''
      }
    },
    methods: {
      formFocusHandler: function formFocusHandler() {
        utils_1.FormValidator.validate(this.state, validConfig, const_1.FIELD_TYPE);
      },
      formBlurHandler: function formBlurHandler() {
        utils_1.FormValidator.validate(this.state, validConfig, const_1.FIELD_TYPE);
      },
      submitForm: function submitForm(event) {
        event.preventDefault();
        registerController.register(this.state);
      },
      replaceToLogin: function replaceToLogin() {
        utils_1.PixelRouter.go(routes_1.ROUTES.login);
      },
      inputHandler: function inputHandler(event) {
        var _a = event.target,
            name = _a.name,
            value = _a.value;
        this.state.formFields[name] = value;
      }
    },
    components: {
      Modal: components_1.Modal,
      Input: components_1.Input,
      Button: components_1.Button
    },
    template: "\n    <div class=\"container\">\n      <section class=\"auth\">\n        <header class=\"auth__header\">\n          <h2>\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</h2>\n        </header>\n        <div class=\"auth__body\">\n          <form \n            class=\"auth-form auth-form_login\" \n            e:submit=\"methods.submitForm\" \n            e:blur=\"methods.formBlurHandler\" \n            e:focus=\"methods.formFocusHandler\"\n          >\n\n            <div class=\"auth-form__body auth-form__body--register\">\n\n              <Input \n                label=\"\u041F\u043E\u0447\u0442\u0430\" \n                name=\"email\" \n                type=\"email\" \n                id=\"input" + utils_1.generateUniqId() + "\" \n                b:value=\"state.formFields.email\"\n                b:error=\"state.errors.email\"\n                b:onChange=\"methods.inputHandler\"\n              />\n\n              <Input \n                label=\"\u041B\u043E\u0433\u0438\u043D\" \n                name=\"login\" \n                type=\"text\" \n                id=\"input" + utils_1.generateUniqId() + "\" \n                b:value=\"state.formFields.login\"\n                b:error=\"state.errors.login\"\n                b:onChange=\"methods.inputHandler\"\n              />\n\n              <Input \n                label=\"\u0418\u043C\u044F\" \n                name=\"first_name\" \n                type=\"text\" \n                id=\"input" + utils_1.generateUniqId() + "\" \n                b:value=\"state.formFields.first_name\"\n                b:error=\"state.errors.first_name\"\n                b:onChange=\"methods.inputHandler\"\n              />\n\n              <Input \n                label=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" \n                name=\"second_name\" \n                type=\"text\" \n                id=\"input" + utils_1.generateUniqId() + "\" \n                b:value=\"state.formFields.second_name\"\n                b:error=\"state.errors.second_name\"\n                b:onChange=\"methods.inputHandler\"\n              />\n\n              <Input \n                label=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" \n                name=\"phone\" \n                type=\"tel\" \n                id=\"input" + utils_1.generateUniqId() + "\" \n                b:value=\"state.formFields.phone\"\n                b:error=\"state.errors.phone\"\n                b:onChange=\"methods.inputHandler\"\n              />\n\n              <Input \n                label=\"\u041F\u0430\u0440\u043E\u043B\u044C\" \n                name=\"password\" \n                type=\"password\" \n                id=\"input" + utils_1.generateUniqId() + "\" \n                b:value=\"state.formFields.password\"\n                b:error=\"state.errors.password\"\n                b:onChange=\"methods.inputHandler\"\n              />\n\n              <Input \n                label=\"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C\" \n                name=\"passwordRepeat\" \n                type=\"password\" \n                id=\"input" + utils_1.generateUniqId() + "\" \n                b:value=\"state.formFields.passwordRepeat\"\n                b:error=\"state.errors.passwordRepeat\"\n                b:onChange=\"methods.inputHandler\"\n              />\n              \n            </div>\n\n            <footer class=\"auth-form__footer\">\n\n              <Button \n                text=\"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F\"\n                class=\"button_accent\" \n                type=\"submit\" \n                b:onClick=\"methods.submitForm\"\n              />\n\n              <Button \n                text=\"\u0423\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\" \n                class=\"button button_transparent\" \n                type=\"button\" \n                b:onClick=\"methods.replaceToLogin\"\n              />\n\n            </footer>\n          </form>\n        </div>              \n      </section>\n    </div>\n    "
  };
}

exports.default = Registration;
},{"../../../utils":"../src/utils/index.ts","../../../components":"../src/components/index.ts","../const":"../src/pages/Auth/const.ts","../../../routes":"../src/routes.ts","./registration.controller":"../src/pages/Auth/Registration/registration.controller.ts","../Auth.css":"../src/pages/Auth/Auth.css"}],"../src/pages/Auth/Registration/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Registration_1 = __importDefault(require("./Registration"));

exports.default = Registration_1.default;
},{"./Registration":"../src/pages/Auth/Registration/Registration.ts"}],"../src/pages/Auth/auth.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/pages/Auth/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Registration = exports.Login = exports.IUser = void 0;

var Login_1 = __importDefault(require("./Login"));

exports.Login = Login_1.default;

var Registration_1 = __importDefault(require("./Registration"));

exports.Registration = Registration_1.default;

var auth_type_1 = require("./auth.type");

Object.defineProperty(exports, "IUser", {
  enumerable: true,
  get: function get() {
    return auth_type_1.IUser;
  }
});
},{"./Login":"../src/pages/Auth/Login/index.ts","./Registration":"../src/pages/Auth/Registration/index.ts","./auth.type":"../src/pages/Auth/auth.type.ts"}],"../src/pages/MissedPages/MissedPages.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/MissedPages/ServerMissPage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerMissPage = void 0;

require("./MissedPages.css");

function ServerMissPage() {
  return {
    template: "\n    <div class=\"container container_server-miss\">\n     <section class=\"error-page_500 error-page\">\n        <div class=\"error-page__content error-page__content_500\">\n          <h1 class=\"error-page__title\">500</h1>\n          <p class=\"error-page__message\">\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430</p>\n          <a class=\"error-page__link\" href=\"/\" >PIXEL CHAT</a>\n        </div>\n      </section>\n    </div>\n    "
  };
}

exports.ServerMissPage = ServerMissPage;
},{"./MissedPages.css":"../src/pages/MissedPages/MissedPages.css"}],"../src/pages/MissedPages/UserMissPage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMissPage = void 0;

require("./MissedPages.css");

function UserMissPage() {
  return {
    template: "\n    <div class=\"container container_user-miss\">\n      <section class=\"error-page_404 error-page\">\n        <div class=\"error-page__content\">\n          <h1 class=\"error-page__title\">404</h1>\n          <p class=\"error-page__message\">\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0432\u044B \u0437\u0430\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u0442\u0435, \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430</p>\n        </div>\n        <a class=\"error-page__link\" href=\"/\" >PIXEL CHAT</a>\n      </section>\n    </div>\n    "
  };
}

exports.UserMissPage = UserMissPage;
},{"./MissedPages.css":"../src/pages/MissedPages/MissedPages.css"}],"../src/pages/MissedPages/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMissPage = exports.ServerMissPage = void 0;

var ServerMissPage_1 = require("./ServerMissPage");

Object.defineProperty(exports, "ServerMissPage", {
  enumerable: true,
  get: function get() {
    return ServerMissPage_1.ServerMissPage;
  }
});

var UserMissPage_1 = require("./UserMissPage");

Object.defineProperty(exports, "UserMissPage", {
  enumerable: true,
  get: function get() {
    return UserMissPage_1.UserMissPage;
  }
});
},{"./ServerMissPage":"../src/pages/MissedPages/ServerMissPage.ts","./UserMissPage":"../src/pages/MissedPages/UserMissPage.ts"}],"../src/pages/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messanger = exports.UserMissPage = exports.ServerMissPage = exports.IUser = exports.Registration = exports.Login = void 0;

var Messanger_1 = __importDefault(require("./Messanger"));

exports.Messanger = Messanger_1.default;

var Auth_1 = require("./Auth");

Object.defineProperty(exports, "Login", {
  enumerable: true,
  get: function get() {
    return Auth_1.Login;
  }
});
Object.defineProperty(exports, "Registration", {
  enumerable: true,
  get: function get() {
    return Auth_1.Registration;
  }
});
Object.defineProperty(exports, "IUser", {
  enumerable: true,
  get: function get() {
    return Auth_1.IUser;
  }
});

var MissedPages_1 = require("./MissedPages");

Object.defineProperty(exports, "ServerMissPage", {
  enumerable: true,
  get: function get() {
    return MissedPages_1.ServerMissPage;
  }
});
Object.defineProperty(exports, "UserMissPage", {
  enumerable: true,
  get: function get() {
    return MissedPages_1.UserMissPage;
  }
});
},{"./Messanger":"../src/pages/Messanger/index.ts","./Auth":"../src/pages/Auth/index.ts","./MissedPages":"../src/pages/MissedPages/index.ts"}],"../src/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"/mnt/C012BA0A12BA0586/Study/Programming/JavaScript/YPractice/pixel_chat/static/assets/images/BG/RootBG.png":[["RootBG.f88795a9.png","assets/images/BG/RootBG.png"],"assets/images/BG/RootBG.png"],"/mnt/C012BA0A12BA0586/Study/Programming/JavaScript/YPractice/pixel_chat/static/assets/images/BG/404BG.png":[["404BG.ebd18425.png","assets/images/BG/404BG.png"],"assets/images/BG/404BG.png"],"/mnt/C012BA0A12BA0586/Study/Programming/JavaScript/YPractice/pixel_chat/static/assets/images/BG/500BG.png":[["500BG.00ba9bfc.png","assets/images/BG/500BG.png"],"assets/images/BG/500BG.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var pages_1 = require("./pages");

var routes_1 = require("./routes");

var utils_1 = require("./utils");

require("./index.css");

var currentUserDefault = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: ''
};
utils_1.Pixel.config({
  el: '#root',
  store: {
    currentUser: currentUserDefault,
    selectedChat: null,
    chatUsers: [],
    chats: [],
    filteredChats: []
  },
  routerConfig: routes_1.routerConfig,
  components: {
    Login: pages_1.Login,
    Registration: pages_1.Registration,
    Messanger: pages_1.Messanger,
    UserMissPage: pages_1.UserMissPage,
    ServerMissPage: pages_1.ServerMissPage
  }
});
},{"./pages":"../src/pages/index.ts","./routes":"../src/routes.ts","./utils":"../src/utils/index.ts","./index.css":"../src/index.css"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35527" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.ts"], null)
//# sourceMappingURL=/src.9caef6c7.js.map