var express = require('express');
var app = express.Router();

console.log("hello")

/* GET home page. */
app.get('*', function (req, res) {
  res.sendFile('home.html');
});

module.exports = app;