
// models
// commentsModels
const Comment = require('../models/commentsModel')
// notesModels
// Note
const Note = require('../models/notesModel')

// allComments
const allComments = async (req,res) => {
    try{
        const comments = await Note.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'noteId',
                    as: 'comments',
                },
            },
            {
                $project: {
                    _id: 1,
                    comments: {
                        _id: 1,
                        authorId: 1,
                        comment: 1,
                        createdAt: 1,
                    }
                }
            }
        ])
        res.status(200).json({comments})
    }catch(err){
        res.status(400).json({
            error: 'get all comments error'
        })
    }
}
// newComment
const newComment = async (req,res) => {
    try{
        const {comment,noteId} = req.body
        const authorId = req.user._id 
        const newComment = await Comment.create({authorId,noteId,comment})
        res.status(200).json({
            newComment,
        })
    }catch(err){
        res.status(400).json({
            error: 'add new comment error'
        })
    }
}

// deleteComment
const deleteComment = async (req,res) => {
    try{
        const _id = req.params._id 
        const comment = await Comment.findById(_id)
        if(!comment){
            return res.status(400).json({
                error: 'comment not found error'
            })
        }
        if(comment.authorId.toString() !== req.user._id.toString()){
            return res.status(401).json({
                error: 'unauthorized to delete comment'
            })
        }
        await comment.deleteOne()
        res.status(200).json({
            message: 'comment deleted'
        })
    }catch(err){
        res.status(400).json({
            error: 'delete comment error'
        })
    }
}

// exports
module.exports = {
    allComments,
    newComment,
    deleteComment,
}