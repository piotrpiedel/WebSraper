'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const fileAndFolderNames = require("../config/folderAndFilesNames");

/**
 * @category Transform services
 * @module transformProductData
 */

/**
 * Transform extracted product data, save transformed data to separate files
 * @param  {Number} productId product id for which will be transformed extracted data
 * @param  {JSON} productData JSON format extracted data about product
 * @return {Number} return number of transformed products data
 */
async function transformProductData(productId, productData) {
    let productModel = new Product.Builder(productId)
        .withName(productData.productName.trim())
        .withProducer(productData.producer.trim())
        .build();

    FileUtil.saveDataToJsonFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_PRODUCT_FILE, productModel);
    console.log("productDataTransformed successfully");
    return {transformedProducts: 1}
}

/**
 * Transform extracted product data, read extracted data from files and pass it to another function
 * @param  {Number} productId product id for which will be transformed extracted data
 * @return {Number} return number of transformed products data
 */
async function transformProductDataFromDataExtracted(productId) {
    let productData = FileUtil.readDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_PRODUCT_FILE);
    return transformProductData(productId, productData)
}

exports.transformProductData = transformProductData;
exports.transformProductDataFromDataExtracted = transformProductDataFromDataExtracted;