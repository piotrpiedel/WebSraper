'use strict';

const Review = require("../models/review");
const FileUtil = require("./FileUtil");

const productId = 23123;

(async () => {
    parseJSONToReviewCommentModelsAndSaveToFile(productId, FileUtil.readDataFile());
})();

function parseJSONToReviewCommentModelsAndSaveToFile(productId, dataFromFile) {
    const arrayOfParsedReviewModels = [];
    for (let i = 0; i < dataFromFile.length; i++) {
        let reviewModel = new Review(dataFromFile[i].id,
            dataFromFile[i].author,
            dataFromFile[i].wasPurchased,
            dataFromFile[i].dateOfPurchase,
            dataFromFile[i].dateOfReview,
            dataFromFile[i].score,
            dataFromFile[i].isRecommended,
            dataFromFile[i].message,
            dataFromFile[i].advantages,
            dataFromFile[i].disadvantages,
            dataFromFile[i].numberOfUpVotes,
            dataFromFile[i].numberOfDownVotes,
            productId);
        console.log(" ", reviewModel);
        arrayOfParsedReviewModels.push(reviewModel);
    }
    FileUtil.saveDataToJsonFile(arrayOfParsedReviewModels, "reviewComments");
}