// getting the user model
const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('profile', {
            title: 'Profile',
            profile_user: user
        });
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    } else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.details = function(req, res){
    console.log('<h1>User Details</h1>');
}

// render the sign up page
module.exports.signUp = function(req, res){
    // checking if user is signed in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    // checking if user is signed in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

// get data from sign up
module.exports.create = async function(req, res){
    // confirm password
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return;
    }
}

// sign in and create session for user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

// sign out
module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){ return next(err);}
    });
    return res.redirect('/');
}