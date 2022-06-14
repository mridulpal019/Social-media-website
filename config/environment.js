const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory =path.join(__dirname,'../producion_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


const accessLogStream=rfs.createStream('access.log',{
    interval:"1d",
    path:logDirectory,
});
const development={
    name:'development',
    asset_path:"./assets",
    session_cookie_key:"mridulll",
    db:'codeial_devolopment_db',
    smtp:{
        service:'gmail',
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:'mridulpal1917@gmail.com',
            pass:'----'
        }
    
    },
    goggle_client_id:"227730572170-gpur4ct3tqtolfnknld598qc86g9sr1i.apps.googleusercontent.com",//from app
    goggle_client_Secret:"--------",//from google
    goggle_callbackURL:"http://localhost:8000/users/auth/google/callback" ,//callbackurl mathcing from developers.google 
    jwt_secret:'Sometthing',
    morgan:{
        mode:'dev',
        Options:{stream:accessLogStream}
    }

};

const production={
    name:'production',
    asset_path:process.env.codeial_asset_path,
    session_cookie_key:process.env.Codeial_Session_cookie_Key,
    db:process.env.Codeial_db,
    smtp:{
        service:'gmail',
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.Codeial_Gmail_Username,
            pass:process.env.Codeial_Gmail_passwd
        }
    
    },
    goggle_client_id:process.env.Codeial_Goggle_Client_id,//from app
    goggle_client_Secret:process.env.Codeial_Goggle_Clinet_Secret,//from google
    goggle_callbackURL:process.env.Codeial_Goggle_CallbackURL ,//callbackurl mathcing from developers.google 
    jwt_secret:process.env.Codeial_Jwt_Key,
    morgan:{
        mode:'combined',
        Options:{stream: accessLogStream}
    }
};


module.exports =development
// eval(process.env.Codeial_ENV) == undefined ? development : eval(process.env.Codeial_ENV);