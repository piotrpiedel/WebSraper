'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");

// (async () => {
//     await createOrUpdateProduct(FileUtil.readDataFile("datatransfromed", "productTransformed"));
// })();

async function createOrUpdateProduct() {
    return await baseService.createOrUpdate(Product,
        Product.createOrUpdateProduct,
        FileUtil.readDataFile("datatransfromed", "productTransformed"));
}

exports.createOrUpdateProduct = createOrUpdateProduct;
