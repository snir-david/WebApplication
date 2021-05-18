//imports modules
const express = require('express');
const fileUpload = require('express-fileupload');
const regression = require('../Model/regression');
const regressDetect = require('../Model/regressionDetect');
const hybrid = require('../Model/hybrid');
const hybridDetect = require('../Model/hybridDetect');
const html_tablify = require('html-tablify');

//define app and uses
const app = express();
app.use(express.urlencoded({
    extended: false
}))
app.use(fileUpload({}));
app.use(express.static('View'));



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
        if(!learnMap.has(headers[i])){
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

//Post Method for '/search' url
app.post('/detect', (req, res) => {
    let corrFeatures, anomalyReport;
    let learnFile = req.files.learn_file;
    let learnData = learnFile.data.toString();
    let learnMap = parsingCSV(learnData);
    let detectFile = req.files.detect_file;
    let detectData = detectFile.data.toString();
    let detectMap = parsingCSV(detectData);
    switch (req.body.algo) {
        case "Hybrid Algorithm":
            corrFeatures = hybrid(detectMap);
            anomalyReport = hybridDetect(detectMap, corrFeatures);
            break;
        case "Regression Algorithm":
            corrFeatures = regression.learnNormal(learnMap);
            anomalyReport = regressDetect(detectMap, corrFeatures);
            break;
    }
    let myJsonString = JSON.stringify(anomalyReport);
    let options = {
        data: anomalyReport,
        css:['text-align: center', 'bgcolor: #d3d3d3']
    };

    let html_data = html_tablify.tablify(options);
    res.write(html_data);
    res.send(myJsonString);
    res.end();
})

//starting server on port 8080
app.listen(3000, () => console.log("server started at 3000"))