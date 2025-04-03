const express = require('express');
const path = require('path');

const indexRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const port = process.env.PORT || 3000;

const app = express();

global.cw_db = path.join(__dirname, './data/cw_db.json');

// middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting pug like view engine to read html code
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// using static files css,js
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static('public/javascripts'));

// using api's
app.use('/api', indexRoutes);
app.use('/', webRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//cronjobing every 5 mimute in order to prevent webiste hosting going to sleep after 15 minutes
const axios = require('axios');

const selfPing = () => {
  const url = 'https://wt-cw2-00018484-level4.onrender.com/goal';
  setInterval(() => {
    axios.get(url)
      .then(() => console.log(`[PING] Keep-alive ping to ${url}`))
      .catch((err) => console.error('[PING] Error pinging app:', err.message));
  }, 1000 * 60 * 5);
};

selfPing();