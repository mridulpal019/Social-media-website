const nodemailer=require('../config/nodemailer');


exports.newComment =(comment)=> {
    // console.log('Inside new comment mailer');
     let htmlString =nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:'mridulpal1917@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published!",
        html:htmlString,
    },(err,info)=>{
        if(err){console.log('error in sending mail',err);return}

        console.log("message sent",info);
        return;

    })
}