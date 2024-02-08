import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// initialState
const initialState = {
    isComment: null,
    comments: [],
}

// allComments
export const allComments = createAsyncThunk('comments/allComments',async () => {
    try{
        const response = await axios.get('/api/comments/all-comments')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// commentsSlice
const commmentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setIsComment: (state,action) => {
            state.isComment = action.payload 
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // all comments
            // fulfilled
            .addCase(allComments.fulfilled,(state,action)=>{
                if(action.payload.comments){
                    state.comments = action.payload.comments
                }
            })
            // rejected
            .addCase(allComments.rejected, state=>{
                console.log('all comments rejected case')
            })
    }
})

// actions
export const {
    setIsComment,
} = commmentsSlice.actions

// selectors
// isComment
export const selectIsComment = state => state.comments.isComment 
// commenst
export const selectComments = state => state.comments.comments 

export default  commmentsSlice.reducer