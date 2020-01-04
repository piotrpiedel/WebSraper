'user strict';
const databaseConnection = require("../database/mysqlconnection");

//ProductInformation object constructor
class ProductInformation {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

ProductInformation.createOrUpdateProductInformation = async function (productInformationModelInstance) {
    if (productInformationModelInstance instanceof ProductInformation) {
        let isProductInformationExisting = await ProductInformation.checkIfExistsInDatabase(productInformationModelInstance.id);
        console.log("isProductInformationExisting", isProductInformationExisting);
        if (isProductInformationExisting) {
            let productUpdated = await ProductInformation.updateById(productInformationModelInstance);
            console.log("createOrUpdateProductInformation ProductInformationUpdated");
            return productUpdated;
        } else {
            let productInserted = await ProductInformation.insert(productInformationModelInstance);
            console.log("createOrUpdateProduct productInserted");
            return productInserted;
        }
    }
};
ProductInformation.insert = async function (productInformationModelInstance) {
    return databaseConnection.promise().query("INSERT INTO product_information set ?", productInformationModelInstance)
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("ProductInformation.inserted - rows: ", rows);
                    return rows;
                }
            }
        );
};

ProductInformation.checkIfExistsInDatabase = async function (id) {
    return databaseConnection.promise().query("Select * from product_information where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("ProductInformation.checkIfExistsInDatabase - rows: ", rows);
                return !!(rows && rows.length);
            }
        });
};


ProductInformation.getProductById = async function (id) {
    return databaseConnection.promise().query("Select * from product_information where id = ? ", id)
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
            } else {
                console.log("ProductInformation.getProductById - rows: ", rows);
                return rows;
            }
        });
};

ProductInformation.getAllProducts = function () {
    return databaseConnection.promise().query("Select * from product_information")
        .then(([rows, fields, error]) => {
            if (error) {
                console.error(error);
                return error;
            } else {
                console.log("ProductInformation.getAllProducts - rows: ", rows);
                return rows;
            }
        });
};

ProductInformation.updateById = async function (productInformation) {
    return databaseConnection.promise().query("UPDATE product_information SET ? WHERE id = ?", [productInformation, productInformation.id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("ProductInformation.updateById: rows", rows);
                    return rows;
                }
            }
        );
};

ProductInformation.delete = async function (id) {
    return databaseConnection.promise().query("DELETE FROM product_information WHERE id = ?", [id])
        .then(
            ([rows, fields, error]) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("ProductInformation.delete: rows", rows);
                    return rows;
                }
            }
        );
};

module.exports = ProductInformation;