'use strict';
const Product = require("../models/product");
const FileUtil = require("../utils/fileUtil");
const baseService = require("../services/baseService");
const fileAndFolderNames = require("../config/folderAndFilesNames");

exports.createOrUpdateProduct = async function createOrUpdateProduct() {
    let data = await baseService.createOrUpdate(Product,
        Product.createOrUpdateProduct,
        FileUtil.readDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_PRODUCT_FILE));

    //clear all files according to project etl requirements
    FileUtil.clearDataFile(fileAndFolderNames.DATA_TRANSFORMED_FOLDER, fileAndFolderNames.DATA_TRANSFORMED_PRODUCT_FILE);
    FileUtil.clearDataFile(fileAndFolderNames.DATA_EXTRACTED_FOLDER, fileAndFolderNames.DATA_EXTRACTED_PRODUCT_FILE);
    return data;
};

exports.getProductById = async function getProductById(id) {
    return Product.getProductById(id);
};

exports.getAllProducts = async function getAllProducts(id) {
    return Product.getAllProducts();
};

exports.deleteAll = async function deleteAllProducts() {
    return Product.deleteAll();
};

