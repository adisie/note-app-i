import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    isComment: null,
    comments: [],
    isCommentPending: false,
    isCommentDeleting: false,
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

// newComment
export const newComment = createAsyncThunk('comments/newComment',async data => {
    try{
        const response = await axios.post('/api/comments/new-comment',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// deleteComment
export const deleteComment = createAsyncThunk('comments/deleteComment',async _id => {
    try{
        const response = await axios.delete(`/api/comments/delete-comment/${_id}`)
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
        newCommentEvent: (state,action) => {
            let index = state.comments.findIndex(com=>com._id === action.payload.noteId)
            let noteComments = state.comments.find(com=>com._id === action.payload.noteId)
            let comments = [...noteComments?.comments,{
                _id: action.payload._id,
                authorId: action.payload.authorId,
                comment: action.payload.comment,
                createdAt: action.payload.createdAt
            }]
            let filteredComments = [] 
            comments.forEach(comment=>{
                let isCommentExist = filteredComments.find(com=>com._id === comment._id) 
                if(!isCommentExist){
                    filteredComments.push(comment)
                }
            })
            state.comments.at(index).comments = filteredComments
        },
        deleteCommentEvent: (state,action) => {
            let index = state.comments.findIndex(com=>com._id === action.payload.noteId)
            let noteComments = state.comments.find(com=>com._id === action.payload.noteId) 
            let comments = noteComments.comments.filter(com=>com._id !== action.payload.commentId)
            state.comments.at(index).comments = comments
        },
        newNoteCommentEvent: (state,action) => {
            let newNoteComment = {_id: action.payload,comments: []}
            state.comments = [...state.comments,newNoteComment]
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
            // new comment
            // pending
            .addCase(newComment.pending,state=>{
                state.isCommentPending = true
            })
            // fulfilled
            .addCase(newComment.fulfilled,(state,action)=>{
                state.isCommentPending = false
                if(action.payload.newComment){
                    SOCKET.emit('newComment',action.payload.newComment)
                }
            })
            // rejected
            .addCase(newComment.rejected,state=>{
                state.isCommentPending = false
            })
            // delete comment
            // pending
            .addCase(deleteComment.pending,state=>{
                state.isCommentDeleting = true
            })
            // fulfilled
            .addCase(deleteComment.fulfilled,(state,action)=>{
                state.isCommentDeleting = false 
                if(action.payload._id){
                    SOCKET.emit('deleteComment',{noteId: state.isComment,commentId: action.payload._id})
                }
            })
            // rejected
            .addCase(deleteComment.rejected,state=>{
                state.isCommentDeleting = false
            })
    }
})

// actions
export const {
    setIsComment,
    newCommentEvent,
    deleteCommentEvent,
    newNoteCommentEvent,
} = commmentsSlice.actions

// selectors
// isComment
export const selectIsComment = state => state.comments.isComment 
// commenst
export const selectComments = state => state.comments.comments 
// isCommentPending
export const selectIsCommentPending = state => state.comments.isCommentPending
// isCommentDeleting
export const selectIsCommentDeleting = state => state.comments.isCommentDeleting 

export default  commmentsSlice.reducer