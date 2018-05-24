const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const MunroHandler = function() {

};

MunroHandler.prototype.bindEvents = function() {
  this.apiRequest('https://munroapi.herokuapp.com/api/munros/');

  PubSub.subscribe('FilterView:filter-selected', (evt) => {
    if (evt.detail === "All") {
      this.appiRequest('https://munroapi.herokuapp.com/api/munros/')
    } else {
      console.log(evt.detail);
      this.apiRequest(`https://munroapi.herokuapp.com/api/munros/region/${evt.detail}`);
    }
  });
};

MunroHandler.prototype.apiRequest = function(url) {
  const request = new Request(url);
  request.get((data) => {
    PubSub.publish('MunroHandler:munro-data', data);
  });
};

module.exports = MunroHandler;
