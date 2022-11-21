//Product Model
const mongoose = require('mongoose');
const productSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Por favor, digite o nome do produto."],
        trim: true
    },
    description: {
        type: String,
        required: [true ,"Por favor, digite a descrição do produto."]
    },
    oldPrice: {
        type: String,
        required: [true, "Por favor, informe o valor antigo do produto."],
        maxLength: [15, "O preço não pode exceder mais de 15 caracteres."],
    },
    price: {
        type: String,
        required: [true, "Por favor, informe o preço do produto."],
        maxLength: [15, "O preço não pode exceder mais de 15 caracteres."]
    },
    installmmentPrice: {
        type: String,
        required: [true, "Por favor, informe o valor do produto parcelado."],
        maxLength: [15, "O preço não pode exceder mais de 15 caracteres."],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Por favor, informe a categoria do produto."],
    },
    Stock: {
        type: Number,
        required: [true, "Por favor, informe a quantidade que possui em estoque do produto."],
        maxLength: [4, "Limite máximo de 4 caracteres para informar o estoque do produto."],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Product", productSchema);




