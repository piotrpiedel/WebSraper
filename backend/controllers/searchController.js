'use strict';
const querystring = require('querystring');
const Url = require('url');
const SearchService = require('../services/searchService');
const APICodes = require('../config/apiCodes');
const BaseController = require('../controllers/baseController');

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
