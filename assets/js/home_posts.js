{   //method  to submit the form data using ajax
     let createPost=function(){
         console.log('in post body')
         let newPostform=$('#new-post-form');
         newPostform.submit(function(e){
             e.preventDefault();

             $.ajax({
                 type:'post',
                 url:'/posts/create',
                 //this convert form data to json
                 data:newPostform.serialize(),
                 success:function(data){
                          let newPost=newPostDom(data.data.post);
                          $('#posts-list-container>ul').prepend(newPost);
                          deletePost($(' .delete-post-button',newPost));//space should be there
                          
                          createComment();
                          

                          new Noty({
                            theme:'relax',
                            text:"post Created!",
                            type:'success',
                            layout:'topRight',
                            timeout:1500
                        }).show();
                 },
                 error:function(error){
                     console.log(error.responseText);
                 }

             });
         });
     }
    //method to create a post in dom
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
            </small>
    
            ${post.content}
        <br>
        <small>${post.user.name}</small>
     </p>
     <div class="post-comments">
     
     <form action="/comments/create" method="post">
         <textarea name="content"  cols="20" rows="2" placeholder="write your comment here" required></textarea>
         <input type="submit" value="Comment">
         <input type="hidden" name="post" value="${post._id}">
     </form>
    
    
     <div class="post-comments-list">
         <ul id ="post-comments-${post._id}">
         </ul>
     </div>
    
    
    </div>
    
     </li>`)
    }



    // //method to delete a post from dom
    let deletePost=function(deleteLink){
      
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log(deleteLink,"delete post link")
        
          
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                     $(`#post-${data.data.post_id}`).remove();
                     
                     new Noty({
                        theme:'relax',
                        text:"post Deleted!",
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },
                error:function(error){
                    console.log(error.responseText)
                }
            })
        });
        
    }

    //method to add comment
    let createComment=function(){
        console.log("in comment body")
         let newCommentform=$('#new-comment-form');
         newCommentform.submit(
             function(e){
                 e.preventDefault();

                 $.ajax({
                    type:'post',
                    url:'/comments/create',
                    //this convert form data to json
                    data:newCommentform.serialize(),
                    success:function(data){
                             let newComment=newCommentDom(data.data.comment);
                             $('#post-comments-list>ul').prepend(newComment);
                             deleteComment($(' .delete-comment-button',newComment));//space should be there 

                             
                             
                          new Noty({
                            theme:'relax',
                            text:"comment Created!",
                            type:'success',
                            layout:'topRight',
                            timeout:1500
                        }).show();
                    },
                    error:function(error){
                        console.log(error.responseText);
                    }
   
                });

             }

         )

    }

    //comment in dom
    let newCommentDom=function(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}">Delete</a>
                </small>
            ${comment.content}
            <br>
            <small>${comment.user.name}</small>
        </p>
    </li>`)
    }

    //delete comment
    let deleteComment=function(cdeleteLink){
      
        $(cdeleteLink).click(function(e){
            console.log(cdeleteLink);
            e.preventDefault();
        
            $.ajax({
                type:'get',
                url: $(cdeleteLink).prop('href'),
                success:function(data){
                    console.log('a')
                     $(`#comment-${data.data.comment_id}`).remove();
                     new Noty({
                        theme:'relax',
                        text:"comment deleted!",
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                     
                     
                },
                error:function(error){
                    console.log(error.responseText)
                }
            })
        });
        
    }


    createPost();
    console.log('in outer body')
    createComment();
    
}