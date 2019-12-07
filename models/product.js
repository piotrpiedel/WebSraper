'user strict';
const databaseConnection = require("../database/mysqlconnection");

//Product object constructor
const Product = function (id, name) {
    this.id = id;
    this.name = name;
};

function onError(cb, error) {
    if (cb)
        cb(error, null);
}

function onSuccess(cb, results) {
    if (cb)
        cb(null, results);
}

Product.createOrUpdateProduct = async function (productModelInstance) {
    if (productModelInstance instanceof Product) {
        let isProductExisting = await Product.checkIfExistsInDatabase(productModelInstance.id);
        if (isProductExisting) {
            Product.updateById(productModelInstance);
        } else {
            Product.insert(productModelInstance);
        }
    }
};
Product.insert = function (productModelInstance, cb) {
    databaseConnection.query("INSERT INTO product set ?", productModelInstance, function (error, results) {
        if (error) {
            console.log("Product.insert onError: ", error);
            onError(cb, error);
        } else {
            console.log("Product.insert onResult: ", results);
            onSuccess(cb, results);
            return results;
        }
    });
};
Product.checkIfExistsInDatabase = async function (productId) {
    const finalValue = await databaseConnection.promise().query("Select * from product where id = ? ", productId)
        .then(([rows, fields, error]) => {
            console.log("Product.checkIfExistsInDatabase: rows", rows);
            return rows;
        });
    return !!finalValue;
};


Product.getProductById = async function (productId, cb) {
    await databaseConnection.query("Select * from product where id = ? ", productId, function (error, results, fields) {
        if (error) {
            console.log("Product.getProductById onError: ", error);
            onError(cb, error);
        } else {
            console.log("Product.getProductById onResult: ", results);
            onSuccess(cb, results);
        }
    });
};

Product.getAllProducts = function (cb) {
    databaseConnection.query("Select * from product", function (error, results, fields) {
        if (error) {
            console.log("Product.getAllProducts onError: ", error);
            onError(cb, error);
        } else {
            console.log('Product.getAllProducts onResult: : ', results);
            onSuccess(cb, results);
        }
    });
};

Product.updateById = function (product, cb) {
    databaseConnection.query("UPDATE product SET ? WHERE id = ?", [product, product.id], function (error, results) {
        if (error) {
            console.log("Product.updateById onError: ", error);
            onError(cb, error);
        } else {
            console.log("Product.updateById results: ", results);
            onSuccess(cb, results);
        }
    });
};

Product.delete = function (id, cb) {
    databaseConnection.query("DELETE FROM product WHERE id = ?", [id], function (error, results, fields) {
        if (error) {
            console.log("Product.delete onError: ", error);
            if (cb)
                cb(null, error);
        } else {
            console.log("Product.delete onSuccess: ", results);
            if (cb)
                cb(null, results);
        }
    });
};

module.exports = Product;