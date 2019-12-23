'use strict';
let WebScraper = require('../webscrapper/webscrapper.js');

let TransformProductDataService = require('../transformservice/transformProductData.js');
let TransformReviewsDataService = require('../transformservice/transformReviewData.js');
let TransformQuestionsDataService = require('../transformservice/transformQuestionData.js');

let ProductService = require('../services/productService.js');
let ExtractService = require('../services/extractService.js');
let ReviewsService = require('../services/reviewService.js');
let QuestionsService = require('../services/questionService.js');


exports.createETLProcessAtOnce = async function (request, response) {
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
    response.send(responseArray);

};


exports.onlyExtractStep = async function (request, response) {
    let productId = request.body.productID;
    console.log("Only extract data productId: ", productId);
    await WebScraper.scrapData(productId);
    response.send(ExtractService.getWebScraperExtractionStatistics());
};


exports.onlyTransformStep = async function (request, response) {
    let productId = request.body.productID;
    let resultsProduct = await TransformProductDataService.transformProductDataFromDataExtracted(productId);
    let resultsReviews = await TransformReviewsDataService.transformReviewDataFromDataExtracted(productId);
    let resultsQuestions = await TransformQuestionsDataService.transformQuestionDataFromDataExtracted(productId);
    let responseArray = {
        resultsProduct: resultsProduct,
        resultsReviews: resultsReviews,
        resultsQuestions: resultsQuestions,
    };
    response.send(responseArray);
};

exports.onlyLoadStep = async function (request, response) {
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
    response.send(responseArray);
};