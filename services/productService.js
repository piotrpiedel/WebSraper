'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const {transformProductData} = require("../transformservice/transformProductData");

(async () => {
    await saveProductsToDatabase(FileUtil.readDataFile("datatransfromed", "productTransformed"));
})();

async function saveProductsToDatabase(productData) {
    if (Array.isArray(productData)) {
        for (const product of productData) {
            let productModel = new Product.Builder(productData.id)
                .withName(productData.name.trim())
                .withProducer(productData.producer.trim())
                .build();
            await Product.createOrUpdateProduct(productModel);
        }
        console.debug("saveProductToDatabase productData", productData);
    } else {
        let productModel = new Product.Builder(productData.id)
            .withName(productData.name.trim())
            .withProducer(productData.producer.trim())
            .build();
        await Product.createOrUpdateProduct(productModel);
        console.debug("Product was saved with success", productModel);
    }
}
