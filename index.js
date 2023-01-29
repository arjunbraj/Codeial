const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// MongoStore
const MongoStore = require('connect-mongo');

// setting up sass
// const sassMiddleware = require('node-sass-middleware');
// app.use(sassMiddleware({
//     src: '/assets/scss',
//     dest: '/assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

// add cookie parser
app.use(cookieParser());

// add urlencoded
app.use(express.urlencoded());

// Add express Layout

app.use(expressLayouts);

// extract styles and scripts

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setting up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Seting up static files

app.use(express.static('./assets'));

// set up session cookie
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongo setup success');
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Add express router
app.use('/', require('./routes'));

// listening to server
app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Successfully connected through port ${port}`);
});