
// models
const Notification = require('../models/NotificationsModel')

// all notifications
const allNotifications = async (req,res) => {
    try{
        const notifications = await Notification.find({receiverId: req.user._id.toString()}).sort({createdAt: -1}) 
        res.status(200).json({notifications})
    }catch(err){
        res.status(400).json({
            error: 'get all my notifications error'
        })
    }
}

const readAllNotifications = async (req,res) => {
    try{
        await Notification.updateMany({receiverId: req.user._id.toString()},{isRead: true})
        res.status(200).json({
            message: 'all notification is read'
        })
    }catch(err){
        res.status(400).json({
            error: 'read all notifications error'
        })
    }
}

// new notifications
const newNotification = (req,res) => {
    res.status(200).json({
        message: 'new notification'
    })
}

// delete notification
const deleteNotification = (req,res) => {
    res.status(200).json({
        message: 'delete notifications'
    })
}

// exports
module.exports = {
    allNotifications,
    newNotification,
    deleteNotification,
    readAllNotifications,
}