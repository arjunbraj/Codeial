const Post = require('../models/post');

module.exports.home = function(req, res){
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: 'Codeial | Home',
    //         posts: posts
    //     });
    // })

    // populate the user
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){console.log('error in getting data');}
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts
        });
    })
}

module.exports.about = function(req, res){
    console.log('<h1>About Section</h1>');
}