'use strict';
const url = require("url");
const fs = require("fs");

function readDataFile(folderName, fileName) {
    const file = fs.readFileSync(url.resolve(__dirname, `${folderName}\\${fileName}.json`));
    console.log(`file: ${fileName} in folder ${folderName} is read ok`);
    return JSON.parse(file);
}

function saveDataToJsonFile(folderName, fileName, data) {
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

exports.readDataFile = readDataFile;
exports.saveDataToJsonFile = saveDataToJsonFile;