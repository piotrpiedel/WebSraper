'use strict';
const ProductService = require('../services/productService');
const APICodes = require('../config/apiCodes');
const BaseController = require('../controllers/baseController');

exports.clearDatabase = async function clearDatabaseCascade(request, response) {
    try {
        await ProductService.deleteAll();
        return BaseController.fillResponse(response, APICodes.SUCCESS, "All data has been successfully deleted from database");
    } catch (e) {
        console.error("Clear databaseController function clearDatabase", e);
        return BaseController.fillResponse(response, APICodes.SERVER_ERROR, e.message);
    }
};