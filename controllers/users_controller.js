module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'Profile'
    });
}

module.exports.details = function(req, res){
    console.log('<h1>User Details</h1>');
}