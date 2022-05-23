const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000; //80 for production
const expressLayouts= require('express-ejs-layouts');
const db = require("./config/mongoose");
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



app.use('/',require('./routes'))

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port No. ${port}`)
})

