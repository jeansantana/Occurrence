/*
 * Main App file App.js
 * @author Jean, Isaac, Emerson
 */


// Dependencies requirements, Express 4
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require("mongoose");
var app            = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

//Add the routes
routes = require('./routes/occurrence')(app);

// MongoDB configuration
mongoose.connect('mongodb://localhost/occurrence', function(err, res) {
    if(err) {
        console.log('error connecting to MongoDB Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});

app.listen(8080);
console.log('Im listening on port (8080)');

// First example router
app.get('/', function(req, res) {
    res.send("Welcome to Occurrence API!");
});
