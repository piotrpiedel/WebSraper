'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const {transformProductData} = require("../transformservice/transformProductData");

async function saveProductToDatabase(productData) {
    let productModel = new Product.Builder(productData.id)
        .withName(productData.productName.trim())
        .withProducer(productData.producer.trim())
        .build();
    FileUtil.saveDataToJsonFile("datatransfromed", "productTransformed", productModel);
}

async function transformProductDataFromDataExtracted(productId) {
    let productData = await FileUtil.readDataFile("dataextracted", "productData");
    await transformProductData(productId, productData)
}
