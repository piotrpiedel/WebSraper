'use strict';
const url = require("url");
const fs = require("fs");

/**
 * @category Utils
 * @module fileUtil
 */

/**
 * Read file and return parsed content in JSON format
 * @param  {String} folderName generic folder name
 * @param  {String} fileName generic file name
 * @return {JSON} return content from file in JSON format
 */
exports.readDataFile = function readDataFile(folderName, fileName) {
    try {
        const file = fs.readFileSync(url.resolve(__dirname, `${folderName}\\${fileName}.json`));
        if (file) {
            console.log(`file: ${fileName} in folder ${folderName} is read ok`);
        }
        return JSON.parse(file);
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.error(`Error occurred during parsing file: ${fileName} in folder: ${folderName} to JSON`, e);
            throw e;
        } else {
            console.error(`Error occurred during reading file: ${fileName} in folder: ${folderName}`, e);
            throw e;
        }
    }

};

/**
 * Create folder when does not exists;
 * @param  {String} folderName generic folder name
 */
function createFolderIfDoesNotExist(folderName) {
    let dir = `./${folderName}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(`Folder ./${folderName} has been created!`);
    }
}

/**
 * Write data to file
 * @param  {String} folderName generic folder name
 * @param  {String} fileName generic file name
 * @param  {Object} data generic data to save in file - should be in format that can be parsed to JSON
 */
exports.saveDataToJsonFile = function saveDataToJsonFile(folderName, fileName, data) {
    createFolderIfDoesNotExist(folderName);
    console.log(__dirname);
    fs.writeFileSync(
        url.resolve(__dirname, `${folderName}\\${fileName}.json`),
        JSON.stringify(data, null, 4),
        error => {
            if (error) {
                console.log("Error occurred during saving data!");
            } else {
                console.log("Data has been successfully saved!");
            }
        }
    );
};

/**
 * Clear file with writing empty data to file
 * @param  {String} folderName generic folder name
 * @param  {String} fileName generic file name
 */
exports.clearDataFile = function clearDataFile(folderName, fileName) {
    console.log(__dirname);
    fs.writeFileSync(url.resolve(__dirname, `${folderName}\\${fileName}.json`), "");
};