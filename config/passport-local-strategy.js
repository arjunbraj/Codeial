const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// use strategy
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find the user
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport'); 
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Usernam or Password'); 
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// serialize the user
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserialize the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport'); 
            return done(err);
        }
        return done(null, user);
    });
});

// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // user signed in
    if(req.isAuthenticated()){
        return next();
    }
    // user not signed in
    return res.redirect('/users/sign-in');
}

// setting the user
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

// export
module.exports = passport;