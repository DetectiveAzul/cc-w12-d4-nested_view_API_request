const PubSub = require('../helpers/pub_sub.js');

const FilterView = function(element) {
  this.element = element;
  this.menuPopulated = false;
};

FilterView.prototype.bindEvents = function () {
  PubSub.subscribe('MunroHandler:munro-data', (evt) => {
    if (!this.menuPopulated) this.populateMenu(evt.detail);
  });

  this.element.addEventListener('change', (event) => {
    PubSub.publish('FilterView:filter-selected', event.target.value);
  });
};

FilterView.prototype.populateMenu = function(data) {
  const filteredArray = this.getOptions(data);
  filteredArray.forEach( (option) => {
    this.createOption(option);
  });
  this.menuPopulated = true;
}

FilterView.prototype.getOptions = function (data) {
  const regionArray = data.map((munro) => {
    return munro.region;
  });
  const uniqueRegions = regionArray.filter( (region, position, array) => {
    return position === array.indexOf(region);
  });
  return uniqueRegions;
};

FilterView.prototype.createOption = function(option) {
  const optionToCreate = document.createElement('option')
  optionToCreate.textContent = option;
  this.element.appendChild(optionToCreate);
};





module.exports = FilterView;
