'use strict';
const ProductService = require('../services/productService');
const APICodes = require('../config/apiCodes');
const BaseController = require('../controllers/baseController');

/**
 * @category Controllers
 * @module clearDatabaseController
 */

/**
 * Clear database by deleting all products with cascade on delete foreign keys
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object;
 */
exports.clearDatabase = async function clearDatabaseCascade(request, response) {
    try {
        await ProductService.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "All data has been successfully deleted from database");
    } catch (e) {
        console.error("Clear databaseController function clearDatabase", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};