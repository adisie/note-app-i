const fs = require('fs')

// models
// notesSchema
// Note
const Note = require('../models/notesModel')

// allNotes
const allNotes = async (req,res) => {
    try{
        const notes = await Note.find().select({
            _id: 1,
            authorId: 1,
            note: 1,
            filePath: 1,
            createdAt: 1,
        }).sort({
            createdAt: -1,
        })
        res.status(200).json({notes})
    }catch(err){
        res.status(400).json({
            error: 'get all notes error'
        })
    }
}

// newNote
const newNote = async (req,res) => {
    try{
        const {note} = req.body 
        const filePath = req.file.path 
        const authorId = req.user._id 
        const newNote = await Note.create({authorId,note,filePath})
        res.status(200).json({
            note: {
                _id: newNote._id,
                authorId: newNote.authorId,
                note: newNote.note,
                filePath: newNote.filePath,
                createdAt: newNote.createdAt,
            }
        })
    }catch(err){
        res.status(400).json({
            error: 'add new note error'
        })
    }
}

// deleteNote
const deleteNote = async (req,res) => {
    try{
        const _id = req.params._id 
        const note = await Note.findById(_id)
        if(!note){
            return res.status(400).json({
                error: 'note not found'
            })
        }
        if(note.authorId.toString() !== req.user._id.toString()){
            return res.status(400).json({
                error: 'unauthorized to delete note'
            })
        }
        if(fs.existsSync(note.filePath)){
            fs.unlinkSync(note.filePath)
        }
        await note.deleteOne()
        res.status(200).json({
            message: 'note deleted',
            _id,
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'delete note error'
        })
    }
}

// exports
module.exports = {
    allNotes,
    newNote,
    deleteNote,
}