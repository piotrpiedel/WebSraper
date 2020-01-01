'use strict';
const APICodes = require('../config/apiCodes');
const Review = require('../models/review');
const ReviewService = require('../services/reviewService');
const BaseController = require('../controllers/baseController');

/**
 * @category Controllers
 * @module reviewController
 */

/**
 * Get review entity by id from database; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 */
exports.getReviewById = async function (request, response) {
    try {
        let data = await ReviewService.getReviewById(request.params.id);
        if (data && data.length) {
            console.log("reviewController res.send", data);
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Review successfully retrieved", data);
        } else {
            console.log("reviewController getReviewById review not found");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Review not found");
        }
    } catch (e) {
        console.error("Function getReviewById controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

/**
 * Get review entity by id with all comments connected to review from database; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 */
exports.getReviewByIdWithAllComments = async function (request, response) {
    try {
        let data = await ReviewService.getReviewByIdWithAllComments(request.params.id);
        if (data.review.length) {
            console.log("reviewController getReviewByIdWithAllComments", data);
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Review with comments successfully retrieved", data);
        } else {
            console.log("reviewController getReviewByIdWithAllComments review not found");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Review not found");
        }
    } catch (e) {
        console.error("Function getReviewById controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

/**
 * Get all review entities from database; Send result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 */
exports.getAllReviews = async function (request, response) {
    try {
        const data = await ReviewService.getAllReviews();
        if (data && data.length) {
            return BaseController.fillResponse(response, APICodes.SUCCESS, "Reviews successfully retrieved", data);
        } else {
            console.log("There is no reviews in database");
            return BaseController.fillResponse(response, APICodes.NOT_FOUND, "Reviews not found");
        }
    } catch (e) {
        console.error("Function getAllReviews controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

/**
 * Delete all review entities from database; Send operation result to an endpoint;
 * @param  {Request} request the req object represents the HTTP request and has properties
 * for the request query string, parameters, body, HTTP headers, and so on;
 * For more see: https://expressjs.com/en/api.html#req
 * @param  {Response} response the res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * For more see: https://expressjs.com/en/api.html#res
 * @return {Response} return response object filled with status and message and data;
 */
exports.deleteAll = async function (request, response) {
    try {
        await Review.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Reviews successfully deleted from database");
    } catch (e) {
        console.error("Function deleteAll reviews controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

