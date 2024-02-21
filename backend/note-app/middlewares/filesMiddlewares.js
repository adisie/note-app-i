const multer = require('multer')
const fs = require('fs')

// create folder for the file
const createFolderPath = () => {
    let path = './public/uploads/files'
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}

// storage
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,createFolderPath())
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

// single file upload
const singleFileUpload = multer({storage})

// exports
module.exports = singleFileUpload