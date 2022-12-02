const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors (async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next(new ErrorHander ("Por favor, entre em sua conta ou registre-se.", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);  
    next();
});
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes (req.user.role)) {
            return next (new ErrorHander(`Role: ${req.user.role} Você não tem autorização para executar essa tarefa.`, 403)); 
        };
        next();
    };
};