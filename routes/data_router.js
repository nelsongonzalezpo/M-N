//Endpoints States
const express = require('express')

const moment = require('moment')

const data_router = express.Router();
const Data = require('../Models/data');
var QRCode = require('qrcode');

//Get all shit from db
data_router.get('/getQR', (req, res) => {
    Data.find({})
        .then(data => res.send(convertirQR(data)))
        .catch((error) => console.log(error));


})


//get base64 from specificShit
data_router.post('/specificQR', async (req, res) => {
 Data.findOne({ description: req.body.description }, (error, docs) => {
     let base64 = convertirQR(docs)
         
     base64.then((value) => {
         //replace the useless shit
         var strImage = value.replace(/^data:image\/[a-z]+;base64,/, "");
         res.send({fullUrl: value, url: strImage })         // expected output: 123
     });
           
})

})
 

//Returns base64 from any shit
function convertirQR(data) {

    let base64 = QRCode.toDataURL(JSON.stringify(data))
        .then(url => {
            // console.log("la infoo " + url)
            return url
        })
        .catch(err => {
            console.error(err)
        })
    
    return base64

}



//Post new Shit
data_router.post('/data', (req, res) => {
    (new Data
        ({
            'title': req.body.title,
            'description': req.body.description,
            'moreDescription': req.body.moreDescription,
            'final': req.body.final,
        }))
        .save()
        .then((data) => res.send(data))
        .catch((error) => console.log(error));

})


module.exports = data_router;

