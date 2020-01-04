'use strict';
const querystring = require('querystring');
const Url = require('url');
const SearchService = require('../services/searchService');
const ProductService = require('../services/productService');
const APICodes = require('../config/apiCodes');
const BaseController = require('../controllers/baseController');

/**
 * @category Controllers
 * @module searchController
 */

/**
 * @example
 * GET
 * http://localhost:3000/search?product=3082984&reviews=false&reviewscomment=true&questions=true&questionsanswers=true
 *
 * Search for product data; Send operation result to an endpoint;
 * @param  {Request} request Request has to contain productID in search query;
 * the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 *
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 * Will return review comments only when query search also for reviews
 * Will return question answer only when query search also for questions
 */

// http://localhost:3000/search?product=3082984&reviews=false&reviewscomment=true&questions=true&questionsanswers=true
exports.serchForProductData = async function getAllProductInformation(request, response) {
    try {
        let queryParsed = Url.parse(request.url, true).query;
        let responseArray = {};
        let productID = queryParsed.product;
        await SearchService.searchProductData(productID, responseArray);
        await SearchService.searchReviewsAndReviewsComments(queryParsed, productID, responseArray);
        await SearchService.searchQuestionsAndQuestionAnswers(queryParsed, productID, responseArray);
        return BaseController.fillResponse(response,
            APICodes.SUCCESS,
            "Search successfully retrieved data",
            responseArray);
    } catch (e) {
        console.error("Function searchForProductData", e);
        return BaseController.fillResponse(response, APICodes.SUCCESS, e.message);
    }
};

/**
 * @example
 * GET
 * http://localhost:3000/search/all
 *
 * Search for all database from database; Send operation result to an endpoint;
 * @param  {Request} request Request has to contain productID in search query;
 * the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 *
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 * Will return all data stored in database
 */
exports.searchForAllDataFromDatabase = async function searchForAllDataFromDatabase(request, response) {
    try {
        let responseArray = {};
        await SearchService.searchForAllData(responseArray);
        return BaseController.fillResponse(response,
            APICodes.SUCCESS,
            "Search successfully retrieved all data",
            responseArray);
    } catch (e) {
        console.error("Function searchForAllDataFromDatabase", e);
        return BaseController.fillResponse(response, APICodes.SUCCESS, e.message);
    }
};

/**
 * @example
 * GET
 * http://localhost:3000/search/productids
 *
 * Search for all product ids from from database; Send operation result to an endpoint;
 * @param  {Request} request Request has to contain productID in search query;
 * the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 *
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 * Will return all product ids stored in database
 */
exports.searchForAllProductsOnlyID = async function searchForAllDataFromDatabase(request, response) {
    try {
        let responseArray = {};
        responseArray.productids = await ProductService.getAllProductsIds();
        return BaseController.fillResponse(response,
            APICodes.SUCCESS,
            "Search successfully retrieved all product ids",
            responseArray);
    } catch (e) {
        console.error("Function searchForAllProductsOnlyID", e);
        return BaseController.fillResponse(response, APICodes.SUCCESS, e.message);
    }
};