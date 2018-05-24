const MunroHandler = require('./models/munro_handler.js');
const ListView = require('./views/list_view.js');
const MunroView = require('./views/munro_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  //Create the listview data and starts subscribing data
  const listElement = document.createElement('div');
  listElement.classList.add('list-container');
  const listView = new ListView(listElement);
  listView.bindEvents();

  //Create the model and start publishing data
  const munroHandler = new MunroHandler();
  munroHandler.getData();
})
