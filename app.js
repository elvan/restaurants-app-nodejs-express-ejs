const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default-routes');
const restaurantsRoutes = require('./routes/restaurants-routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(defaultRoutes);
app.use(restaurantsRoutes);

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
