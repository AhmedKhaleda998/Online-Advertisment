const joi = require('joi');

const addPersonValidation = {
    body: joi.object().required().keys({
        userName: joi.string().alphanum().min(4).max(25).required().messages({
            "string.empty": "You have to enter a username",
            "string.pattern.base": "Please enter a valid username",
            "any.required": "You have to enter a username"
        }),
        email: joi.string().email().required().messages({
            "string.empty": "You have to enter an email",
            "string.pattern.base": "Please enter a valid username",
            "any.required": "You have to enter an email"
        }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
            "string.empty": "You have to enter password",
            "string.pattern.base": "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number",
            "any.required": "You have to enter a password"
        }),
        cPassword: joi.ref('password'),
        phone: joi.number().min(5).required().messages({
            "number.base": "Please enter a valid phone number",
            "any.required": "You have to enter at least one phone number"
        }),
        location: joi.string().required().messages({
            "string.empty": "You have to enter a location",
        }),
        role: joi.string().optional().messages({
            "string.empty": "You have to enter a role",
        }),
        deactivated: joi.boolean().optional().messages({
            "string.empty": "You have to enter deactivated",
        }),
    })
};

const signInPersonValidation = {
    body: joi.object().required().keys({
        userName: joi.string().alphanum().min(4).max(25).required().messages({
            "string.empty": "You have to enter a first name",
            "string.pattern.base": "Please enter a valid username",
            "any.required": "You have to enter a username"
        }),
        password: joi.string().required().messages({
            "any.required": "You have to enter a password",
        }),
    })
};

const updatePersonValidation = {
    body: joi.object().required().keys({
        userName: joi.string().alphanum().min(4).max(25).optional().messages({
            "string.empty": "You have to enter a username",
            "string.pattern.base": "Please enter a valid username",
            "any.required": "You have to enter a username"
        }),
        email: joi.string().email().optional().messages({
            "string.empty": "You have to enter an email",
            "string.pattern.base": "Please enter a valid user name",
            "any.required": "You have to enter an email"
        }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).optional().messages({
            "string.empty": "You have to enter password",
            "string.pattern.base": "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number",
            "any.required": "You have to enter password"
        }),
        cPassword: joi.ref('password'),
        phone: joi.number().min(5).optional().messages({
            "number.base": "Please enter a valid phone number",
            "any.required": "You have to enter at least one phone number"
        }),
        location: joi.string().optional().messages({
            "string.empty": "You have to enter a location",
        }),
        role: joi.string().optional().messages({
            "string.empty": "You have to enter a role",
        }),
        deactivated: joi.boolean().optional().messages({
            "string.empty": "You have to enter deactivated",
        }),
    })
};

const updatePasswordValidation = {
    body: joi.object().required().keys({
        oldPassword: joi.string().required().messages({
            "any.required": "You have to enter password",
        }),
        newPassword: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).optional().messages({
            "string.empty": "You have to enter password",
            "string.pattern.base": "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number",
            "any.required": "You have to enter a password"
        }),
        cNewPassword: joi.ref('newPassword'),
    })
};


module.exports = {
    addPersonValidation,
    signInPersonValidation,
    updatePersonValidation,
    updatePasswordValidation,
}