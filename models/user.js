const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // if any error comes try replacing email by usernamefield
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
//timestamps true are used for having update on time and date of creation and updatation of document
});

const User = mongoose.model('User',userSchema);

module.exports=User;