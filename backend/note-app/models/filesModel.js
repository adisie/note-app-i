const mongoose = require('mongoose')

// fiiles schema
const filesSchema = new mongoose.Schema({
    filePath: {
        type: String,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('File',filesSchema)