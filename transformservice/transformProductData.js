'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");

async function transformProductData(productId, productData) {
    let productModel = new Product.Builder(productId)
        .withName(productData.productName.trim())
        .withProducer(productData.producer.trim())
        .build();

    FileUtil.saveDataToJsonFile("datatransfromed", "productTransformed", productModel);
}

async function transformProductDataFromDataExtracted(productId) {
    let productData = await FileUtil.readDataFile("dataextracted", "productData");
    await transformProductData(productId, productData)
}

exports.transformProductData = transformProductData;
exports.transformProductDataFromDataExtracted = transformProductDataFromDataExtracted;