const mongoose = require('mongoose')

// messages schema
const messagesSchema = new mongoose.Schema({
    connectionId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    receiverId: {
        type: String,
    },
    message: {
        type: String,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Message',messagesSchema)