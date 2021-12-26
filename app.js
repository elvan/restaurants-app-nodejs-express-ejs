const path = require('path');

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const restaurantData = require('./util/restaurant-data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.get('/recommend', (req, res) => {
  res.render('recommend');
});

app.post('/recommend', (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuidv4();

  const restaurants = restaurantData.getStoredRestaurants();

  restaurants.push(restaurant);
  restaurantData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

app.get('/restaurants', (req, res) => {
  const restaurants = restaurantData.getStoredRestaurants();

  res.render('restaurants', { restaurants });
});

app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  const restaurants = restaurantData.getStoredRestaurants();
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    res.status(404).render('404');
  }

  res.render('restaurant-detail', { restaurant });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
