module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'Profile'
    });
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
    // TODO later
}

// sign in and create session for user
module.exports.createSession = function(req, res){
    // TODO later
}