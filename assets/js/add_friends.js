{
     let addFriend=function(){
         $('.friend-request>a').click(function(e){
             e.preventDefault();

        

         $.ajax({
             method:'post',
             url:$('.friend-request>a').attr('href')
         })
         .done(function(data){
            $(`.add-friend-button-${data.data.friendAdded}`).remove();

            let removeButton = add_remove_button(data.data.newFriend._id);
            $('.friend-request').prepend(removeButton);

            // $('.add-friend-button').html('Remove Friend');
            // $('.add-friend-button').attr("href",`/friends/remove/${data.data.newFriend._id}`);
            // $('.add-friend-button').attr("class","remove-friend-button");
            
            console.log('done');
            deleteFriend();

         })
         .fail(function(errData) {
            console.log('error in completing the request of add friend',errData);
        });
        })
     }


     let deleteFriend=function(){
         console.log('deleteFriends')
        $('.friend-request>a').click(function(e){
            e.preventDefault();
         $.ajax({
             method:'post',
             url:$('.friend-request>a').attr('href')
        })
        .done(function(data){
            $('.friend-request>a').remove();
            let addButton=add_addfriend_button(data.data.to_id);
            $('.friend-request').prepend(addButton);
            // $('.remove-friend-button').html('Add Friend');
            // $('.remove-friend-button').attr("href",`/friends/add/${data.data.to_id}`)
            // $('.remove-friend-button').attr("class", "add-friend-button");
            addFriend();
            console.log('done');
            
         })
         .fail(function(errData) {
            console.log('error in completing the request of delete friend',errData);
        });

     })
    }
    
    let add_remove_button=function(el){
        return $(`<a class="remove-friend-button-${el}" href="/friends/remove/${el}">
        Remove Friend
</a>`)
    }

    let add_addfriend_button=function(el){
        return $(`<a class="add-friend-button-${el}" href="/friends/add/${el}">
        Add Friend
</a>`
        ) 
    }

     addFriend();
     

}

