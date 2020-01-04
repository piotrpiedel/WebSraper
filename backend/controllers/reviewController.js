'use strict';
const APICodes = require('../config/apiCodes');
const Review = require('../models/review');
const ReviewService = require('../services/reviewService');
const BaseController = require('../controllers/baseController');

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

exports.deleteAll = async function (request, response) {
    try {
        await Review.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "Reviews successfully deleted from database");
    } catch (e) {
        console.error("Function deleteAll reviews controller", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};

