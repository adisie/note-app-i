const mongoose = require('mongoose')

// notifications schema
const notificationsSchema = new mongoose.Schema({
    receiverId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    flag: {
        type: String,
    },
    isRead: {
        type: Boolean,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Notification',notificationsSchema)