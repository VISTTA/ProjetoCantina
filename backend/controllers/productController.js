const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
//Criar produto --Role Admin
exports.createProduct = catchAsyncErrors (async (req,res,next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json( {
        success: true,
        product
    }); 
});
//Get todos os produtos.
exports.getAllProducts = catchAsyncErrors(async(req,res,next) => {
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

    apiFeature.pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        // test API -> message:"Rota está normal"
        success: true,
        products,
        productsCount,
        resultPerPage,
    });
});
//Get Detalhes do produto
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHander("Produto não encontrado",404));
        }
        res.status(200).json({
            success: true,
            product,
        });
    });
//Update Produtos --Admin
exports.updateProduct = catchAsyncErrors(async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHander("Produto não encontrado",404));
        }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    });
    res.status(200).json ({
        success:true,
        product
    });
});
//Deletar Produto
exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHander("Produto não encontrado",404));
        }
    await product.remove();
    res.status(200).json( {
        success: true,
        message: "Produto removido com sucesso."
    });
});
//Criar novas reviews ou editar 
exports.createProductReview = catchAsyncErrors(async(req,res,next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if(isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())(rev.rating = rating), (rev.comment = comment);
        });
    }else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.lenght;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;  
    });
    product.ratings = avg / product.reviews.lenght;

    await product.save({ validateBeforeSave:false });

    res.status(200).json({
        success:true,
    });
});
//GET TODOS OS REVIEWS DOS PRODUTOS
exports.getProductReviews = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHander("Produto não encontrado", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});
//DELETAR REVIEW 
exports.deleteReview = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHander("Produto não encontrado.", 404));
    }
    
    const reviews = product.reviews.filter( rev => rev._id.toString() !== req.query.id.toString);

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    const ratings = avg / reviews.lenght;
    const numOfReviews = reviews.lenght;

    await Product.findByIdAndUpdate(req.query.productId), { reviews, ratings, numOfReviews },{
        new: true,
        runValidators: true, 
        useFindAndModify: false,
    }

    res.status(200).json({
        success: true,
    });
});