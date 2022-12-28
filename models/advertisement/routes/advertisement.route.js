const app = require("express").Router();
const { addAdvertisement, getAdvertisement, updateAdvertisement, deleteAdvertisement } = require('../controller/advertisement.controller');
const validator = require('../../../validation/common.validation');
const { addAdvertisementValidation, updateAdvertisementValidation } = require('../validation/advertisement.validation');
const { ADD_ADVERTISEMENT, GET_ADVERTISEMENT, UPDATE_ADVERTISEMENT, DELETE_ADVERTISEMENT } = require("../../../endPoints/endPoints");
const isAuthorized = require("../../../config/isAuthorized");

app.post('/addAdvertisement', [isAuthorized(ADD_ADVERTISEMENT), validator(addAdvertisementValidation)], addAdvertisement);
app.put('/updateAdvertisement/:id', [isAuthorized(UPDATE_ADVERTISEMENT), validator(updateAdvertisementValidation)], updateAdvertisement);
app.get('/getAdvertisement', [isAuthorized(GET_ADVERTISEMENT)], getAdvertisement);
app.delete('/deleteAdvertisement/:id', [isAuthorized(DELETE_ADVERTISEMENT)], deleteAdvertisement);


module.exports = app;