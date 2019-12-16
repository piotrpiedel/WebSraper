'use strict';
const Review = require("../models/review");
const ReviewComment = require("../models/reviewComment");
const FileUtil = require("../utils/fileUtil");

const productId = 10201710;
(async () => {
    await transformReviewData(productId, FileUtil.readDataFile("dataextracted", "reviews"));
})();

async function transformReviewData(productId, reviews) {
    const arrayOfParsedReviewModels = [];
    const arrayOfParsedReviewCommentModels = [];
    reviews.forEach(review => {
        let reviewModel = new Review(review.id.trim(),
            review.author.trim(),
            !!review.dateOfPurchase,
            new Date(review.dateOfPurchase).getTime(),
            new Date(review.dateOfReview).getTime(),
            Number(review.score.split("/")[0]),
            review.isRecommended === "Polecam",
            review.message.trim(),
            review.advantages.join(),
            review.disadvantages.join(),
            Number(review.numberOfUpVotes),
            Number(review.numberOfDownVotes),
            productId);
        arrayOfParsedReviewModels.push(reviewModel);
        review.comments.forEach(comment => {
                let reviewCommentModel = new ReviewComment(
                    comment.id.trim(),
                    comment.message.trim(),
                    new Date(comment.dateOfComment).getTime(),
                    comment.author.trim(),
                    review.id.trim()
                );
                arrayOfParsedReviewCommentModels.push(reviewCommentModel);
            }
        );

    });
    FileUtil.saveDataToJsonFile("datatransfromed", "reviewsTransformed", arrayOfParsedReviewModels);
    FileUtil.saveDataToJsonFile("datatransfromed", "reviewCommentsTransformed", arrayOfParsedReviewCommentModels);
}


exports.transformReviewData = transformReviewData;