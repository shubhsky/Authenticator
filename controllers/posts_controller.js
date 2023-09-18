const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    })
    .then(()=>{
        return res.redirect('back');
    })
    .catch((err)=>{
        if(err){
            console.log('Error in creating the post');
            return;
        }
    })
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id)
    .then((post)=>{
        // .id means convertion the object id into string
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post:req.params.id})
            .then(()=>{
                return res.redirect('back');
            }).catch((err)=>{
                console.log('Error in deleting the comment');
            })
        }else{
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.log('Error in deleting the post',err)
    });
}