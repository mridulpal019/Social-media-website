class ChatEngine{
    constructor(chatBoxId,userId,username){
        this.chatBox=$(`#${chatBoxId}`);
        this.userId=userId;
        this.username=username;

        this.socket =io.connect('http://localhost:5000')
        // ,{
        //     withCredentials:true,
        // });
        if (this.userId){
            this.connectionHandler();
        }

//         const io = require("socket.io-client");
// const socket = io("https://api.example.com", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });
    }
    connectionHandler(){
         let self=this;

        this.socket.on('connect',function(){
            console.log('connection i sestablised using sockets..')
            self.socket.emit("join_room",{
                user_id:self.userId,
                chatroom:'codeial'

            });
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            })
        });

        $('#send-message').click(function(){
            let msg= $('#chat-message-input').val();

            if(msg !=' '){
                $.ajax({
                    type: 'post',
                    url: '/chats/create',
                    data:{
                        msg:msg,
                        user_id:self.userId,
                        username:self.username
                    },
                    success: function(data){
                        console.log(data);
                        new Noty({
                            theme: 'relax',
                            text: "message send!",
                            type: 'success',
                            layout: 'bottomRight',
                            timeout: 500
                            
                        }).show();
    
                    }, error: function(error){
                        console.log(error.responseText);
                    }
                });
                self.socket.emit('send_message',{
                    message:msg,
                    user_id:self.userId,
                    messenger:self.username,
                    chatroom:'codeial'
                });
            }
        });


        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage=$('<li>');
            let messageType='other-message';
            if (data.user_id == self.userId){
                messageType='self-message';
                newMessage.append($('<span>',{
                    'html':data.message
                }));

            }else{

            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.append($('<br>'));
            newMessage.append($('<sub>',{
                'html':data.messenger
            }));
        }

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    
    
    }


}