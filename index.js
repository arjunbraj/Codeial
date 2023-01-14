const express = require('express');
const app = express();
const port = 8000;

// Add express router

app.use('/', require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Successfully connected through port ${port}`);
});