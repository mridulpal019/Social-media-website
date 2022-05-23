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

//body parser for decrpting form data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//middleware cookie
app.use(cookieParser());


//static files
app.use(express.static("./assets"))

//before route
app.use(expressLayouts);
//extract style adn scripts into the layott
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router 





//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

//middleware for session cookie
app.use(session({
    name:'codeial',
    //chnge the secret before deploy in production
    secret:"mridulll",
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'))

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port No. ${port}`)
})

