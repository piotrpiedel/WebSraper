'use strict';
const Review = require("../models/review");
const ReviewComment = require("../models/reviewComment");
const FileUtil = require("../utils/fileUtil");

async function transformReviewData(productId, reviews) {
    const arrayOfParsedReviewModels = [];
    const arrayOfParsedReviewCommentModels = [];
    reviews.forEach(review => {
        let reviewModel = new Review.Builder(review.id.trim())
            .withUserName(review.author.trim())
            .withWasPurchased(!!review.dateOfPurchase)
            .withDateOfPurchase(new Date(review.dateOfPurchase).getTime())
            .withDateOfReview(new Date(review.dateOfReview).getTime())
            .withReviewStars(Number(review.score.split("/")[0]))
            .withIsRecommended(eview.isRecommended === "Polecam")
            .withContent(review.message.trim())
            .withAdvantages(review.advantages.join())
            .withDisadvantages(review.disadvantages.join())
            .withUpVotes(Number(review.numberOfUpVotes))
            .withDownVotes(Number(review.numberOfDownVotes))
            .withProductId(productId)
            .build();
        arrayOfParsedReviewModels.push(reviewModel);
        review.comments.forEach(comment => {
                let reviewCommentModel = new ReviewComment.Builder(comment.id.trim())
                    .withMessage(comment.message.trim())
                    .withDate(new Date(comment.dateOfComment).getTime())
                    .withUserName(comment.author.trim())
                    .withReviewId(review.id.trim())
                    .build();
                arrayOfParsedReviewCommentModels.push(reviewCommentModel);
            }
        );

    });
    FileUtil.saveDataToJsonFile("datatransfromed", "reviewsTransformed", arrayOfParsedReviewModels);
    FileUtil.saveDataToJsonFile("datatransfromed", "reviewCommentsTransformed", arrayOfParsedReviewCommentModels);
}

function transformReviewDataFromDataExtracted(productId) {
    let reviewsData = FileUtil.readDataFile("dataextracted", "reviews");
    transformReviewData(productId, reviewsData)
}

exports.transformReviewData = transformReviewData;
exports.transformReviewDataFromDataExtracted = transformReviewDataFromDataExtracted;