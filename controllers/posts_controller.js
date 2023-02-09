const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.posts = function(req, res){
    console.log('<h1>Posts</h1>');
}

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            req.flash('error', err);
            return;
        }
        req.flash('success', 'Created a post');
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post created!'
            });
        }
        return res.redirect('back');
    })
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            req.flash('success', 'Deleted a post');
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: post.user
                    },
                    message: 'Post deleted ...'
                });
            }
            return res.redirect('back');
        } else{
            return res.redirect('back');
        }
    } catch(err){
        req.flash('error', err);
        return;
    }
}