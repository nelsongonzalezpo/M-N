//Modelo de publicacinoes laborales
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        minlength: 4,

    },
    description: {
        type: String,
        trim: true,
        minlength: 4,

    },
    moreDescription: {
        type: String,
        trim: true,
        minLength: 2,
    },
    final: {
        type: String,
        trim: true,
        minLength: 1,
    }
   

})

const Data = mongoose.model('Data', DataSchema)

module.exports = Data;