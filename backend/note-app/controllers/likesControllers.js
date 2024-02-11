
// models
// Like
const Like = require('../models/likesModel')

// get all likes
const allLikes = async (req,res) => {
    try{
        const likes = await Like.find() 
        res.status(200).json({likes})
    }catch(err){
        res.status(400).json({
            error: 'get all likes error'
        })
    }
}

// new like
const addNewLike = async (req,res) => {
    try{
        const userId = req.user._id 
        const noteId = req.body.noteId 
        const like = await Like.create({noteId,userId})
        res.status(200).json({
            like,
        })
    }catch(err){
        res.status(200).json({
            error: 'add new like error'
        })
    }
}

// delete like
const deleteLike = async (req,res) => {
    try{
        const noteId = req.params.note_id
        const userId = req.user._id
        const like = await Like.findOne({noteId,userId})
        let _id = like._id
        await like.deleteOne()
        res.status(200).json({_id,noteId,userId})
    }catch(err){
        res.status(400).json({
            error: 'delete like error'
        })
    }
}

// exports
module.exports = {
    allLikes,
    addNewLike,
    deleteLike,
}