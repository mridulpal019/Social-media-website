{let e=function(){$(".add-friend-button").click((function(e){e.preventDefault(),$.ajax({method:"post",url:$(".add-friend-button").attr("href")}).done((function(e){$(".add-friend-button").remove();let t=o(e.data.newFriend._id);$(".friend-request").prepend(t),console.log("done"),n()})).fail((function(e){console.log("error in completing the request of add friend",e)}))}))},n=function(){console.log("deleteFriends"),$(".remove-friend-button").click((function(n){n.preventDefault(),$.ajax({method:"post",url:$(".remove-friend-button").attr("href")}).done((function(n){$(".remove-friend-button").remove();let o=t(n.data.to_id);$(".friend-request").prepend(o),e(),console.log("done")})).fail((function(e){console.log("error in completing the request of delete friend",e)}))}))},o=function(e){return $(`<a class="remove-friend-button" href="/friends/remove/${e}">\n        Remove Friend\n</a>`)},t=function(e){return $(`<a class="add-friend-button" href="/friends/add/${e}">\n        Add Friend\n</a>`)};e(),n()}