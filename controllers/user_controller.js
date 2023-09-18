const User = require('../models/user');

module.exports.profile = function(req,res){
        User.findById(req.params.id).then((user)=>{
            return res.render('user_profile',{
                title: 'User Profile',
                // We can not use user key instead of profile_user as that key is already in locals
                profile_user:user
            });
        });

};

module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email})
        .then((user)=>{
            return res.redirect('back');
        }).catch((err)=>{
            console.log("error in updating user's profile");
            return;
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}


// Reder the signUp page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    });
};

// Reder the signIn page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    });
};


// get the sign up data

// CREATED BY USING PROMISES
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email})
        .then( (user) =>{
            if(user){
                console.log("SignIn executed",user);
                return res.redirect('/users/sign-in');
            }else{
                User.create(req.body)
                    .then(()=>{
                        res.redirect('/users/sign-in')
                    })
                    .catch((err)=>{
                        console.log('errors in creating users_--->',err);
                        return;
                    })
            }
        })
        .catch( ()=>{
            console.log("SignUp executed");
            return res.redirect('/users/sign-up')
        })
    

}

// CREATED BY USING CALLBACK
// module.exports.create = function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email:req.body.email},function(err,user){
//         if(err){
//             console.log('error in creating use while Signin Up');
//             return;
//         }
//         if(!user){
//             User.create(req.body,function(err,user){
//                 if(err){
//                     console.log('error in creating user while signing up');
//                     return;
//                 }
//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back')
//         }
//     })

// }




//Sign in and create a session for the use
module.exports.createSession = function(req,res){
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    // logOut function is given by passport.js
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    });
}