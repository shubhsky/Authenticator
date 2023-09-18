const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = function(req,res){
    // Checking cookie data
    // console.log(req.cookies);
    // changing cookie in response
    // res.cookie('user_id',25);
    // Post.find({}).then((posts)=>{
    //     return res.render('home',{
    //         title:"Codial| Home",
    //         posts:posts
    //     });
    // })

    // Populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec()
    .then((posts)=>{
        User.find().then((users)=>{
            // console.log(posts)
            return res.render('home',{
                title:"Codeial | Home",
                posts:posts,
                all_users:users
            });
        })
    })
    
    
};


// module.exports.actionName = function(req,res){}