const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
})

module.exports = advertisementSchema;