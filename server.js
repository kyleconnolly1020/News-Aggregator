//Importing npm packages
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

//Setting up express server
var app = express(); 

//(w/ static pages)
app.use(express.static("public"));

//(w/ handling form submissions) 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

//(w/ handlebars engine)
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Connect to Mongo DB and use ES6 promises
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

var PORT = process.env.PORT || 3000; 

//Handle routing for various api requests
require("./public/routes/api-routes.js")(app);

//Starting the server 
app.listen(PORT, function() {
    console.log(`The app is running on port ${PORT} --`); 
});