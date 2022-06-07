const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter =nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:'mridulpal1917@gmail.com',
        pass:'ksouqwhnjlipcyiv'
    }

});

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