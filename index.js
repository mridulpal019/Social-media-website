const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000; //80 for production
const expressLayouts= require('express-ejs-layouts');
const db = require("./config/mongoose");
//auth part for pass port and express session(session cookie)
const session = require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//
const sassMiddleware=require('node-sass-middleware');
//flash set up
const flash= require('connect-flash');
const customMiddleware = require('./config/middleware');

//body parser for decrpting form data
const bodyParser = require('body-parser');
const store = require('express-session');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
 
}))


app.use(bodyParser.urlencoded({extended: false}));
const MongoStore=require('connect-mongo');
//middleware cookie
app.use(cookieParser());

 
//static files
app.use(express.static("./assets"))
//make the upload  path availaible to the user
app.use('/uploads',express.static(__dirname +'/uploads'));
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
    secret:"mridulll",
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }, 
    store :  MongoStore.create ({
        
            mongoUrl:'mongodb://localhost/codeial_devolopment_db',
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

