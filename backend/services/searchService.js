'use strict';

let Product = require('../models/product.js');
let Review = require('../models/review.js');
let ReviewComment = require('../models/reviewComment.js');
let Question = require('../models/question.js');
let QuestionAnswer = require('../models/questionAnswer.js');

/**
 * @category Services
 * @module searchService
 */

/**
 * Parse String to Boolean value object
 * @param  {String} value String value to parse to boolean
 * @return {Boolean} return true or false based on passed String object
 */
function parseBooleanFromParameters(value) {
    return value === "true" ? true : false
}

/**
 * Search for product data
 * @param  {Number} productID String value to parse to boolean
 * @param  {Object} responseArray object which will be filled with product information
 */
exports.searchProductData = async function searchProductData(productID, responseArray) {
    if (productID) {
        responseArray.productInfromations = await Product.getProductById(productID);
    } else throw "Product id must not be empty";
};

/**
 * Parse String to Boolean value object
 * @param  {Object} queryParsed object of parsed query string
 * @param  {Number} productID product id for which will be searched all data
 * @param  {Object} responseArray object which will be filled with reviews and review comments based on given query parameters
 */
exports.searchReviewsAndReviewsComments = async function searchReviewsAndReviewsComments(queryParsed, productID, responseArray) {
    let reviews;
    if (parseBooleanFromParameters(queryParsed.reviews)) {
        reviews = await Review.getAllReviewsByProductID(productID);
        responseArray.reviews = reviews;
    }
    if (parseBooleanFromParameters(queryParsed.reviewscomment) && reviews) {
        let reviewsCommentsArray = [];
        for (const review of reviews) {
            let reviewComment = await ReviewComment.getAllByReviewID(review.id);
            if (reviewComment && reviewComment.length) {
                reviewsCommentsArray.push(reviewComment);
            }
        }
        responseArray.reviewsComments = reviewsCommentsArray;
    }
};

/**
 * Search for questions and question answers
 * @param  {Object} queryParsed object of parsed query string
 * @param  {Number} productID product id for which will be searched all questions and question answers
 * @param  {Object} responseArray object which will be filled with questions and questions answers based on given query parameters
 */
exports.searchQuestionsAndQuestionAnswers = async function searchQuestionsAndQuestionAnswers(queryParsed, productID, responseArray) {
    let questions;
    if (parseBooleanFromParameters(queryParsed.questions)) {
        questions = await Question.getAllByProductID(productID);
        responseArray.questions = questions;
    }
    if (parseBooleanFromParameters(queryParsed.questionsanswers) && questions) {
        let questionsAnswersArray = [];
        for (const question of questions) {
            let questionAnswer = await QuestionAnswer.getAllByQuestionID(question.id);
            if (questionAnswer && questionAnswer.length) {
                questionsAnswersArray.push(questionAnswer);
            }
        }
        responseArray.questionsAnswers = questionsAnswersArray;
    }
};

/**
 * Search for all data from database
 * @param  {Object} responseArray object which will be filled with all data selected from database
 */
exports.searchForAllData = async function searchQuestionsAndQuestionAnswers(responseArray) {
    responseArray.products = await Product.getAllProducts();
    responseArray.questions = await Question.getAll();
    responseArray.questionsAnswers = await QuestionAnswer.getAllQuestionAnswers();
    responseArray.review = await Review.getAll();
    responseArray.reviewsComments = await ReviewComment.getAll();
};