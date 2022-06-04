const nodemailer=require('../config/nodemailer');


exports.newComment =(comment)=> {
    console.log('Inside new comment mailer');

    nodemailer.transporter.sendMail({
        from:'mridulpal1919@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published!",
        html:"<h1>Yup ,your comment is publisde</h1>"
    },(err,info)=>{
        if(err){console.log('error in sending mail',err);return}

        console.log("message sent",info);
        return;

    })
}