
// models
const Connection = require('../models/connectionsModel')
const Message = require('../models/messagesModel')

// all connections
const allConnections = async (req,res) => {
    try{
        const connections = await Connection.find({$or: [{senderId: req.user._id.toString()},{receiverId:  req.user._id.toString()}]}).select({
            _id: 1,
            senderId: 1,
            receiverId: 1,
            status: 1,
            createdAt: 1,
        }).sort({
            createdAt: -1,
        })
        res.status(200).json({connections})
    }catch(err){
        res.status(400).json({
            error: 'get all my connection error'
        })
    }
}

// pending connections
const pendingConnections = async (req,res) => {
    try{
        const pendingConnections = await Connection.find({senderId: req.user._id.toString(),status: 'pending'}) 

        res.status(200).json({
            pendingConnections,
        })
    }catch(err){
        res.status(400).json({
            error: "get pending connections error"
        })
    }
}

// request connections
const requestedConnections = async (req,res) => {
    try{
        const requestedConnections = await Connection.find({receiverId: req.user._id.toString(),status: 'pending'}) 

        res.status(200).json({
            requestedConnections,
        })
    }catch(err){
        res.status(400).json({
            error: "get requested connections error"
        })
    }
}

// new connection
const newConnection = async (req,res) => {
    try{
        const {receiverId} = req.body
        const senderId = req.user._id.toString()
        const connection = await Connection.create({senderId,receiverId,status: 'pending'})
        res.status(200).json({connection: {
            _id: connection._id,
            senderId: connection.senderId,
            receiverId: connection.receiverId,
            status: connection.status,
            createdAt: connection.createdAt,
        }})
    }catch(err){
        res.status(400).json({
            error: 'new connection error'
        })
    }
}

// accept connection 
const acceptConnection = async (req,res) => {
    try{
        const _id = req.params._id 
        const acceptedConnection = await Connection.findOneAndUpdate({_id},{$set: {status: 'accepted'}})
        res.status(200).json({
            acceptedConnection,
        })
    }catch(err){
        res.status(400).json({
            error: 'accept connection error'
        })
    }
}

// all accepted connections
const allAcceptedConnections = async (req,res) => {
    try{
        const acceptedConnections = await Connection.find({$or: [{senderId: req.user._id.toString()},{receiverId:  req.user._id.toString()}],status: 'accepted'}) 

        res.status(200).json({
            acceptedConnections,
        })
    }catch(err){
        res.status(400).json({
            error: 'get all accepted connections error'
        })
    }
}

// delete connection
const deleteConnection = async (req,res) => {
    try{
        await Message.deleteMany({connectionId: req.params._id.toString()}) 
        const connection = await Connection.findById(req.params._id)
        await Connection.findByIdAndDelete(req.params._id)
        res.status(200).json({connection})
    }catch(err){
        res.status(200).json({
            error: 'delete connection error'
        })
    }
}

// exports
module.exports = {
    allConnections,
    pendingConnections,
    requestedConnections,
    acceptConnection,
    allAcceptedConnections,
    newConnection,
    deleteConnection,
}