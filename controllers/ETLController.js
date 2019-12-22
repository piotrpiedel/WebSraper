'use strict';

// let Product = require('../models/product.js');

let WebScraper = require('../webscrapper/webscrapper.js');

let TransformProductDataService = require('../transformservice/transformProductData.js');
let TransformReviewsDataService = require('../transformservice/transformReviewData.js');
let TransformQuestionsDataService = require('../transformservice/transformQuestionData.js');
let ProductService = require('../services/productService.js');
let ReviewsService = require('../services/reviewService.js');
let QuestionsService = require('../services/questionService.js');

exports.createETLProcessAtOnce = async function (request, response) {
    let productId = request.body.productID;
    console.log("createETLProcessAtOnce productId: ", productId);
    await WebScraper.scrapData(productId);
    console.log("success scrap data should be done: ", productId);

    await TransformProductDataService.transformProductDataFromDataExtracted(productId);
    console.log("TransformProductDataService.transformProductDataFromDataExtracted : ", productId);

    await TransformReviewsDataService.transformReviewDataFromDataExtracted(productId);
    console.log("TransformReviewsDataService.transformReviewDataFromDataExtracted : ", productId);

    await TransformQuestionsDataService.transformQuestionDataFromDataExtracted(productId);
    console.log("TransformQuestionsDataService.transformQuestionDataFromDataExtracted : ", productId);

    let resultsProduct = await ProductService.createOrUpdateProduct();
    console.log("ProductService.createOrUpdateProduct results: ", resultsProduct);
    response.write(JSON.stringify(resultsProduct));

    let resultsReviews = await ReviewsService.createOrUpdateReviews();
    console.log("ReviewsService.createOrUpdateReviews results: ", resultsReviews);
    response.write(JSON.stringify(resultsReviews));
    let resultsReviewsComments = await ReviewsService.createOrUpdateReviewsComments();
    console.log("ReviewsService.createOrUpdateReviewsComments results: ", resultsReviewsComments);
    response.write(JSON.stringify(resultsReviewsComments));

    let resultsQuestions = await QuestionsService.createOrUpdateQuestion();
    console.log("QuestionsService.createOrUpdateQuestion results: ", resultsQuestions);
    response.write(JSON.stringify(resultsQuestions));
    let resultsQuestionsAnswers = await QuestionsService.createOrUpdateQuestionAnswer();
    console.log("QuestionsService.createOrUpdateQuestionAnswer results: ", resultsQuestionsAnswers);
    response.write(JSON.stringify(resultsQuestionsAnswers));

    response.send();

};
