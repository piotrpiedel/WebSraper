'use strict';
const querystring = require('querystring');
const Url = require('url');

let Product = require('../models/product.js');
let Review = require('../models/review.js');
let ReviewComment = require('../models/reviewComment.js');
let Question = require('../models/question.js');
let QuestionAnswer = require('../models/questionAnswer.js');

function parseBooleanFromParamters(value) {
    return value === "true" ? true : false
}

// http://localhost:3000/search?product=3082984&reviews=false&reviewscomment=true&questions=false&questionsanswers=true
exports.serchForProductData = async function getAllProductInformation(request, response) {
    try {
        let queryParsed = Url.parse(request.url, true).query;
        console.log("quesryParsed", queryParsed);
        let responseArray = {};
        let productID = queryParsed.product;
        if (productID) {
            responseArray.productInfromations = await Product.getProductById(productID);
        } else throw "Product id must not be empty";
        let reviews;
        if (parseBooleanFromParamters(queryParsed.reviews)) {
            console.log("queryParsed.reviews", queryParsed.reviews);
            reviews = await Review.getAllReviewsByProductID(productID);
            responseArray.reviews = reviews;
        }
        if (parseBooleanFromParamters(queryParsed.reviewscomment) && reviews) {
            let reviewsCommentsArray = [];
            for (const review of reviews) {
                let reviewComment = await ReviewComment.getAllByReviewID(review.id);
                if (reviewComment && reviewComment.length) {
                    reviewsCommentsArray.push(reviewComment);
                }
            }
            responseArray.reviewsComments = reviewsCommentsArray;
        }
        let questions;
        if (parseBooleanFromParamters(queryParsed.questions)) {
            questions = await Question.getAllByProductID(productID);
            responseArray.questions = questions;
        }
        if (parseBooleanFromParamters(queryParsed.questionsanswers) && questions) {
            let questionsAnswersArray = [];
            for (const question of questions) {
                let questionAnswer = await QuestionAnswer.getAllByQuestionID(question.id);
                if (questionAnswer && questionAnswer.length) {
                    questionsAnswersArray.push(questionAnswer);
                }
            }
            responseArray.questionsAnswers = questionsAnswersArray;
        }
        response.send(responseArray);
    } catch (exception) {
        console.error("Function serchForProductData", exception);
        response.send(JSON.stringify({error: exception}));
    }
};
