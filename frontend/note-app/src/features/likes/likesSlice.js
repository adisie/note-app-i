import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    allLikes: [],
    isNoteId: null,
    isLikePending: false,
}

// get all likes
export const getAllLikes = createAsyncThunk('likes/getAllLikes',async () => {
    try{
        const response = await axios.get('/api/likes/all-likes')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// add new like
export const addNewLike = createAsyncThunk('likes/addNewLike',async (noteId) => {
    try{
        const response = await axios.post('/api/likes/new-like',{noteId})
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete like
export const deleteLike = createAsyncThunk('likes/deleteLike',async note_id => {
    try{
        const response = await axios.delete(`/api/likes/delete-like/${note_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})
// likesSlice
const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setIsNoteId: (state,action) => {
            state.isNoteId = action.payload 
        },
        addNewLikeEvent: (state,action) => {
            let likes = [...state.allLikes,action.payload]
            let filteredLikes = [] 
            likes.forEach(like => {
                let isLikeExist = filteredLikes.find(lk => lk._id === like._id)
                if(!isLikeExist){
                    filteredLikes.push(like)
                }
            })
            state.allLikes = filteredLikes 
        },
        deleteLikeEvent: (state,action) => {
            state.allLikes = state.allLikes.filter(like => like._id !== action.payload)
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // all likes
            // fulfilled
            .addCase(getAllLikes.fulfilled,(state,action)=>{
                if(action.payload.likes){
                    state.allLikes = action.payload.likes
                }
            })
            // add new like
            // pending 
            .addCase(addNewLike.pending, state => {
                state.isLikePending = true
            })
            // fulfilled
            .addCase(addNewLike.fulfilled, (state,action) => {
                state.isLikePending = false 
                state.isNoteId = null
                if(action.payload.like){
                    SOCKET.emit('newLike',action.payload.like)
                }
            })
            // rejected
            .addCase(addNewLike.rejected, state => {
                state.isLikePending = false
                state.isNoteId = null
            })
            // delete like
            // pending
            .addCase(deleteLike.pending, state => {
                state.isLikePending = true
            })
            // fulfilled
            .addCase(deleteLike.fulfilled,(state,action)=>{
                state.isLikePending = false 
                state.isNoteId = null 
                if(action.payload._id){
                    SOCKET.emit('deleteLike',action.payload._id)
                }
            })
            // rejected
            .addCase(deleteLike.rejected, state => {
                state.isLikePending = false 
                state.isNoteId = null 
            })
    }
})

// actions
export const {
    setIsNoteId,
    addNewLikeEvent,
    deleteLikeEvent,
} = likesSlice.actions

// selectors
// isNoteId 
export const selectIsNoteId = state => state.likes.isNoteId 
// isLikePending
export const selectIsLikePending = state => state.likes.isLikePending 
// allLikes
export const selectAllLikes = state => state.likes.allLikes 

export default likesSlice.reducer