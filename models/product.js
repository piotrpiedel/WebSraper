'user strict';
const databaseConnection = require("../database/mysqlconnection");

//Product object constructor
class Product {
    constructor(id, name, producer) {
        this.id = id;
        this.name = name;
        this.producer = producer;
    }
}

Product.createOrUpdateProduct = async function (productModelInstance) {
    if (productModelInstance instanceof Product) {
        let isProductExisting = await Product.checkIfExistsInDatabase(productModelInstance.id);
        console.log("isProductExisting", isProductExisting);
        if (isProductExisting) {
            var productUpdated = await Product.updateById(productModelInstance);
            console.log("createOrUpdateProduct productUpdated");
            return productUpdated;
        } else {
            var productInserted = await Product.insert(productModelInstance);
            console.log("createOrUpdateProduct productInserted");
            return productInserted;
        }
    }
};
Product.insert = async function (productModelInstance) {
    return databaseConnection.promise().query("INSERT INTO product set ?", productModelInstance)
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Product.inserted - rows: ", rows);
                    return rows;
                }
            }
        );
};

Product.checkIfExistsInDatabase = async function (productId) {
    return databaseConnection.promise().query("Select * from product where id = ? ", productId)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Product.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


Product.getProductById = async function (productId) {
    return databaseConnection.promise().query("Select * from product where id = ? ", productId,)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Product.getProductById - rows: ", rows);
                return rows;
            }
        });
};

Product.getAllProducts = function () {
    return databaseConnection.promise().query("Select * from product")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
                return error;
            } else {
                console.log("Product.getAllProducts - rows: ", rows);
                return rows;
            }
        });
};

Product.updateById = async function (product) {
    return databaseConnection.promise().query("UPDATE product SET ? WHERE id = ?", [product, product.id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Product.updateById: rows", rows);
                    return rows;
                }
            }
        );
};

Product.delete = async function (id) {
    return databaseConnection.promise().query("DELETE FROM product WHERE id = ?", [id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Product.delete: rows", rows);
                    return rows;
                }
            }
        );
};

module.exports = Product;