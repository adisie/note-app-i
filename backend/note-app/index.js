require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const PORT = process.env.PORT || 5050
const app = express()
const server = http.createServer(app)

// configration settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// db connections
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('CONNECTED')
    server.listen(PORT,()=>{
        console.log('LISTENING')
    })
})
.catch(err=>{
    console.log('db connection error')
    process.exit(-1)
})


// routes
// usersRoutes
app.use('/api/users',require('./routes/usersRoutes'))
// notesRoutes
app.use('/api/notes',require('./routes/notesRoutes'))
