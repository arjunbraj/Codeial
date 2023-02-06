{
    // create post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        });
    }

    // create post in DOM
    let newPostDom = function(post){
        return $(`
        <li id="post-${ post._id }">
            <p>
                <li>
                    
                        <small>
                            <a class="delete-post-btn" href="/posts/destroy/${ post._id }">X </a>
                        </small>
                    
                        ${ post.content }
                    <br>
                    <small>
                        ${ post.user.name }
                    </small>
                </li>
            </p>
            <div class="post-comments">
                
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Type here to add comment..." required>
                        <input type="hidden" name="post" value="${ post._id }">
                        <input type="submit" value="Add Comment">
                    </form>    
                
                <div id="post-comments-list">
                    <ul id="post-comments-${ post._id }">
                        
                    </ul>
                </div>          
            </div>
        </li>
        `);
    }

    createPost();
}