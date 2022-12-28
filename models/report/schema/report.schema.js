const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person',
        required: true
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    reportComment: {
        type: String,
        required: true
    },

})

module.exports = reportSchema;