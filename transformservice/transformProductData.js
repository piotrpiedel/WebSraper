'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");

async function transformProductData(productId, productData) {
    let productModel = new Product(
        productId,
        productData.productName.trim(),
        productData.producer.trim()
    );
    FileUtil.saveDataToJsonFile("datatransfromed", "productTransformed", productModel);
}

async function transformProductDataFromDataExtracted(productId) {
    let productData = await FileUtil.readDataFile("dataextracted", "productData");
    await transformProductData(productId, productData)
}

exports.transformProductData = transformProductData;
exports.transformProductDataFromDataExtracted = transformProductDataFromDataExtracted;