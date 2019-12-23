'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const fileAndFolderNames = require("../config/folderAndFilesNames");

async function transformProductData(productId, productData) {
    let productModel = new Product.Builder(productId)
        .withName(productData.productName.trim())
        .withProducer(productData.producer.trim())
        .build();

    FileUtil.saveDataToJsonFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_PRODUCT_FILE, productModel);
    console.log("productDataTransformed successfully");
    return {transformedProducts: 1}
}

async function transformProductDataFromDataExtracted(productId) {
    let productData = FileUtil.readDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_PRODUCT_FILE);
    return transformProductData(productId, productData)
}

exports.transformProductData = transformProductData;
exports.transformProductDataFromDataExtracted = transformProductDataFromDataExtracted;