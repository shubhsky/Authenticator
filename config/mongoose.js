const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_developement_passportjs');

const db= mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to MongoDb"));

db.once('open',function(){
    console.log('Connected to Database::MongoDb');
});

module.exports=db;