const joi = require('joi');

const addPostValidation = {
    body: joi.object().required().keys({
        title: joi.string().required().messages({
            "string.empty": "You have to enter title",
            "any.required": "You have to enter title"
        }),
        desc: joi.string().required().messages({
            "string.empty": "You have to enter description",
            "any.required": "You have to enter description"
        }),
        createdBy: joi.string().required().messages({
            "string.empty": "You have to enter user id",
            "any.required": "You have to enter user id"
        }),
        isBlocked: joi.boolean().optional().messages({
            "string.empty": "You have to enter user id"
        }),

    })
};

const updatePostValidation = {
    body: joi.object().optional().keys({
        title: joi.string().required().messages({
            "string.empty": "You have to enter title",
        }),
        desc: joi.string().optional().messages({
            "string.empty": "You have to enter description",
        }),
        createdBy: joi.string().optional().messages({
            "string.empty": "You have to enter user id",
        }),

    })
};

module.exports = {
    addPostValidation,
    updatePostValidation,
}