import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// local user
const localUser = JSON.parse(localStorage.getItem('user'))

// initialState
const initialState = {
    usersFlag: 'LOGIN',
    users: [],
    user: localUser ? localUser : null,
    isUserPending: false,
    errors: null,
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

// usersSlice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersFlag: (state,action) => {
            state.usersFlag = action.payload
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

export default usersSlice.reducer