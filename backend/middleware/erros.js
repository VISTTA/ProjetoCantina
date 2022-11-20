//Backend Error Handling
const ErrorHander = require("../utils/errorHander");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error ";
    //Wrong MongoDB Id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    };
    //Mongoose duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message,400);
    };
    //Wrong TWTToken error
    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHander(message, 400);
    };
    //JWT Expire error
    if(err.name === "tokenExpireError   ") {
        const message = `Web Token is Expired, try again`;
        err = new ErrorHander(message, 400);
    };
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};