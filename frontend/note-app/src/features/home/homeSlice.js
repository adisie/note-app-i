import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// initial states
const initialState = {
    files: [],
    isFileUploading: false,
}

// files
export const files = createAsyncThunk('files/files',async () => {
    try{
        const response = await axios.get('/api/files/files')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// new file
export const newFile = createAsyncThunk('files/newFile',async data => {
    try{
        const response = await axios.post('/api/files/new-file',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete file
export const deleteFile = createAsyncThunk('files/deleteFile',async _id => {
    try{
        const response = await axios.delete(`/api/files/delete-file/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// home slice
const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            // cases
            // files
            // fulfilled
            .addCase(files.fulfilled,(state,action)=>{
                if(action.payload.files){
                    state.files = action.payload.files
                }
            })
            // new file
            // pending
            .addCase(newFile.pending,state => {
                state.isFileUploading = true
            })
            // fulfilled
            .addCase(newFile.fulfilled,(state,action)=>{
                state.isFileUploading = false 
                if(action.payload.file){
                    state.files = [...state.files,action.payload.file]
                }
            })
            // rejected
            .addCase(newFile.rejected,state=>{
                state.isFileUploading = false
            })
            // delete file
            .addCase(deleteFile.fulfilled,(state,action)=>{
                if(action.payload._id){
                    state.files = state.files.filter(file => file._id !== action.payload._id)
                }
            })
    },
})

// selectors
// files
export const selectFiles = state => state.home.files
// isFileUploading
export const selectIsFileUploading = state => state.home.isFileUploading

export default homeSlice.reducer