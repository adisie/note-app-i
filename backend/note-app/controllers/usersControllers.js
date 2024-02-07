const bcryptjs = require('bcryptjs')

// models
// usersModel
// User
const User = require('../models/usersModel')

// utils
// usersUtils
const {
    MAX_AGE,
    errorHandler,
    generateToken,
} = require('../utils/usersUtils')

// signup
const signup = async (req,res) => {
    try{
        const {username,email,password} = req.body 
        const user = await User.create({username,email,password})
        // token
        const token = generateToken(user._id)
        // set token into cookies
        res.cookie('token',token,{
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
            }
        })
    }catch(err){
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}

// login
const login = async (req,res) => {
    try{
        const {username,password} = req.body 
        if(!username?.trim()){
            throw new Error('username required')
        }
        if(!password){
            throw new Error('password required')
        }

        const user = await User.findOne({username}) 
        if(!user){
            throw new Error('username not found')
        }
        // isPasswordMatch
        const isPasswordMatch = bcryptjs.compareSync(password,user.password) 
        if(!isPasswordMatch){
            throw new Error('incorrect password')
        }

        // token
        const token = generateToken(user._id)
        // set token into cookies
        res.cookie('token',token,{
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
            }
        })

    }catch(err){
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}

// logout
const logout = (req,res) => {
    try{
        res.cookie('token','',{maxAge: 1})
        res.status(200).json({
            message: 'logged out'
        })
    }catch(err){
        res.status(400).json({
            error: 'logout error'
        })
    }
}

// checkAuth
const checkAuth = (req,res) => {
    try{
        res.status(200).json({
            message: 'authorized',
            user: req.user,
        })
    }catch(err){
        res.status(400).json({
            error: 'check-auth error'
        })
    }
}

// allUsers
const allUsers = async (req,res) => {
    try{
        const users = await User.find().select({
            _id: 1,
            username: 1,
        }).sort({
            username: 1,
        })
        res.status(200).json({users})
    }catch(err){
        res.status(400).json({
            error: 'get all users error'
        })
    }
}

// exports
module.exports = {
    signup,
    login,
    logout,
    checkAuth,
    allUsers,
}