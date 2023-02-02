const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
   try{
    // populate the user
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    
    let users = await User.find({});

    return res.render('home', {
        title: 'Codeial | Home',
        posts: posts,
        all_users: users
    });
   }catch{err}{
    console.log('Error: ', err);
    return;
   }
}

module.exports.about = function(req, res){
    console.log('<h1>About Section</h1>');
}