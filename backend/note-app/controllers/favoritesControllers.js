// models
// favoritesModel
const Favorite = require('../models/favoritesModel')

// all my favorites
const allMyFavorites = async (req,res) => {
    try{
        const favorites = await Favorite.find({userId: req.user._id}).select({
            _id: 1,
            userId: 1,
            noteId: 1,
            createdAt: 1,
        }).sort({
            createdAt: -1,
        })
        res.status(200).json({favorites})
    }catch(err){
        res.status(400).json({
            error: 'get all my favorites error'
        })
    }
}

// add new favorites
const addNewFavorite = async (req,res) => {
    try{
        const {noteId} = req.body 
        const favorite = await Favorite.create({userId: req.user._id,noteId})
        res.status(200).json({
            favorite: {
                _id: favorite._id,
                userId: favorite.userId,
                noteId: favorite.noteId,
                createdAt: favorite.createdAt,
            }
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'add new favorite error'
        })
    }
}

// delete favorite
const deleteFavorite = async (req,res) => {
    try{
        const _id = req.params._id 
        const favorite = await Favorite.findById(_id) 
        if(!favorite) {
            return res.status(400).json({
                error: 'favorite not found'
            })
        }
        if(favorite.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({
                error: 'unauthorized to delete favorite'
            })
        }
        await favorite.deleteOne()
        res.status(200).json({
            _id,
            message: 'favorite removed',
        })
    }catch(err){
        res.status(400).json({
            error: 'delete favorite error'
        })
    }
}

// exports
module.exports = {
    allMyFavorites,
    addNewFavorite,
    deleteFavorite,
}