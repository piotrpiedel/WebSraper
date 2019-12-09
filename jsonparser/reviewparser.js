'use strict';
const url = require("url");
const fs = require("fs");


function readDataFile() {
    var file = fs.readFileSync(url.resolve(__dirname, "data\\data.json"));
    console.log("file is read ok");
    return JSON.parse(file);
}

exports.readDataFile = readDataFile();

// var jsonData = JSON.parse();
// for (var i = 0; i < jsonData.counters.length; i++) {
//     var counter = jsonData.counters[i];
//     console.log(counter.counter_name);
// }