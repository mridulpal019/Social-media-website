{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data.data.post)
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <div class="postuser-info">
            <div class="image-name">
                <img src="${post.user.avatar}" alt="${post.user.name}">  
                <div class="name-created">
                    <a href="/users/profile/${post.user.id}">
                    <p>${post.user.name}</p></a>
                    
                    <small>Just Now</small>
                </div>
                
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                    </small>
                  
            </div>
            
        </div>
            <p>
            ${post.content}
            <br>
          
            <hr>
           
            <small>
               
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                           0 Likes
                    </a>
                
            </small>
            
         </p>
         <div class="post-comments">
         
         <form action="/comments/create" method="post"  id="post-${post._id}-comments-form">
            <img src="${post.user.avatar}" alt="${post.user.name}" width="40px" height="40px">  
             <!-- <textarea name="content"  cols="20" rows="2" placeholder="write your comment here" required></textarea> -->
             <input type="text" name="content" placeholder="write your comment here" required>
             <input type="submit" value="Comment">
             <input type="hidden" name="post" value="${post._id}">
         </form>

        
         <div id="post-comments-list">
             <ul id ="post-comments-${post._id}">
             </ul>
         </div>
        </div>
         </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            console.log(self);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]//spliting the string into two parts where - comes up and chossing the other half
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}