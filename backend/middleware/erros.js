//TRATAMENTO DE ERROS DO BACKEND
const ErrorHander = require("../utils/errorHander");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Erro interno do servidor ";
    //MongoDB Erros ID
    if(err.name === "CastError") {
        const message = `Recurso não encontrado. Inválido: ${err.path}`;
        err = new ErrorHander(message, 400);
    };
    //Mongoose erro de chave duplicada
    if(err.code === 11000) {
        const message = `Duplicado ${Object.keys(err.keyValue)} digitado`;
        err = new ErrorHander(message,400);
    };
    //TWTToken erros
    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token é invalido, tente novamente.`;
        err = new ErrorHander(message, 400);
    };
    //JWT Expire error
    if(err.name === "tokenExpireError   ") {
        const message = `Web Token is Expirado, tente novamente.`;
        err = new ErrorHander(message, 400);
    };
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};