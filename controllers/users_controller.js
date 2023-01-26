// getting the user model
const User = require('../models/user');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){

            if(user){
                return res.render('profile', {
                    title: 'Profile',
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        })
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.details = function(req, res){
    console.log('<h1>User Details</h1>');
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

// get data from sign up
module.exports.create = function(req, res){
    // confirm password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user for signing up'); return;}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user for signing up'); return;}
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

// sign in and create session for user
module.exports.createSession = function(req, res){
    // Steps to authenticate
    // get user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user for signing in'); return;}
        // handle if user found
        if(user){
            // handle if passwords do not match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //create user session
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile'); 
        }else{
            // handle if user not found
            return res.redirect('back');
        }
    })
}

module.exports.signOut = function(req, res){
    // delete cookie
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}