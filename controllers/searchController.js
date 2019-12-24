'use strict';
const querystring = require('querystring');
const Url = require('url');

let Product = require('../models/product.js');
let Review = require('../models/review.js');
let ReviewComment = require('../models/reviewComment.js');
let Question = require('../models/question.js');
let QuestionAnswer = require('../models/questionAnswer.js');


//http://localhost:3000/search/3082984?reviews=true&reviewscomment=true&questions=true&questionsanswers=true
exports.serchForProductData = async function getAllProductInformation(request, response) {
    let queryParsed = Url.parse(request.url, true).query;
    let responseArray = {};
    let product;
    const params = request.params;
    if (params.productID) {
        responseArray.productInfromations = await Product.getProductById(params.productID);
    } else throw "Product id must not be empty";
    let reviews;
    if (queryParsed.reviews) {
        reviews = await Review.getAllReviewsByProductID(params.productID);
        responseArray.reviews = reviews;
    }
    if (queryParsed.reviewscomment && reviews) {
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
    if (queryParsed.questions) {
        questions = await Question.getAllByProductID(params.productID);
        responseArray.questions = questions;
    }
    if (queryParsed.questionsanswers && questions) {
        let questionsAnswersArray = [];
        for (const question of questions) {
            let questionAnswer = await QuestionAnswer.getAllByQuestionID(params.productID);
            if (questionAnswer && questionAnswer.length) {
                questionsAnswersArray.push(questionAnswer);
            }
        }
        responseArray.questionsAnswers = questionsAnswersArray;
    }
    response.send(responseArray);
};
