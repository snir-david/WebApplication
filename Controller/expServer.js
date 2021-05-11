//imports modules
const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../Model/Learn')
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
app.post('/search', (req, res) => {
    res.write('searching for ' + req.body.key + +':\n')
    let key = req.body.key
   if (req.files) {
        let file = req.files.text_file
        let result = model.searchText(key, file.data.toString())
        res.write(result)
    }
    res.end()
})

//starting server on port 8080
app.listen(3000, ()=>console.log("server started at 3000"))