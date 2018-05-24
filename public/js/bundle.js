/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MunroHandler = __webpack_require__(/*! ./models/munro_handler.js */ \"./src/models/munro_handler.js\");\nconst ListView = __webpack_require__(/*! ./views/list_view.js */ \"./src/views/list_view.js\");\nconst MunroView = __webpack_require__(/*! ./views/munro_view.js */ \"./src/views/munro_view.js\");\nconst FilterView = __webpack_require__(/*! ./views/filter_view.js */ \"./src/views/filter_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('JavaScript Loaded');\n  //Find body element\n  const body = document.querySelector('body');\n\n  //Create the filterview and starts subscribing/publishing data\n  const select = document.querySelector('select');\n  const filterView = new FilterView(select);\n  filterView.bindEvents();\n\n  //Create the listview and starts subscribing data\n  const listElement = document.createElement('div');\n  listElement.classList.add('list-container');\n  body.appendChild(listElement);\n  const listView = new ListView(listElement);\n  listView.bindEvents();\n\n  //Create the model and start publishing data\n  const munroHandler = new MunroHandler();\n  munroHandler.bindEvents();\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url\n}\n\nRequestHelper.prototype.get = function (onComplete) {\n  const xhr = new XMLHttpRequest();\n  xhr.open('GET', this.url);\n  xhr.addEventListener('load', function() {\n    if(this.status !== 200){\n      return;\n    }\n    const data = JSON.parse(this.responseText);\n    onComplete(data);\n  });\n  xhr.send();\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/munro_handler.js":
/*!*************************************!*\
  !*** ./src/models/munro_handler.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst Request = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\n\nconst MunroHandler = function() {\n\n};\n\nMunroHandler.prototype.bindEvents = function() {\n  this.apiRequest('https://munroapi.herokuapp.com/api/munros/');\n\n  PubSub.subscribe('FilterView:filter-selected', (evt) => {\n    if (evt.detail === \"All\") {\n      this.appiRequest('https://munroapi.herokuapp.com/api/munros/')\n    } else {\n      console.log(evt.detail);\n      this.apiRequest(`https://munroapi.herokuapp.com/api/munros/region/${evt.detail}`);\n    }\n  });\n};\n\nMunroHandler.prototype.apiRequest = function(url) {\n  const request = new Request(url);\n  request.get((data) => {\n    PubSub.publish('MunroHandler:munro-data', data);\n  });\n};\n\nmodule.exports = MunroHandler;\n\n\n//# sourceURL=webpack:///./src/models/munro_handler.js?");

/***/ }),

/***/ "./src/views/filter_view.js":
/*!**********************************!*\
  !*** ./src/views/filter_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst FilterView = function(element) {\n  this.element = element;\n  this.menuPopulated = false;\n};\n\nFilterView.prototype.bindEvents = function () {\n  PubSub.subscribe('MunroHandler:munro-data', (evt) => {\n    if (!this.menuPopulated) this.populateMenu(evt.detail);\n  });\n\n  this.element.addEventListener('change', (event) => {\n    PubSub.publish('FilterView:filter-selected', event.target.value);\n  });\n};\n\nFilterView.prototype.populateMenu = function(data) {\n  const filteredArray = this.getOptions(data);\n  filteredArray.forEach( (option) => {\n    this.createOption(option);\n  });\n  this.menuPopulated = true;\n}\n\nFilterView.prototype.getOptions = function (data) {\n  const regionArray = data.map((munro) => {\n    return munro.region;\n  });\n  const uniqueRegions = regionArray.filter( (region, position, array) => {\n    return position === array.indexOf(region);\n  });\n  return uniqueRegions;\n};\n\nFilterView.prototype.createOption = function(option) {\n  const optionToCreate = document.createElement('option')\n  optionToCreate.textContent = option;\n  this.element.appendChild(optionToCreate);\n};\n\n\n\n\n\nmodule.exports = FilterView;\n\n\n//# sourceURL=webpack:///./src/views/filter_view.js?");

/***/ }),

/***/ "./src/views/list_view.js":
/*!********************************!*\
  !*** ./src/views/list_view.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst MunroView = __webpack_require__(/*! ./munro_view.js */ \"./src/views/munro_view.js\");\n\nconst ListView = function(element) {\n  this.element = element;\n};\n\nListView.prototype.bindEvents = function () {\n  PubSub.subscribe('MunroHandler:munro-data', (evt) => {\n    this.renderData(evt.detail);\n  });\n};\n\nListView.prototype.renderData = function (data) {\n  this.element.innerHTML = '';\n  data.forEach((munro) => {\n    const individualMunro = this.createMunroView(munro);\n    individualMunro.renderMunro();\n  });\n};\n\nListView.prototype.createMunroView = function(munro) {\n  const item = this.addNewMunroChild();\n  const munroView = new MunroView(munro, item);\n  return munroView;\n};\n\nListView.prototype.addNewMunroChild = function () {\n  const item = document.createElement('div');\n  item.classList.add('munro');\n  this.element.appendChild(item);\n  return item;\n};\n\nmodule.exports = ListView;\n\n\n//# sourceURL=webpack:///./src/views/list_view.js?");

/***/ }),

/***/ "./src/views/munro_view.js":
/*!*********************************!*\
  !*** ./src/views/munro_view.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst MunroView = function(munro, element) {\n  this.munro = munro;\n  this.element = element;\n};\n\nMunroView.prototype.renderMunro = function () {\n\n  const title = this.createHtmlElement('h2', this.munro.name );\n  const data = this.createHtmlElement('ul');\n  const height = this.createHtmlElement('li', `Height: ${this.munro.height}`);\n  const meaning = this.createHtmlElement('li', `Meaning: ${this.munro.meaning}`);\n\n  this.addChilds(this.element, [title, data]);\n  this.addChilds(data, [height, meaning]);\n\n};\n\nMunroView.prototype.createHtmlElement = function (type, content) {\n  const element = document.createElement(type);\n  element.textContent = content;\n  return element;\n};\n\nMunroView.prototype.addChilds = function (parent, childs) {\n  childs.forEach( (child) => {\n    parent.appendChild(child);\n  });\n};\n\nmodule.exports = MunroView;\n\n\n//# sourceURL=webpack:///./src/views/munro_view.js?");

/***/ })

/******/ });