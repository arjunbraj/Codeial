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
            if(err){console.log('Error in finding user --> Passport'); return done(err);}
            if(!user || user.password != password){console.log('Invalid Usernam or Password'); return done(null, false);}
            return done(null, user);
        })
    }
));

// serialize the user
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserialize the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){console.log('Error in finding user --> Passport'); return done(err);}
        return done(null, user);
    });
});

// export
module.exports = passport;