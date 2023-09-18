const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = function(req,res){
    // console.log(req.body);
    // console.log(req.user);
    // coz in home.ejs we are passing the value of id by name post
    Post.findById(req.body.post)
        .then((post)=>{
            if(post){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                })
                .then((comment)=>{
                    console.log('comment added successfully');
                    // Adding comment to the post|UPDATE
                    // it will automatically fetch out id and push
                    post.comments.push(comment);
                    // saving the final version to the database with everyupdate we should do that;
                    post.save();
                    return res.redirect('/');
                })
            }
        }).catch((err)=>{
            console.log("Post doesn't exist in which you are trying to add comment");
        })
}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id)
    .then((comment)=>{
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
            .then(()=>{
                return res.redirect('back');
            })
            .catch((err)=>{
                console.log('error in deleting the comment');
                return
            })
        }else{
            return res.redirect('back');
        }
    })
}