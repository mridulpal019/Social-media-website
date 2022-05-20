const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/codeial_devolopment_db");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting with database"));

db.once('open',function(){
    console.log("connected to database")
})


module.exports = db;