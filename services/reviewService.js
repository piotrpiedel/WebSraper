'use strict';
const Review = require("../models/review");
const ReviewComment = require("../models/reviewComment");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");

// (async () => {
// //     await createOrUpdateReviews(FileUtil.readDataFile("datatransfromed", "reviewsTransformed"));
// // })();

async function createOrUpdateReviews() {
    return await baseService.createOrUpdate(Review,
        Review.createOrUpdateReview,
        FileUtil.readDataFile("datatransfromed",
            "reviewsTransformed"));
}

async function createOrUpdateReviewsComments() {
    return await baseService.createOrUpdate(ReviewComment,
        ReviewComment.createOrUpdateReviewComment,
        FileUtil.readDataFile("datatransfromed", "reviewCommentsTransformed"));
}

exports.createOrUpdateReviews = createOrUpdateReviews;
exports.createOrUpdateReviewsComments = createOrUpdateReviewsComments;
