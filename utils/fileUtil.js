'use strict';
const url = require("url");
const fs = require("fs");

function readDataFile(folderName, fileName) {
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

}

function createFolderIfDoesNotExist(folderName) {
    let dir = `./${folderName}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(`Folder ./${folderName} has been created!`);
    }
}

function saveDataToJsonFile(folderName, fileName, data) {
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
}

function clearDataFile(folderName, fileName) {
    console.log(__dirname);
    fs.writeFileSync(url.resolve(__dirname, `${folderName}\\${fileName}.json`), "");
}

exports.readDataFile = readDataFile;
exports.saveDataToJsonFile = saveDataToJsonFile;
exports.clearDataFile = clearDataFile;