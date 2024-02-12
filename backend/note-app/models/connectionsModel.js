const mongoose = require('mongoose')

// connectionsSchema
const connectionsSchema = new mongoose.Schema({
    senderId: {
        type: String,
    },
    receiverId: {
        type: String,
    },
    status: {
        type: String,
    }
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Connection',connectionsSchema)