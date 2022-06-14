const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');

let transporter =nodemailer.createTransport(env.smtp);

let renderTemplate= (data,relativePath)=>{
    let mainHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),//relativePath is the place from this function is callled
        data,
        function(err,template){
            if (err){
            console.log('error in rendering the template',err);
            }
            mainHTML=template;
        }

    )
   return mainHTML;
}

module.exports ={
    transporter:transporter,
    renderTemplate:renderTemplate
}