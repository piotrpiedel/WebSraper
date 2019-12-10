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

exports.createProduct = function (req, res) {
    var new_task = new Product(req.body);

    //handles null error
    if (!new_task.id || !new_task.name) {
        res.status(400).send({error: true, message: 'Please provide task/status'});
    } else {
        Product.createProduct(new_task, function (err, task) {

            if (err)
                res.send(err);
            res.json(task);
        });
    }
};


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