require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


// constants
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URI

const app = express()

// settings
app.use(cors({
    origin: true,
    credentials: true,
}))

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log('CONNECTED')
    app.listen(PORT,()=>{
        console.log('LISTENING')
    })
})
.catch(err=>{
    console.log(err)
})

// routes
// files routes
app.use('/api/files',require('./routes/filesRoutes'))
// public route
app.use('/public',express.static('public'))



