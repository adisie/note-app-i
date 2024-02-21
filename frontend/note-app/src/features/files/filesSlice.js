import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    files: [],
}

// all files
export const getAllFiles = createAsyncThunk('files/getAllFiles',async () => {
    try{
        const response = await axios.get('/api/files/files')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// new files
export const addNewFiles = createAsyncThunk('files/addNewFiles',async data => {
    try{
        const response = await axios.post('/api/files/new-files',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete files
export const deleteFiles = createAsyncThunk('files/deleteFiles',async _id => {
    try{
        const response = await axios.delete(`/api/files/delete-files/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            // cases
            .addCase(getAllFiles.fulfilled,(state,action)=>{
                if(action.payload.files){
                    state.files = action.payload.files
                }
            })
            // new files
            .addCase(addNewFiles.fulfilled,(state,action)=>{
                if(action.payload.newFiles){
                    state.files = [...state.files,action.payload.newFiles]
                }
            })
            // delete files
            .addCase(deleteFiles.fulfilled,(state,action)=>{
                if(action.payload._id){
                    state.files = state.files.filter(file => file._id !== action.payload._id)
                }
            })
    }
})



// selectors
export const selectFiles = state => state.files.files

export default filesSlice.reducer