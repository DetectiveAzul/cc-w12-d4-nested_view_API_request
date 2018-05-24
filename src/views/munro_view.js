const PubSub = require('../helpers/pub_sub.js');

const MunroView = function(munro, element) {
  this.munro = munro;
  this.element = element;
};

MunroView.prototype.renderMunro = function () {
  const title = document.createElement('h2');
  title.textContent = this.munro.name;
  const data = document.createElement('ul');
  const meaning = document.createElement('li');
  meaning.textContent = `Meaning: ${this.munro.meaning}`;
  const height = document.createElement('li');
  height.textContent = `Height: ${this.munro.height}`;
  this.element.appendChild(title);
  this.element.appendChild(data);
  data.appendChild(meaning);
  data.appendChild(height);
};

module.exports = MunroView;
