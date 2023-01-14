const express = require('express');
const app = express();
const port = 8000;

// Add express router

app.use('/', require('./routes'));

// Setting up EJS
app.set('view_engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Successfully connected through port ${port}`);
});