'use strict';
const url = require("url");
const fs = require("fs");


function readDataFile() {
    var file = fs.readFileSync(url.resolve(__dirname, "data\\data.json"));
    console.log("file is read ok");
    return JSON.parse(file);
}

exports.readDataFile = readDataFile();

const Review = require("../models/review");
(async () => {
    var parsedJson = readDataFile();
    for (var i = 0; i < parsedJson.length; i++) {
        var reviewModel = new Review(parsedJson[i].id,
            parsedJson[i].author,
            parsedJson[i].wasPurchased,
            parsedJson[i].dateOfPurchase,
            parsedJson[i].dateOfReview,
            parsedJson[i].score,
            parsedJson[i].isRecommended,
            parsedJson[i].message,
            parsedJson[i].advantages,
            parsedJson[i].disadvantages,
            parsedJson[i].numberOfUpVotes,
            parsedJson[i].numberOfDownVotes,
            144);
        console.log("review model object:2 ", reviewModel);
        await Review.createOrUpdateReview(reviewModel);
    }
})();

