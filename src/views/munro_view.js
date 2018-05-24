const PubSub = require('../helpers/pub_sub.js');

const MunroView = function(munro, element) {
  this.munro = munro;
  this.element = element;
};

MunroView.prototype.renderMunro = function () {

  const title = this.createHtmlElement('h2', this.munro.name );
  const data = this.createHtmlElement('ul');
  const height = this.createHtmlElement('li', `Height: ${this.munro.height}`);
  const meaning = this.createHtmlElement('li', `Meaning: ${this.munro.meaning}`);

  this.addChilds(this.element, [title, data]);
  this.addChilds(data, [height, meaning]);

};

MunroView.prototype.createHtmlElement = function (type, content) {
  const element = document.createElement(type);
  element.textContent = content;
  return element;
};

MunroView.prototype.addChilds = function (parent, childs) {
  childs.forEach( (child) => {
    parent.appendChild(child);
  });
};

module.exports = MunroView;
