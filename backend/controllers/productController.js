'use strict';
const APICodes = require('../config/apiCodes');
const Product = require('../models/product');
const ProductService = require('../services/productService');
const BaseController = require('../controllers/baseController');

/**
 * @category Controllers
 * @module productController
 */

/**
 * Get product entity by id from database; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message, and optional data;
 */
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

/**
 * Get all product entities from database; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with data, status and message;
 */
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

/**
 * Delete all product entities from database; Send operation result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message;
 */
exports.deleteAll = async function (request, response) {
    try {
        await Product.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Products successfully deleted from database");
    } catch (e) {
        console.error("Function deleteAll products controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};