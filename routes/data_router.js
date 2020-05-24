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
 Data.findOne({ name: req.body.name }, (error, docs) => {
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
            return url
        })
        .catch(err => {
            console.error(err)
        })
    
    return base64

}



//Post new Shit
data_router.post('/dataPost', (req, res) => {
    let dateOfBirth = req.body.dateOfBirth;
    let usableDate = moment(dateOfBirth, "DD-MM-YYYY"); 

    (new Data
        ({
            'name': req.body.name,
            'placeOfBirth': req.body.placeOfBirth,
            'bloodType': req.body.bloodType,
            'weight': req.body.weight,
            'weightPounds': getPounds(req.body.weight),
            'height': req.body.height,
            'emergencyName': req.body.emergencyName,
            'emergencyNumber': req.body.emergencyNumber,
            'dateOfBirth': req.body.dateOfBirth,
            'age': getAge(usableDate),
        }))
        .save()
        .then((data) => res.send(data))
        .catch((error) => console.log(error));

})

//Remove "years ago" w regex
function getAge(date) { 

    const age = moment().diff(date, 'years');
    let edad = moment(date, "DD-MM-YYYY").fromNow();

    return edad;

}

function getPounds(weight) { 

    return weight * 2.2

}


module.exports = data_router;

