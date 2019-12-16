'use strict';

// let Product = require('../models/product.js');

let WebScraper = require('../webscrapper/webscrapper.js');

let TransformProductDataService = require('../transformservice/transformProductData.js');
let TransformReviewsDataService = require('../transformservice/transformReviewData.js');
let TransformQuestionsDataService = require('../transformservice/transformQuestionData.js');

exports.createETLProcessAtOnce = async function (request, response) {
    let productId = request.body.productID;
    console.log("createETLProcessAtOnce productId: ", productId);
    await WebScraper.scrapData(productId);
    console.log("success scrap data should be done: ", productId);

    await TransformProductDataService.transformProductDataFromDataExtracted(productId);
    console.log("TransformProductDataService.transformProductDataFromDataExtracted : ", productId);

    await TransformReviewsDataService.transformReviewDataFromDataExtracted(productId);
    console.log("TransformReviewsDataService.transformReviewDataFromDataExtracted : ", productId);

    await TransformQuestionsDataService.transformQuestionDataFromDataExtracted(productId);
    console.log("TransformQuestionsDataService.transformQuestionDataFromDataExtracted : ", productId);

    // var productArrays = await Product.getProductById(request.params.productID);
    // if (productArrays) {
    //     console.log("productController res.send", productArrays);
    //     response.send(productArrays);
    // } else {
    //     console.log("productController res.send  cause error null");
    //     response.send(null);
    // }

};
