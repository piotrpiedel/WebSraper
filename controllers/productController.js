'use strict';

var Product = require('../models/product.js');

exports.getProductById = async function (request, response) {
    var productArrays = await Product.getProductById(request.params.productID);
    if (productArrays) {
        console.log("productController res.send", productArrays);
        response.send(productArrays);
    } else {
        console.log("productController res.send  cause error null");
        response.send(null);
    }
};

exports.getProductByIdPost = async function (request, response) {
    console.log("request.params.productID", request.body.productID);
    // var productArrays = await Product.getProductById(request.params.productID)
    //     .catch(error => response.send(error));
    // if (productArrays) {
    //     console.log("productController res.send", productArrays);
    //     response.send(productArrays);
    // } else {
    //     console.log("productController res.send  cause error null");
    //     response.send(null);
    // }
};

exports.getAllProducts = async function (response) {
    var productArrays = await Product.getAllProducts();
    if (productArrays) {
        console.log("productController res.send", productArrays);
        response.send(productArrays);
    } else {
        console.log("productController res.send  cause error null");
        response.send(null);
    }
};

// exports.createProduct = async function (req, res) {
//     var newProduct = new Product(req.body);
//
//     //handles null error
//     if (!newProduct.id || !newProduct.name) {
//         res.status(400).send({error: true, message: 'Please provide product/name'});
//     } else {
//         res.send(await Product.createOrUpdateProduct(newProduct));
//     }
// };


exports.readProduct = function (req, res) {
    Product.getProductById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

// exports.updateProduct = function(req, res) {
//     Product.updateById(req.params.taskId, new Product(req.body), function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };

exports.deleteProduct = function (req, res) {
    Product.remove(req.params.id, function (err, task) {
        if (err)
            res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};