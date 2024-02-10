const mongoose = require('mongoose')

// favorites schema
const favoritesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Favorite',favoritesSchema)