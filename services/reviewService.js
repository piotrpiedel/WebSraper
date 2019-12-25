'use strict';
const Review = require("../models/review");
const ReviewComment = require("../models/reviewComment");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");
const fileAndFolderNames = require("../config/folderAndFilesNames");

async function createOrUpdateReviews() {
    let data = await baseService.createOrUpdate(Review,
        Review.createOrUpdateReview,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_REVIEWS_FILE);

    return data;
}

async function createOrUpdateReviewsComments() {
    let data = await baseService.createOrUpdate(ReviewComment,
        ReviewComment.createOrUpdateReviewComment,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_COMMENTS_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_REVIEWS_COMMENTS_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_REVIEWS_FILE);

    return data;
}

async function getReviewById(id) {
    return Review.getReviewById(id);
}

async function getAllReviews() {
    return Review.getAllReviews();
}

async function getReviewByIdWithAllComments(id) {
    let data = {};
    data.review = await getReviewById(id);
    if (data.review.length) {
        data.reviewComments = await ReviewComment.getAllByReviewID(id);
    } else return data;
    return data;
}

exports.createOrUpdateReviews = createOrUpdateReviews;
exports.createOrUpdateReviewsComments = createOrUpdateReviewsComments;
exports.getAllReviews = getAllReviews;
exports.getReviewById = getReviewById;
exports.getReviewByIdWithAllComments = getReviewByIdWithAllComments;