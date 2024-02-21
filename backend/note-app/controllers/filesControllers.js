const fs = require('fs')
// models
const File = require('../models/filesModel')

// get all files
const getAllFiles = async (req,res) => {
    try{
        const files = await File.find().select({_id: 1,files: 1,createdAt: 1})
        res.status(200).json({files})
    }catch(err){
        res.status(400).json({
            error: 'get all files error'
        })
    }
}

// add new files
const addNewFiles = async (req,res) => {
    try{
        let files = []
        // console.log(req.files) 
        req.files?.forEach(file=>files.push(file.path)) 
        if(files.length > 0){
            const newFiles = await File.create({files})
            return res.status(200).json({
                newFiles: {
                    _id: newFiles._id,
                    files: newFiles.files,
                    createdAt: newFiles.createdAt,
                }
            })
        }else{
            return res.status(400).json({
                error: 'no file selected error'
            })
        }
    }catch(err){
        res.status(200).json({
            error: 'add new file error'
        })
    }
}

// delete files
const deleteFiles = async (req,res) => {
    try{
        const file = await File.findById(req.params._id) 
        if(file.files){
            file.files.forEach(fl => {
                if(fs.existsSync(fl)){
                    fs.unlinkSync(fl)
                }
            })
            await file.deleteOne() 
            return res.status(200).json({
                message: 'files deleted',
                _id: req.params._id,
            })
        }else {
            return res.status(400).json({
                error: 'file note exist'
            })
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'delete files error'
        })
    }
}

// exports
module.exports = {
    getAllFiles,
    addNewFiles,
    deleteFiles,
}