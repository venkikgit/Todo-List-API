const User = require('../model/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');



module.exports.signIn = catchAsyncErrors(async(req,res,next)=>{
    
    let user = await User.findOne({email:req.body.email});
    if (!user|| user.password != req.body.password) {
        return next(new ErrorHandler("Invalid email or password",401));
    }

    res.status(200).json({
        success: true,
        message: 'Sign in  Successfull,here is your token, please keep it safe',
        data:{
            token: jwt.sign(user.toJSON(),'todoAPI',{expiresIn: '1800000'})
        }
    })
})


//For creating the new user
// module.exports.create = catchAsyncErrors(async function (req, res,next) {
//     let user = await User.findOne({email: req.body.email});
//     if(user){
      
//         return next(new ErrorHandler("User already exists",403));
//     }

//     let userdata = new User({
//         email: req.body.email,
//         name: req.body.name,
//         password: req.body.password
//     });
//     await userdata.save();
//     return res.status(200).json({
//         data:{
//             user:userdata
//         },
//         message:"user created successfully"

//     })
// })