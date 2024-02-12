
// models
const Connection = require('../models/connectionsModel')

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

// delete connection
const deleteConnection = (req,res) => {
    res.status(200).json('delete connection')
}

// exports
module.exports = {
    allConnections,
    newConnection,
    deleteConnection,
}