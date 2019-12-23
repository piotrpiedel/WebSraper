'use strict';
let WebScraper = require('../webscrapper/webscrapper.js');

let TransformProductDataService = require('../transformservice/transformProductData.js');
let TransformReviewsDataService = require('../transformservice/transformReviewData.js');
let TransformQuestionsDataService = require('../transformservice/transformQuestionData.js');

let ProductService = require('../services/productService.js');
let ExtractService = require('../services/extractService.js');
let ReviewsService = require('../services/reviewService.js');
let QuestionsService = require('../services/questionService.js');

// http://localhost:3000/etl/
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "123"
// }
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


// http://localhost:3000/etl/onlyextract
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "123"
// // }
exports.onlyExtractStep = async function (request, response) {
    let productId = request.body.productID;
    console.log("Only extract data productId: ", productId);
    await WebScraper.scrapData(productId);
    response.send(ExtractService.getWebScraperExtractionStatistics());
};

// http://localhost:3000/etl/onlyTransformStep
//[{"key":"Content-Type","name":"Content-Type","value":"application/json","description":"","type":"text"}]
// {
//     "productID": "123"
// // }
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
