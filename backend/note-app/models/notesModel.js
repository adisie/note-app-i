const mongoose = require('mongoose')

// notesSchema 
const notesSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    note: {
        type: String,
    },
    filePath: {
        type: String,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Note',notesSchema)