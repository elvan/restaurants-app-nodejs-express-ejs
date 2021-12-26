const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const restaurants = JSON.parse(fileData.toString());

  return restaurants;
}

function storeRestaurants(restaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants, null, 2));
}

module.exports = {
  getStoredRestaurants,
  storeRestaurants,
};
