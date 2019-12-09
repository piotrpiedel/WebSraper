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
    var productfkid = 144;
    var parsedJson = readDataFile();
    for (var i = 0; i < 1; i++) {
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
            productfkid);
        console.log("review model object:1 ", reviewModel);
        await Review.createOrUpdateReview(reviewModel);
    }

    // for ()
    // for (var i in parsedJson)
    // {
    //     console.log(parsedJson[i]);
    //     var id = parsedJson[i].id;
    //     var name = parsedJson[i].name;
    // }


    // parsedJson.forEach(function (arrayItem) {
    //     console.log(arrayItem);
    // });
})();

// (async () => {
//     fs.readFile(url.resolve(__dirname, "data\\data.json"), (error, data) => {
//         if (error) {
//             console.error(error);
//             throw error;
//         }
//         let parsedReviews = JSON.parse(data);
//         console.log(parsedReviews);
//     });
// })();

// var jsonData = JSON.parse();
// for (var i = 0; i < jsonData.counters.length; i++) {
//     var counter = jsonData.counters[i];
//     console.log(counter.counter_name);
// }