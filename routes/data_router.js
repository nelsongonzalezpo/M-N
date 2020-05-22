//Endpoints States
const express = require('express')

const moment = require('moment')

const data_router = express.Router();
const Data = require('../Models/data');
var QRCode = require('qrcode');

//Get all DB data
data_router.get('/getQR', (req, res) => {
    Data.find({})
        .then(data => res.send(convertirQR(data)))
        .catch((error) => console.log(error));


})

//getByDescription
data_router.post('/specificQR', (req, res) => {
    Data.findOne({ description: req.body.description }, (error, docs) => {
        res.send(convertirQR(docs))
    })
})


function convertirQR(data) {

    QRCode.toDataURL(JSON.stringify(data))
        .then(url => {
            console.log(url)
        })
        .catch(err => {
            console.error(err)
        })

}



//Post new State
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

