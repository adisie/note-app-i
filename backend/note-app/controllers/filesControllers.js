const fs = require('fs')

// models
// fils model
const File = require('../models/filesModel')

// all files
const files = async (req,res) => {
    try{
        const files = await File.find()
        res.status(200).json({files})
    }catch(err){
        res.status(400).json({
            error: 'get all files error'
        })
    }
}

// new file
const newFile = async (req,res) => {
    try{
        const filePath = req.file?.path 
        if(filePath){
            const file = await File.create({filePath})
            return res.status(200).json({file})
        }else {
            console.log('WHAT IS WRONG')
            return res.status(400).json({
                error: 'add new file error'
            })
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'add new file error'
        })
    }
}

// delete file
const deleteFile = async (req,res) => {
    try{
        const file = await File.findById({_id: req.params._id}) 
        if(file){
            if(fs.existsSync(file.filePath)){
                fs.unlinkSync(file.filePath)
            }
            await file.deleteOne()
            return res.status(200).json({
                message: 'file deleted',
                _id: req.params._id,
            })
        }else{
            return res.status(400).json({
                error: 'file not exist error'
            })
        }
    }catch(err){
        res.status(400).json({
            error: 'delete file error'
        })
    }
}

// exports
module.exports = {
    files,
    newFile,
    deleteFile,
}