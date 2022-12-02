const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connectDataBase = require("./config/database.js");
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down to server duo to Uncaught Exceptions Rejection`);
    process.exit(1);    
})
//config
dotenv.config({path:"backend/config/config.env"});
//Connecting to dataBase
connectDataBase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, ()  => {
    console.log(`Server is Working on http://localhost:${process.env.PORT}`);
});
//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down to server duo to Unhandled Promise Rejection`);
    
    server.close(() => {
        process.exit(1);
    });
});