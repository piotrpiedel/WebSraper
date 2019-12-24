'use strict';
const Review = require("../models/review");
const ReviewComment = require("../models/reviewComment");
const FileUtil = require("../utils/fileUtil");

// (async () => {
//     await transformReviewData(149441211, FileUtil.readDataFile("dataextracted", "reviews"));
// })();

async function transformReviewData(productId, reviews) {
    const arrayOfParsedReviewModels = [];
    const arrayOfParsedReviewCommentModels = [];
    reviews.forEach(review => {
        let reviewModel = new Review.Builder(review.id.trim())
            .withUserName(review.author.trim())
            .withWasPurchased(!!review.dateOfPurchase)
            .withDateOfPurchase(review.dateOfPurchase ? review.dateOfPurchase.trim() : "")
            .withDateOfReview(review.dateOfReview.trim())
            .withReviewStars(Number(review.score.split("/")[0]))
            .withIsRecommended(review.isRecommended === "Polecam")
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
                    .withDate(comment.dateOfComment.trim())
                    .withUserName(comment.author.trim())
                    .withReviewId(review.id.trim())
                    .build();
                arrayOfParsedReviewCommentModels.push(reviewCommentModel);
            }
        );

    });
    FileUtil.saveDataToJsonFile("datatransfromed", "reviewsTransformed", arrayOfParsedReviewModels);
    FileUtil.saveDataToJsonFile("datatransfromed", "reviewCommentsTransformed", arrayOfParsedReviewCommentModels);
    return {
        transformedReviews: arrayOfParsedReviewModels.length,
        transformedReviewsComments: arrayOfParsedReviewCommentModels.length
    }

}

async function transformReviewDataFromDataExtracted(productId) {
    let reviewsData = FileUtil.readDataFile("dataextracted", "reviews");
    return transformReviewData(productId, reviewsData)
}

exports.transformReviewData = transformReviewData;
exports.transformReviewDataFromDataExtracted = transformReviewDataFromDataExtracted;