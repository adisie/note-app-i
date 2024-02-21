const multer = require('multer')
const fs = require('fs')

const createFolder = file => {
    let path = `./public/uploads/files/${file.mimetype.split('/')[0]}`
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,createFolder(file))
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const fileUpload = multer({storage})

module.exports = fileUpload