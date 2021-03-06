const express=require('express');
const env =require('./config/environment');
const logger=require('morgan');

const cors=require('cors');
const cookieParser=require('cookie-parser');
const app=express()
require('./config/view-helpers')(app);

const port=process.env.PORT || 8000; //80 for production
const expressLayouts= require('express-ejs-layouts');
const db = require("./config/mongoose");
//auth part for pass port and express session(session cookie)
const session = require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//jwt for api verfication
const passportJWT=require('./config/passport-jwt-strategy');
//google auth
const passportGoogle =require('./config/passport-google-oauth-strategy');
const sassMiddleware=require('node-sass-middleware');
//flash set up
const flash= require('connect-flash');
const customMiddleware = require('./config/middleware');
//chating engine //setup the hat server t be used with socket.io
const charServer=require('http').Server(app);//http inbuilt module
const chatSockets=require('./config/chat_sockets').chatSockets(charServer);
charServer.listen(5000);//we have to use different port
console.log('chat server is listening to port 5000');
//body parser for decrpting form data
const bodyParser = require('body-parser');
const store = require('express-session');
const path =require('path');
app.use(cors());
if(  env.name ==='development'){
app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'scss'),
    dest:path.join(__dirname,env.asset_path,'css'),
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
 
}))
}


app.use(bodyParser.urlencoded({extended: false}));
const MongoStore=require('connect-mongo');
//middleware cookie
app.use(cookieParser());

 
//static files
app.use(express.static(env.asset_path));
//make the upload  path availaible to the user
app.use('/uploads',express.static(__dirname +'/uploads'));


app.use(logger(env.morgan.mode,env.morgan.Options))
//before route
app.use(expressLayouts);
//extract style adn scripts into the layott
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router 





//set up view engine
app.set('view engine','ejs');
app.set('views','./views');



//mongo store is used to store the session cookie in the cookire
//middleware for session cookie
app.use(session({
    name:'codeial',
    //chnge the secret before deploy in production
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }, 
    store :  MongoStore.create ({
        
            mongoUrl:`mongodb://localhost/${env.db}`,
            autoRemove:'disabled'
        
    },
    function(err){
        console.log(err || 'connect-mongodb set-up')
    }) 

}));

app.use(passport.initialize());
app.use(passport.session());
//checking whether any cookie is present or not
app.use(passport.setAuthenticatedUser);

//flash set up we have to put it after session use

app.use(flash());

app.use(customMiddleware.setFlash);

app.use('/',require('./routes'))

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port No. ${port}`)
})

