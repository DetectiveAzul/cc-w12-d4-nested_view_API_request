const PubSub = require('../helpers/pub_sub.js');

const ListView = function(element) {
  this.element = element;
};

ListView.prototype.bindEvents = function () {
  console.log('Listview started to listen');
  console.log('ListView element:' ,this.element);
};

module.exports = ListView;
