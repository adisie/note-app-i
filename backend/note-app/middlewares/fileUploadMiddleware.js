const multer = require('multer')
const fs = require('fs')

// generate folder
// note file
const createFolderNoteFile = req => {
    let path = `./public/uploads/note-fle/${req.user.username}` 
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}
// noteFile
const noteFile = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,createFolderNoteFile(req))
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const fileUpload = multer({storage:noteFile})

// exports
module.exports = {
    fileUpload,
}