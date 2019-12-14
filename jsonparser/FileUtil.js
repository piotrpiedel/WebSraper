'use strict';
const url = require("url");
const fs = require("fs");


function readDataFile() {
    const file = fs.readFileSync(url.resolve(__dirname, "data\\data.json"));
    console.log("file is read ok");
    return JSON.parse(file);
}

function saveDataToJsonFile(data, fileName) {
    console.log(__dirname);
    fs.writeFileSync(
        url.resolve(__dirname, `data\\${fileName}.json`),
        JSON.stringify(data, null, 4),
        error => {
            if (error) return;
            console.log("Data has been succesfully saved!");
        }
    );
}

exports.readDataFile = readDataFile;
exports.saveDataToJsonFile = saveDataToJsonFile;