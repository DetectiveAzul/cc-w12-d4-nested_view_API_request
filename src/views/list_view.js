const PubSub = require('../helpers/pub_sub.js');

const ListView = function(element) {
  this.element = element;
};

ListView.prototype.bindEvents = function () {
  PubSub.subscribe('MunroHandler:munro-data', (evt) => {
    this.renderData(evt.detail);
  });
};

ListView.prototype.renderData = function (data) {
  console.table(data);
};

module.exports = ListView;
