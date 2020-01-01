'use strict';
const APICodes = require('../config/apiCodes');
const BaseController = require('../controllers/baseController');
let WebScraper = require('../webscrapper/webscrapper.js');

let TransformProductDataService = require('../transformservice/transformProductData.js');
let TransformReviewsDataService = require('../transformservice/transformReviewData.js');
let TransformQuestionsDataService = require('../transformservice/transformQuestionData.js');

let ProductService = require('../services/productService.js');
let ExtractService = require('../services/extractService.js');
let ReviewsService = require('../services/reviewService.js');
let QuestionsService = require('../services/questionService.js');

/**
 * @category Controllers
 * @module clearDatabaseController
 */

/**
 * Create ETL process with one endpoint call; ETL process is proceeded step by step;
 * ETL process is ended by loading scrapped data to database;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with data, status and message;
 */
exports.createETLProcessAtOnce = async function (request, response) {
    try {
        let productId = request.body.productID;
        console.log("createETLProcessAtOnce productId: ", productId);

        await WebScraper.scrapData(productId);

        await TransformProductDataService.transformProductDataFromDataExtracted(productId);
        await TransformReviewsDataService.transformReviewDataFromDataExtracted(productId);
        await TransformQuestionsDataService.transformQuestionDataFromDataExtracted(productId);

        let resultsProduct = await ProductService.createOrUpdateProduct();

        let resultsReviews = await ReviewsService.createOrUpdateReviews();
        let resultsReviewsComments = await ReviewsService.createOrUpdateReviewsComments();

        let resultsQuestions = await QuestionsService.createOrUpdateQuestion();
        let resultsQuestionsAnswers = await QuestionsService.createOrUpdateQuestionAnswer();

        let responseArray = {
            resultsProduct: resultsProduct,
            resultsReviews: resultsReviews,
            resultsReviewsComments: resultsReviewsComments,
            resultsQuestions: resultsQuestions,
            resultsQuestionsAnswers: resultsQuestionsAnswers
        };
        return BaseController.fillResponse(response, APICodes.SUCCESS, "ETL Process ended successfully", responseArray);
    } catch (e) {
        console.error("Function createETLProcessAtOnce", e);
        return BaseController.fillResponse(response, APICodes.BAD_REQUEST, e.message);
    }
};

/**
 * Create only extract step from ETL process;
 * in this step web scraper extract data for given product ID;
 * Function save extracted data to local file;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with data, status and message;
 */
exports.onlyExtractStep = async function (request, response) {
    try {
        let productId = request.body.productID;
        console.log("Only extract step data productId: ", productId);
        await WebScraper.scrapData(productId);
        let responseArray = ExtractService.getWebScraperExtractionStatistics();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Extraction step ended successfully", responseArray);
    } catch (e) {
        console.error("Function onlyExtractStep", e);
        return BaseController.fillResponse(response, APICodes.BAD_REQUEST, e.message);
    }

};

/**
 * Create only transform step from ETL process;
 * in this step application is transforming extracted data and data is saved to separate local files;
 * Function can be successfully called only when the extraction step has ended with success;
 * After transformation step data from extraction step are removed from local files;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with data, status and message;
 */
exports.onlyTransformStep = async function (request, response) {
    try {
        let productId = request.body.productID;
        console.log("Only transform step data productId: ", productId);
        let resultsProduct = await TransformProductDataService.transformProductDataFromDataExtracted(productId);
        let resultsReviews = await TransformReviewsDataService.transformReviewDataFromDataExtracted(productId);
        let resultsQuestions = await TransformQuestionsDataService.transformQuestionDataFromDataExtracted(productId);
        let responseArray = {
            resultsProduct: resultsProduct,
            resultsReviews: resultsReviews,
            resultsQuestions: resultsQuestions,
        };
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Transformation step ended successfully", responseArray);
    } catch (e) {
        console.error("Function onlyTransformStep", e);
        return BaseController.fillResponse(response, APICodes.BAD_REQUEST, e.message);
    }
};

/**
 * Create only load step from ETL process;
 * in this step application is loading transformed data and save it to database;
 * Function can be successfully called only when transformation step has ended with success;
 * After loading data from transformation step are removed;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with data, status and message;
 */
exports.onlyLoadStep = async function (request, response) {
    try {
        console.log("Only load step data");

        let resultsProduct = await ProductService.createOrUpdateProduct();

        let resultsReviews = await ReviewsService.createOrUpdateReviews();
        let resultsReviewsComments = await ReviewsService.createOrUpdateReviewsComments();

        let resultsQuestions = await QuestionsService.createOrUpdateQuestion();
        let resultsQuestionsAnswers = await QuestionsService.createOrUpdateQuestionAnswer();

        let responseArray = {
            resultsProduct: resultsProduct,
            resultsReviews: resultsReviews,
            resultsReviewsComments: resultsReviewsComments,
            resultsQuestions: resultsQuestions,
            resultsQuestionsAnswers: resultsQuestionsAnswers
        };
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Load to database step ended successfully", responseArray);
    } catch (e) {
        console.error("Function onlyLoadStep", e);
        return BaseController.fillResponse(response, APICodes.BAD_REQUEST, e.message);
    }

};