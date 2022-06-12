{   

    //------ todo reflect chnge of friends number using ajax currently it will chnge on refresh as page loaded again-----------
     let addFriend=function(){
         $('.add-friend-button').click(function(e){
             e.preventDefault();


         $.ajax({
             method:'post',
             url:$('.add-friend-button').attr('href')
         })
         .done(function(data){
            $('.add-friend-button').remove();

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
        $('.remove-friend-button').click(function(e){
            e.preventDefault();
         $.ajax({
             method:'post',
             url:$('.remove-friend-button').attr('href')
        })
        .done(function(data){
            $('.remove-friend-button').remove();
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
        return $(`<a class="remove-friend-button" href="/friends/remove/${el}">
        Remove Friend
</a>`)
    }

    let add_addfriend_button=function(el){
        return $(`<a class="add-friend-button" href="/friends/add/${el}">
        Add Friend
</a>`
        ) 
    }

     addFriend();
     deleteFriend();
     

}

