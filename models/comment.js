const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    user:{
        // linking the post to user, comment belong to user
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        // linking the post to user, comment belong to user
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;