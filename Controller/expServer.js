//imports modules
const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../Model/Learn')
const util = require('../Model/Util')
const app = express()
//define app uses
app.use(express.urlencoded({
    extended: false
}))
app.use(fileUpload({}))
app.use(express.static('View'))

//Get Method for '/' url
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

//Post Method for '/search' url
app.post('/detect', (req, res) => {
    //console.log('detect')
    //util.cov([1,2,34,4],[2,3,4,5],4)
    let learnFile = req.files.learn_file
    let learnData = learnFile.data.toString()

    let arr = [];
    let jsonObj = [];
    //Store information for each individual person in an array index. Split it by every newline in the csv file.
    arr = learnData.split('\n')
    let headers = arr[0].split(',')
    for(let i = 1; i < arr.length; i++) {
        let data = arr[i].split(',')
        let obj = {}
        for(let j = 0; j < data.length; j++) {
            obj[headers[j].trim()] = data[j].trim();
        }
        jsonObj.push(obj);
    }
    JSON.stringify(jsonObj);


})

//starting server on port 8080
app.listen(3000, ()=>console.log("server started at 3000"))