const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
//Register a User
exports.registerUser = catchAsyncErrors( async (req,res,next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const { name, email, password } = req.body;
    const user = await User.create ({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    sendToken(user, 201, res);
});
//Login User
exports.loginUser = catchAsyncErrors ( async (req,res,next) => {
    const { email, password } = req.body;
    //Check if user has given password and email both 
    if(!email || !password) {
        return next(new ErrorHander ("Please enter Email and Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user) {
        return next(new ErrorHander ("Invalid email or password", 401));
    }
    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHander ("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
});
//Logout User
exports.logout = catchAsyncErrors (async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date( Date.now()),
        httpOnly: true,
    });

    res.status(200).json ({
        sucess: true,
        message: "Logged Out"
    });
});
//Forgot Password
exports.forgotPassword = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander ("User not found", 404));
    }
    //Get Reset Password Token
    const resetToken =  user.getResetPasswordToken();
    await user.save({ validateBeforeSave:false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${ resetPasswordUrl } \n\nIf you have not requested this email then please ignore it`;
    
    try {
        await sendEmail ({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;     
        await user.save({ validateBeforeSave:false });

        return next(new ErrorHander (error.message, 500));
    };
});
//RESET PASSWORD
exports.resetPassword = catchAsyncErrors (async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex"); //Create Token Hash
    const user = await User.findOne({
        resetPasswordToken, resetPasswordExpire : { $gt: Date.now() },
    });
    if(!user) {
        return next( ErrorHander("Reset Password Token is invalid or hass been expired",400));
    };
    if(req.body.password !== req.body.password.confirmPassword ) {
        return next( ErrorHander("Password does not password",400));
    }
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save().

    sendToken(user, 200, res);
});
//GET USER DETAILS
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});
//UPDATE USER DETAILS
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next( new ErrorHander("Old password is incorret", 400));
    };
    if(req.body.newPassword !== req.body.confirmPassword) {
        return next( new ErrorHander("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
});
//UPDATE USER PROFILE
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    //We will add ordinary later
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});
//GET ALL USERS (Admin)
exports.getAllUser = catchAsyncErrors (async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});
//GET SINGLE USER (Admin)
exports.getSingleUser = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next( new ErrorHander (`User does not exist with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});
//UPDATE USER ROLE --ADMIN
exports.updateUserRole = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});
//DELETE USER --ADMIN
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    //We will remove ordinary later
    if(!user) {
        return next( new ErrorHander (`User does not exist with id: ${req.params.id}`));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});