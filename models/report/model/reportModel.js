const mongoose = require('mongoose');
const reportSchema = require('../schema/report.schema');
const reportModel = mongoose.model('report', reportSchema);

module.exports = reportModel;