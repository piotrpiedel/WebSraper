'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const databaseEnum = require("../config/database_enum");

(async () => {
    await saveProductsToDatabase(FileUtil.readDataFile("datatransfromed", "productTransformed"));
})();

async function saveProductToDatabase(product, productInsertedStats, productUpdatedStats) {
    let productModel = new Product.Builder(product.id)
        .withName(product.name.trim())
        .withProducer(product.producer.trim())
        .build();
    let value = await Product.createOrUpdateProduct(productModel);
    if (value === databaseEnum.INSERT) {
        productInsertedStats++
    } else if (value === databaseEnum.UPDATE) {
        productUpdatedStats++
    }
    return {productInsertedStats, productUpdatedStats};
}

async function saveProductsToDatabase(productData) {
    let productUpdatedStats = 0;
    let productInsertedStats = 0;
    if (Array.isArray(productData)) {
        for (const product of productData) {
            const value = await saveProductToDatabase(product, productInsertedStats, productUpdatedStats);
            productInsertedStats = value.productInsertedStats;
            productUpdatedStats = value.productUpdatedStats;
        }
        console.debug("productInsertedStats, productUpdatedStats: ", productInsertedStats, productUpdatedStats);
        return {productInsertedStats, productUpdatedStats};
    } else {
        const __ret = await saveProductToDatabase(productData, productInsertedStats, productUpdatedStats);
        productInsertedStats = __ret.productInsertedStats;
        productUpdatedStats = __ret.productUpdatedStats;
        return {productInsertedStats, productUpdatedStats};
    }
}
