const app = require("express").Router()
const { addPerson, updatePerson, updatePassword, updateDeactivated, addAdmin, getAllUser, getAllAdmin, signIn } = require('../controller/person')
const validator = require('../../../validation/common.validation')
const { addPersonValidation, signInPersonValidation, updatePersonValidation, updatePasswordValidation } = require('../validation/person.validation')
const isAuthorized = require("../../../config/isAuthorized")
const { ADD_ADMIN, GET_ALL_ADMIN } = require("../../../endPoints/endPoints")

app.get('/getAllUser', getAllUser);
app.get('/getAllAdmin', isAuthorized(GET_ALL_ADMIN), getAllAdmin)
app.post('/addPerson', validator(addPersonValidation), addPerson)
app.post('/addAdmin', [isAuthorized(ADD_ADMIN), validator(addPersonValidation)], addAdmin)
app.post('/signIn', validator(signInPersonValidation), signIn)
app.put('/updatePerson/:id', validator(updatePersonValidation), updatePerson)
app.put('/updatePassword/:id', validator(updatePasswordValidation), updatePassword)
app.put('/updateDeactivated/:id', updateDeactivated)

module.exports = app