//imports modules
const express = require('express');
const fileUpload = require('express-fileupload');
const regression = require('../Model/regression');
const regressDetect = require('../Model/regressionDetect');
const minCircle = require('../Model/minCircle');


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
    let c = minCircle([{x:5,y:7}, {x:6,y:7},{x:5,y:10},{x:10,y:20},{x:-1,y:-1},{x:2,y:2}])

    //console.log('detect')
    let learnFile = req.files.learn_file;
    let learnData = learnFile.data.toString();
    let learnMap = parsingCSV(learnData);
    let detectFile = req.files.detect_file;
    let detectData = detectFile.data.toString();
    let detectMap = parsingCSV(detectData);
    switch (req.body.algo) {
        case "hybrid":
            break;
        case "regression":
            let corrFeatures = regression(learnMap);
            let anomalyReport = regressDetect(detectMap, corrFeatures);
            break;
    }

})

//starting server on port 8080
app.listen(3000, () => console.log("server started at 3000"))