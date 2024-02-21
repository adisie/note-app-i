const mongoose = require('mongoose')

// schema
const filesSchema = new mongoose.Schema({
    files: {
        type: Array,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('File',filesSchema)