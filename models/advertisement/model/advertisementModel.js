const mongoose = require('mongoose');
const advertisementSchema = require('../schema/advertisement.schema');
const advertisementModel = mongoose.model('advertisement', advertisementSchema);

module.exports = advertisementModel;