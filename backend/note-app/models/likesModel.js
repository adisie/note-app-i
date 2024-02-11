const mongoose = require('mongoose')

// likesSchema
const likesSchema = new mongoose.Schema({
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

// exports
module.exports = mongoose.model('Like',likesSchema)