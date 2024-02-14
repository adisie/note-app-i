// models
const Message = require('../models/messagesModel')

// all messages
const allMessages = async (req,res) => {
    try{
        const messages = await Message.find({$or: [{senderId: req.user._id.toString()},{receiverId: req.user._id.toString()}]})
        res.status(200).json({messages})
    }catch(err){
        res.status(400).json({
            error: 'get all messages error'
        })
    }
}

// new message
const newMessage = async (req,res) => {
    try{
        const {connectionId,senderId,receiverId,message} = req.body 
        const newMessage = await Message.create({connectionId,senderId,receiverId,message})
        res.status(200).json({newMessage})
    }catch(err){
        res.status(400).json({
            error: 'new message error'
        })
    }
}

// delete message 
const deleteMessage = async (req,res) => {
    try{
        const _id = req.params._id 
        const message = await Message.findById(_id)
        await Message.findByIdAndDelete(_id)
        res.status(200).json({message})
    }catch(err){
        res.status(200).json({
            error: 'delete message error'
        })
    }
}

// exports
module.exports = {
    allMessages,
    newMessage,
    deleteMessage,
}