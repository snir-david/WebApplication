//imports modules
const express = require('express');
const fileUpload = require('express-fileupload');
const regression = require('../Model/regression');
const regressDetect = require('../Model/regressionDetect');
const hybrid = require('../Model/hybrid');
const hybridDetect = require('../Model/hybridDetect');

//define app and uses
const app = express();
app.use(express.urlencoded({
    extended: false
}))
app.use(fileUpload({}));
app.use(express.static('../View'));


/** parsing csv files got from user **/
function parsingCSV(csvFile) {
    //Store information for each individual person in an array index. Split it by every newline in the csv file.
    let arr = csvFile.split('\n');
    let headers = arr[0].split(',');
    //initialize 2-D array to hold each column
    let arrData = new Array(headers.length);
    for (let k = 0; k < headers.length; k++) {
        arrData[k] = new Array(arr.length - 1);
    }
    //adding each cell to the right array
    for (let i = 1; i < arr.length - 1; i++) {
        let data = arr[i].split(',');
        for (let j = 0; j < data.length; j++) {
            arrData[j][i] = data[j];
        }
    }
    //initialize map with headers as key and sub-arrays as value
    let learnMap = new Map();
    for (let i = 0; i < headers.length; i++) {
        if (!learnMap.has(headers[i])) {
            learnMap.set(headers[i], arrData[i]);
        } else {
            learnMap.set('copy ' + headers[i], arrData[i]);
        }
    }
    return learnMap;
}

//Get Method for '/' url
app.get('/', (req, res) => {
    res.sendFile('index.html');
})

//Post Method for '/detect' url
app.post('/detect', (req, res) => {
    let corrFeatures, anomalyReport;
    //handling files and parsing the csv
    let learnFile = req.files.learn_file;
    let learnData = learnFile.data.toString();
    let learnMap = parsingCSV(learnData);
    let detectFile = req.files.detect_file;
    let detectData = detectFile.data.toString();
    let detectMap = parsingCSV(detectData);
    //switch case for algorithm choice - learn and detect anomalies
    switch (req.body.algo) {
        case "Hybrid Algorithm":
            corrFeatures = hybrid(learnMap);
            anomalyReport = hybridDetect(detectMap, corrFeatures);
            break;
        case "Regression Algorithm":
            corrFeatures = regression.learnNormal(learnMap);
            anomalyReport = regressDetect(detectMap, corrFeatures);
            break;
    }
    //return the anomaly report as json
    res.send(anomalyReport);
    res.end();
})

//starting server on port 8080
app.listen(8080)