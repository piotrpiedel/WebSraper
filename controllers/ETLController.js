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