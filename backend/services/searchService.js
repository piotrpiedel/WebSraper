'use strict';

let Product = require('../models/product.js');
let Review = require('../models/review.js');
let ReviewComment = require('../models/reviewComment.js');
let Question = require('../models/question.js');
let QuestionAnswer = require('../models/questionAnswer.js');


function parseBooleanFromParameters(value) {
    return value === "true" ? true : false
}

exports.searchProductData = async function searchProductData(productID, responseArray) {
    if (productID) {
        responseArray.productInfromations = await Product.getProductById(productID);
    } else throw "Product id must not be empty";
};

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


