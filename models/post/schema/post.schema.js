const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person',
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    },
})

module.exports = postSchema;