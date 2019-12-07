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
