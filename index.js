const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// add cookie parser
app.use(cookieParser());

// add urlencoded
app.use(express.urlencoded());

// Add express Layout

app.use(expressLayouts);

// extract styles and scripts

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Add express router

app.use('/', require('./routes'));

// Setting up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Seting up static files

app.use(express.static('./assets'));


app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Successfully connected through port ${port}`);
});