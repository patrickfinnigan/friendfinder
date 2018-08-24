// var express = require('express');
// var app = express.Router();
var path = require("path");
// the path package simple makes delivering pages easier using express




// these are the routes we will use. they will tell the server which pages to display based on the url
// it is placed in a module.exports fucntion so that the server can use these paths later on down the line
module.exports = function (app) {
  // in the export, we pass in the parameter "app" which will be interpereted as express when the export reaches the server,
  // and say that when the url is directed to "/survey",
  // we activate the function...
  app.get('/survey', function (req, res) {
    // ... which delivered the file "survey.html"!
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
  });

  /* GET home page. */
  // here, we dont define a path because we want the server to automatically uuse this page when we access thw website
  // this is why we use app.use instead of app.get
  // we arent getting anything because there is no request to get anything
  // the home page is automaticllay set as default, so it doent have to get somehting it already has default access to
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });

}