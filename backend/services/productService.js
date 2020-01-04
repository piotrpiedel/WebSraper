'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");
const fileAndFolderNames = require("../config/folderAndFilesNames");

/**
 * @category Services
 * @module productService
 */

/**
 * Creates or update product, clear files with transformed product data after loading to database
 * @return {{Number, Number}} return object composed of two numbers (inserted and updated rows)
 */
exports.createOrUpdateProduct = async function createOrUpdateProduct() {
    let data = await baseService.createOrUpdate(Product,
        Product.createOrUpdateProduct,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_PRODUCT_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_PRODUCT_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_PRODUCT_FILE);
    return data;
};

/**
 * Get product from database with given id
 * @param  {Number} id id of product to get from database
 * @return {Product} return product entity from database
 */
exports.getProductById = async function getProductById(id) {
    return Product.getProductById(id);
};

/**
 * Get all products from database
 * @return {Product} return product entities from database
 */
exports.getAllProducts = async function getAllProducts() {
    return Product.getAllProducts();
};
/**
 * Get all products ids from database
 * @return {Product} return product entities from database
 */
exports.getAllProductsIds = async function getAllProductsIds() {
    return Product.getAllProductsIds();
};
/**
 * Delete all products from database
 * @return {Product} return deleted product entities from database
 */
exports.deleteAll = async function deleteAllProducts() {
    return Product.deleteAll();
};

