const express = require('express');
const app = express();

/* GET home page */
app.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = app;
