'use strict';
const APICodes = require('../config/apiCodes');
const Product = require('../models/product');
const ProductService = require('../services/productService');
const BaseController = require('../controllers/baseController');

exports.getProductById = async function (request, response) {
    try {
        let productArrays = await ProductService.getProductById(request.params.id);
        if (productArrays && productArrays.length) {
            console.log("productController res.send", productArrays);
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Product successfully retrieved", productArrays);
        } else {
            console.log("productController getProductById product not found");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Product not found");
        }
    } catch (e) {
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

exports.getAllProducts = async function (request, response) {
    try {
        const productArrays = await ProductService.getAllProducts();
        if (productArrays && productArrays.length) {
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Products successfully retrieved", productArrays);
        } else {
            console.log("There is no products in database");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Products not found");
        }
    } catch (e) {
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};


exports.deleteAll = async function (request, response) {
    try {
        await Product.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Products successfully deleted from database");
    } catch (e) {
        console.error("Function deleteAll products controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};


// exports.deleteProduct = async function (request, response) {
//     try {
//         let productArrays = await Product.delete(request.params.productID);
//         if (productArrays && productArrays.length) {
//             return fillResponse(response, APICodes.SUCCESS, "Product successfully deleted");
//         } else {
//             console.log("productController deleteProduct product not found");
//             return fillResponse(response, APICodes.NOT_FOUND, "Product not found");
//         }
//
//     } catch (e) {
//         console.error("Function deleteAll products controller", e);
//         return fillResponse(response, APICodes.SERVER_ERROR, e.message);
//     }
// };