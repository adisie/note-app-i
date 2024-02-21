require('dotenv').config()
const express = require('express')
const monooges = require('mongoose')
const cors = require('cors')

// constants
const PORT = process.env.PORT || 5050
const MONGODB_URL = process.env.MONGODB_URI 

const app = express()

app.use(cors({
    origin: true,
    credentials: true,
}))

// db connection
monooges.connect(MONGODB_URL)
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
app.use('/api/files',require('./routes/filesRoutes'))
app.use('/public',express.static('public'))


