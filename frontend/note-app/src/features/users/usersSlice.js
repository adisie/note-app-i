import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// local user
const localUser = JSON.parse(localStorage.getItem('user'))

// initialState
const initialState = {
    usersFlag: 'LOGIN',
    users: [],
    user: localUser ? localUser : null,
    isUserPending: false,
    errors: null,
    onlineUsers: [],
    isSearch: '',
}


// all users
export const allUsers = createAsyncThunk('users/allUsers',async () => {
    try{
        const response = await axios.get('/api/users/all-users')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// signup
export const signup = createAsyncThunk('users/signup',async data => {
    try{
        const response = await axios.post('/api/users/signup',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// login
export const login = createAsyncThunk('users/login',async data => {
    try{
        const response = await axios.post('/api/users/login',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// logout
export const logout = createAsyncThunk('users/logout',async () => {
    try{
        const response = await axios.get('/api/users/logout')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// check auth
export const checkAuth = createAsyncThunk('users/checkAuth',async () => {
    try{
        const response = await axios.get('/api/users/check-auth')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// usersSlice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersFlag: (state,action) => {
            state.usersFlag = action.payload
        },
        userSignupEvent: (state,action) => {
            let users = [...state.users,action.payload]
            let filteredUsers = [] 
            users.forEach(user=>{
                let isUserExist = filteredUsers.find(us=>us._id === user._id)
                if(!isUserExist){
                    filteredUsers.push(user)
                }
            })
            state.users = filteredUsers
        },
        setOnlineUsers: (state,action) => {
            let users = [...action.payload] 
            let filteredUsers = []
            users.forEach(user => {
                let isUserExist = filteredUsers.find(us => us.userId === user.userId) 
                if(!isUserExist){
                    filteredUsers.push(user)
                }
            })
            state.onlineUsers = filteredUsers
        },
        setIsSearch: (state,action) => {
            state.isSearch = action.payload
        },
        resetErrors: state => {
            state.errors = null
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // all users
            // fulfilled
            .addCase(allUsers.fulfilled,(state,action)=>{
                if(action.payload.users){
                    state.users = action.payload.users
                }
            })
            // rejected
            .addCase(allUsers.rejected, state => {
                console.log('all users rejected case')
            })
            // signup
            // pending
            .addCase(signup.pending,state=>{
                state.isUserPending = true
            })
            .addCase(signup.fulfilled,(state,action)=>{
                state.isUserPending = false
                if(action.payload.user){
                    state.user = action.payload.user 
                    state.errors = null 
                    localStorage.setItem('user',JSON.stringify(action.payload.user))
                    SOCKET.emit('userSignup',action.payload.user)
                    SOCKET.emit('userLogin',action.payload.user._id)
                }
                if(action.payload.errors){
                    state.errors = action.payload.errors 
                }
            })
            // rejected
            .addCase(signup.rejected,state=>{
                state.isUserPending = false
            })
            // login
            // pending
            .addCase(login.pending,state=>{
                state.isUserPending = true
            })
            // fulfilled
            .addCase(login.fulfilled,(state,action)=>{
                state.isUserPending = false
                if(action.payload.user){
                    state.user = action.payload.user 
                    state.errors = null 
                    localStorage.setItem('user',JSON.stringify(action.payload.user))
                    SOCKET.emit('userLogin',action.payload.user._id)
                }
                if(action.payload.errors){
                    state.errors = action.payload.errors
                }
            })
            // rejected
            .addCase(login.rejected,state=>{
                state.isUserPending = false
                console.log('login rejcted case')
            })
            // logout
            // fulfilled
            .addCase(logout.fulfilled,(state,action)=>{
                if(action.payload.message === 'logged out'){
                    SOCKET.emit('userLogout',state.user._id)
                    state.user = null 
                    state.errors = null 
                    localStorage.removeItem('user')
                }
            })
            // check-auth
            // fulfilled
            .addCase(checkAuth.fulfilled,(state,action) => {
                if(action.payload.error === 'unauthorized'){
                    if(state.user?._id){
                        SOCKET.emit('userLogout',state.user?._id)
                    }
                    state.user = null 
                    state.errors = null 
                    localStorage.removeItem('user')
                }
            })
    }
})

// actions
export const {
    setUsersFlag,
    userSignupEvent,
    setOnlineUsers,
    setIsSearch,
    resetErrors,
} = usersSlice.actions

// selectors
// usersFlag
export const selectUsersFlag = state => state.users.usersFlag 
// users
export const selectUsers = state => state.users.users
// isUserPending
export const selectIsUserPending = state => state.users.isUserPending 
// errors
export const selectErrors = state => state.users.errors 
// user
export const selectUser = state => state.users.user 
// onlineUsers
export const selectOnlineUsers = state => state.users.onlineUsers 
// isSearch
export const selectIsSearch = state => state.users.isSearch

export default usersSlice.reducer