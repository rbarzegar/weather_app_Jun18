const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up templating with handlebars and customise 'views' path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set the path for serving up static files
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: "Roland's weather forecast",
    name: 'Roland Barzegar'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Roland Barzegar'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Roland Barzegar',
    helpMessage: 'Never eat yellow snow'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send('Error: You must provide a valid address');
  }
  geocode(address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ error: err });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send('Error: you must provide a search term.');
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Roland Barzegar',
    errorMessage: 'Help Article Not Found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Roland Barzegar',
    errorMessage: 'Page Not Found'
  }); 
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
