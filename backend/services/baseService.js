'use strict';
const FileUtil = require("../utils/fileUtil");
const databaseEnum = require("../config/database_enum");

/**
 * @category Services
 * @module baseService
 */
/**
 * Save or update to database generic function DAO
 * @param  {Object} transformedModelReadyToDb single object to save in database
 * @param  {Function} daoFunction DAO function to execute on passed object
 * @return {OPERATION} return object with type of executed operation (inserted or updated rows)
 */
async function saveToDatabase(transformedModelReadyToDb, daoFunction) {
    return await daoFunction(transformedModelReadyToDb);
}

/**
 * Create or update generic function DAO -
 * @param  {Object} ModelClass model (class) object which will be save or updated in database
 * @param  {Function} daoFunctionToCall DAO function to execute on passed object
 * @param  {JSON} data - can be array or single model to save in database
 * @return {{Number,Number}} return object composed of two numbers (inserted and updated rows)
 */
exports.createOrUpdate = async function createOrUpdate(ModelClass, daoFunctionToCall, data) {
    let updatedStats = 0;
    let insertedStats = 0;
    if (Array.isArray(data)) {
        for (const singleData of data) {
            const value = await saveToDatabase(new ModelClass(singleData), daoFunctionToCall);
            if (value === databaseEnum.INSERT) {
                insertedStats++
            } else if (value === databaseEnum.UPDATE) {
                updatedStats++
            }
        }
        console.debug(`${daoFunctionToCall.name} multiple data update/insert stats: `, insertedStats, updatedStats);
        // return {[`${ModelClass.name}insertedStats`]: insertedStats, [`${ModelClass.name}updatedStats`]: updatedStats};
        return {insertedStats, updatedStats};
    } else {
        const value = await saveToDatabase(new ModelClass(data), daoFunctionToCall);
        if (value === databaseEnum.INSERT) {
            insertedStats++
        } else if (value === databaseEnum.UPDATE) {
            updatedStats++
        }
        console.debug(`${daoFunctionToCall.name} single data update/insert stats: `, insertedStats, updatedStats);
        // return {[`${ModelClass.name}insertedStats`]: insertedStats, [`${ModelClass.name}updatedStats`]: updatedStats};
        return {insertedStats, updatedStats};
    }
};