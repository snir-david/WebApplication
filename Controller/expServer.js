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
    console.log('detect')
    util.cov([1,2,34,4],[2,3,4,5],4)

})

//starting server on port 8080
app.listen(3000, ()=>console.log("server started at 3000"))