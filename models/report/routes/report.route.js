const app = require("express").Router();
const { userReporting, getAllReport } = require('../controller/report.controller');
const validator = require('../../../validation/common.validation');
const { userReportingValidation } = require('../validation/report.validation');
const isAuthorized = require("../../../config/isAuthorized");
const { USER_REPORTING, GET_ALL_REPORTING } = require("../../../endPoints/endPoints")


app.post('/userReporting', [isAuthorized(USER_REPORTING), validator(userReportingValidation)], userReporting);
app.get('/getAllReport', [isAuthorized(GET_ALL_REPORTING)], getAllReport);


module.exports = app;