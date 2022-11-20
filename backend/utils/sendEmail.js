const nodeMailer = require("nodemailer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("./errorHander");
const dotenv = require("dotenv").config();

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport ({
        host: process.env.HOST,
        port: process.env.PORTEMAIL,
        secure: true,
        auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;