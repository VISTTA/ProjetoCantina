const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connectDataBase = require("./config/database.js");
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Conexão com instabilidade, o servidor irá ser fechado, tente novamente mais tarde.`);
    process.exit(1);    
})
//config
dotenv.config({path:"backend/config/config.env"});
//Metodo para conexão do banco de dados
connectDataBase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, ()  => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Conexão com instabilidade, o servidor irá ser fechado, tente novamente mais tarde.`);
    
    server.close(() => {
        process.exit(1);
    });
});