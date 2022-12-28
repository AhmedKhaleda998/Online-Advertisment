const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const personSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cPassword: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    deactivated: {
        type: Boolean,
        default: false
    },

})

personSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, process.env.SALTROUNDS);
    next();
})


module.exports = personSchema;