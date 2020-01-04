'use strict';
const FileUtil = require("../utils/fileUtil");
const databaseEnum = require("../config/database_enum");

async function saveToDatabase(transformedModelReadyToDb, daoFunction) {
    return await daoFunction(transformedModelReadyToDb);
}

async function createOrUpdate(ModelClass, daoFunctionToCall, data) {
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
}

exports.createOrUpdate = createOrUpdate;