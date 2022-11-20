//Product Model
const mongoose = require('mongoose');
const productSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Pleaser enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true ,"Please enter product description"]
    },
    oldPrice: {
        type: String,
        required: [true, "Please enter old price product"],
        maxLength: [15, "Price cannot exceed 8 characters"],
    },
    price: {
        type: String,
        required: [true, "Please enter product price"],
        maxLength: [15, "Price cannot exceed 8 characters"]
    },
    installmmentPrice: {
        type: String,
        required: [true, "Please enter product installmmente Price"],
        maxLength: [15, "Price canoot exceed 15 characters"],
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
        required: [true, "Please enter product category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
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




