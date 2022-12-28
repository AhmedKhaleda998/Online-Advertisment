const joi = require('joi');

const userReportingValidation = {
    body: joi.object().required().keys({
        reportComment: joi.string().required().messages({
            "string.empty": "You have to enter reportComment",
        }),
    })
};


module.exports = {
    userReportingValidation,
}