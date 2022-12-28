const joi = require('joi');

const addAdvertisementValidation = {
    body: joi.object().required().keys({
        title: joi.string().required().messages({
            "string.empty": "You have to enter location",
        }),
        desc: joi.string().required().messages({
            "string.empty": "You have to enter location",
        }),
    })
};

const updateAdvertisementValidation = {
    body: joi.object().optional().keys({
        title: joi.string().required().messages({
            "string.empty": "You have to enter title",
        }),
        desc: joi.string().optional().messages({
            "string.empty": "You have to enter description",
        }),
    })
};

module.exports = {
    addAdvertisementValidation,
    updateAdvertisementValidation,
}