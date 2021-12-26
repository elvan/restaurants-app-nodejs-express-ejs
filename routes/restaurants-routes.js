const express = require('express');
const { v4: uuidv4 } = require('uuid');

const restaurantData = require('../util/restaurant-data');

const router = express.Router();

router.get('/confirm', (req, res) => {
  res.render('confirm');
});

router.get('/recommend', (req, res) => {
  res.render('recommend');
});

router.post('/recommend', (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuidv4();

  const restaurants = restaurantData.getStoredRestaurants();

  restaurants.push(restaurant);
  restaurantData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/restaurants', (req, res) => {
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const restaurants = restaurantData.getStoredRestaurants();

  restaurants.sort((a, b) => {
    if (
      (order === 'asc' && a.name > b.name) ||
      (order === 'desc' && a.name < b.name)
    ) {
      return 1;
    }

    return -1;
  });

  res.render('restaurants', {
    restaurants,
    nextOrder,
  });
});

router.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  const restaurants = restaurantData.getStoredRestaurants();
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    res.status(404).render('404');
  }

  res.render('restaurant-detail', { restaurant });
});

module.exports = router;
