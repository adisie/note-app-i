const mongoose = require('mongoose')

// commentsSchema 
const commentsSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    },
    comment: {
        type: String,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Comment',commentsSchema)