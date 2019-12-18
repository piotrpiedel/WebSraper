'user strict';
const databaseConnection = require("../database/mysqlconnection");

//Product object constructor
class Product {
    constructor(product) {
        if (arguments.length === 1 && this.validate(product)) {
            this.id = product.id;
            this.name = product.name;
            this.producer = product.producer;
        }
    }

    validate(product) {
        return !!product.id;
    }

    static get Builder() {
        class Builder {
            constructor(id) {
                this.id = id;
            }

            withName(name) {
                this.name = name;
                return this;
            }

            withProducer(producer) {
                this.producer = producer;
                return this;
            }

            build() {
                if (this.id) {
                    return new Product(this)
                } else throw "Product id must not be empty";
            }
        }

        return Builder;
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
    } else throw "Model must be instance of Product"

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

Product.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from product where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Product.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


Product.getProductById = async function (id) {
    return databaseConnection.promise().query("Select * from product where id = ? ", id)
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