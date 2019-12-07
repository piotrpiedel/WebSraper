'use strict';
const url = require("url");
const fs = require("fs");

(async () => {

    fs.readFile(url.resolve(__dirname, "data\\data.json"), (error, data) => {
        if (error) {
            console.error(error);
            throw error;
        }
        let parsedReviews = JSON.parse(data);
        console.log(parsedReviews);
    });
})();


// var jsonData = JSON.parse();
// for (var i = 0; i < jsonData.counters.length; i++) {
//     var counter = jsonData.counters[i];
//     console.log(counter.counter_name);
// }