const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const MunroHandler = function() {

};

MunroHandler.prototype.getData = function() {
  const request = new Request('https://munroapi.herokuapp.com/api/munros');
  request.get((data) => {
    PubSub.publish('MunroHandler:munro-data', data);
  });
};

module.exports = MunroHandler;
