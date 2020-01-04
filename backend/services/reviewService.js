'use strict';
const Review = require("../models/review");
const ReviewComment = require("../models/reviewComment");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");
const fileAndFolderNames = require("../config/folderAndFilesNames");

/**
 * @category Services
 * @module reviewService
 */

/**
 * Creates or update reviews, clear files with transformed reviews data after loading to database
 * @return {{Number,Number}} return object composed of two numbers (inserted and updated rows)
 */
exports.createOrUpdateReviews = async function createOrUpdateReviews() {
    let data = await baseService.createOrUpdate(Review,
        Review.createOrUpdateReview,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_REVIEWS_FILE);

    return data;
};

/**
 * Creates or update reviews comments, clear files with transformed answers to reviews comments data after loading to database
 * @return {{Number,Number}} return object composed of two numbers (inserted and updated rows)
 */
exports.createOrUpdateReviewsComments = async function createOrUpdateReviewsComments() {
    let data = await baseService.createOrUpdate(ReviewComment,
        ReviewComment.createOrUpdateReviewComment,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_COMMENTS_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_COMMENTS_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_REVIEWS_FILE);

    return data;
};

/**
 * Get review from database
 * @param  {String} id id of review to get
 * @return {Review} return review entity from database
 */
exports.getReviewById = async function getReviewById(id) {
    return Review.getByID(id);
};

/**
 * Get all reviews from database
 * @return {Review[]} return review entities from database
 */
exports.getAllReviews = async function getAllReviews() {
    return Review.getAll();
};

/**
 * Get review from database
 * @param  {String} id id of review to get answers for
 * @return {{Review, ReviewComment[]}} return object composed with review and array of comments to that review from database;
 * if answers not found then return only review object
 */
exports.getReviewByIdWithAllComments = async function getReviewByIdWithAllComments(id) {
    let data = {};
    data.review = await Review.getByID(id);
    if (data.review.length) {
        data.reviewComments = await ReviewComment.getAllByReviewID(id);
    } else return data;
    return data;
};
