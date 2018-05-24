const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('./munro_view.js');

const ListView = function(element) {
  this.element = element;
};

ListView.prototype.bindEvents = function () {
  PubSub.subscribe('MunroHandler:munro-data', (evt) => {
    this.renderData(evt.detail);
  });
};

ListView.prototype.renderData = function (data) {
  this.element.innerHTML = '';
  data.forEach((munro) => {
    const individualMunro = this.createMunroView(munro);
    individualMunro.renderMunro();
  });
};

ListView.prototype.createMunroView = function(munro) {
  const item = this.addNewMunroChild();
  const munroView = new MunroView(munro, item);
  return munroView;
};

ListView.prototype.addNewMunroChild = function () {
  const item = document.createElement('div');
  item.classList.add('munro');
  this.element.appendChild(item);
  return item;
};

module.exports = ListView;
