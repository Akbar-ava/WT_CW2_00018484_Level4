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
    console.log(`Server running at http://localhost:${port}/goal`);
});
