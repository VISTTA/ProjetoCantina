const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema ( {
    name: {
        type: String,
        required: [true, "Por favor, informe o nome."],
        maxLength: [30, "Nome não pode exceder mais que 30 caracteres."],
        minLength: [4, "Nome não pode ser menor que 4 caracteres."],
    },
    email: {
        type: String,
        required: [true, "Por favor, informe o seu e-mail."],
        unique: [true],
        validate: [validator.isEmail, "Por favor, informe um e-mail válido."],
    },
    password: {
        type: String,
        required: [true, "Por favor, digite sua senha."],
        minLength: [8, "A senha não pode ser menor que 8 caracteres."],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            require: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
userSchema.pre("Save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { //Can Create tons of admin fake account
        expiresIn: process.env.JWT_EXPIRE,
    }); 
};
//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function() {
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};
module.exports = mongoose.model("User", userSchema);