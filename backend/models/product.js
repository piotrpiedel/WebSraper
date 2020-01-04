'user strict';
const databaseConnection = require("../database/mysqlconnection");
const databaseEnum = require("../config/database_enum");

/**
 * @category Models
 * @example
 * let Product = new Product({
 *     id: 123,
 *     name : "ProductName",
 *     producer: "ProducerName",
 * })
 * @param  {Product} product
 * @param  {Number} product.id    product id
 * @param  {String} product.name    product name
 * @param  {String} product.producer   Product producer
 */
class Product {
    constructor(product) {
        if (arguments.length === 1 && this.validate(product)) {
            this.id = product.id;
            this.name = product.name;
            this.producer = product.producer;
        }
    }

    /**
     * Validate product model
     * @param  {Product} product  entity of product model
     * @return {Boolean} return true if product is valid
     */
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

/**
 * Create new product or update already existing one
 * @param  {Product} productModelInstance  entity of product model
 * @return {OPERATION} value of executed operation type
 */
Product.createOrUpdateProduct = async function (productModelInstance) {
    if (productModelInstance instanceof Product) {
        let isProductExisting = await Product.checkIfExistsInDatabase(productModelInstance.id);
        if (isProductExisting) {
            let productUpdated = await Product.updateById(productModelInstance);
            return databaseEnum.UPDATE;
        } else {
            let productInserted = await Product.insert(productModelInstance);
            return databaseEnum.INSERT;
        }
    } else throw "Model must be instance of Product"

};

/**
 * Create new product in database
 * @param  {Product} productModelInstance instance of product ready to insert in database
 * @return {Product}  inserted product instance
 */
Product.insert = async function (productModelInstance) {
    return databaseConnection.promise().query("INSERT INTO product set ?", productModelInstance)
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    return rows;
                }
            }
        );
};

/**
 * Check if product with given ID already exists in database
 * @param  {Number} id  id of product
 * @return {Boolean}  true if product already exists, false if does not
 */
Product.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from product where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                return !!(rows && rows.length);
            }
        });
};

/**
 * Get product with given ID from database
 * @param  {Number} id  id of product
 * @return {Product} product instance of the given id
 */
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

/**
 * Get all products  from database
 * @return {Product[]} array of products existing in database
 */
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

/**
 * Get all products ids from database
 * @return {Product[]} array of products ids existing in database
 */
Product.getAllProductsIds = function () {
    return databaseConnection.promise().query("Select id from product")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
                return error;
            } else {
                console.log("Product.getAllProductsIds - rows: ", rows);
                return rows;
            }
        });
};

/**
 * Update product with given productModelInstance
 * @param  {Product} product productModelInstance instance of product
 * @return {Product} updated productModel
 */
Product.updateById = async function (product) {
    return databaseConnection.promise().query("UPDATE product SET ? WHERE id = ?", [product, product.id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    return rows;
                }
            }
        );
};

/**
 * Delete product with given ID
 * @param  {Number} id  id of product
 * @return {Product} deleted productModel
 */
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

/**
 * Delete all products
 * @return {Product[]} array of deleted productModel
 */
Product.deleteAll = async function () {
    return databaseConnection.promise().query("DELETE FROM product")
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