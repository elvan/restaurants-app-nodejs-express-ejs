const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'views', 'index.html');
  res.sendFile(htmlFilePath);
});

app.get('/about', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'views', 'about.html');
  res.sendFile(htmlFilePath);
});

app.get('/confirm', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  res.sendFile(htmlFilePath);
});

app.get('/recommend', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  res.sendFile(htmlFilePath);
});

app.post('/recommend', (req, res) => {
  const restaurant = req.body;

  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  const fileData = fs.readFileSync(filePath);
  const restaurants = JSON.parse(fileData.toString());

  restaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(restaurants, null, 2));

  res.redirect('/confirm');
});

app.get('/restaurants', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  res.sendFile(htmlFilePath);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
