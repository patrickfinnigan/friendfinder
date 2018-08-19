var express = require('express');
var app = express();
// var path = require('path');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080

 
// idk what this does but ill just copy and paste it again so whatever
app.use(bodyParser.urlencoded({ extended: true }))
// body-parser makes it easier for the fron and back ends to talk to eachother, in that it translates everything going through the server into the same sort of language
//
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))



require("./app/routing/apiRoutes.js")(app);
//all weve done here is tell the server to require the htmlRouting file, which tells the server how to handle the html files
// we also tell it to pass in the app function, that being the Express function, into the module exports function that we created within that file
require("./app/routing/htmlRoutes.js")(app);

// this is for listening to what comes out of the port
// if the app hears anything coming through the port access, it is instructed to perform this function
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});