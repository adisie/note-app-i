import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    notes: [],
    isNotePending: false,
    isNoteDeleting: false,
}

// allNotes
export const allNotes = createAsyncThunk('notes/allNotes',async () => {
    try{
        const response = await axios.get('/api/notes/all-notes')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// newNote
export const newNote = createAsyncThunk('notes/newNote',async data => {
    try{
        const response = await axios.post('/api/notes/new-note',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// deleteNote
export const deleteNote = createAsyncThunk('notes/deleteNote',async _id => {
    try{
        const response = await axios.delete(`/api/notes/delete-note/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// notesSlice
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        newNoteEvent: (state,action) => {
            let notes = [action.payload,...state.notes] 
            let filteredNotes = [] 
            notes.forEach(note=>{
                let isNoteExist = filteredNotes.find(not=>not._id === note._id)
                if(!isNoteExist){
                    filteredNotes.push(note)
                }
            })
            state.notes = filteredNotes 
        },
        deleteNoteEvent: (state,action) => {
            let notes = state.notes 
            notes = notes.filter(note=>note._id !== action.payload) 
            state.notes = notes
        }
    },
    extraReducers: builder => {
        builder
            // cases
            // all notes
            // fulfilled
            .addCase(allNotes.fulfilled,(state,action) => {
                if(action.payload.notes){
                    state.notes = action.payload.notes
                }
            } )
            // rejected
            .addCase(allNotes.rejected, state => {
                console.log('all notes rejected case')
            })
            // new note
            // pending
            .addCase(newNote.pending,state=>{
                state.isNotePending = true
            })
            // fulfilled
            .addCase(newNote.fulfilled,(state,action)=>{
                state.isNotePending = false
                if(action.payload.note){
                    SOCKET.emit('newNote',action.payload.note)
                }
            })
            // rejected
            .addCase(newNote.rejected,state=>{
                state.isNotePending = false
            })
            // delete note
            // pending
            .addCase(deleteNote.pending,state=>{
                state.isNoteDeleting = true
            })
            // rejected
            .addCase(deleteNote.fulfilled,(state,action)=>{
                state.isNoteDeleting = false 
                if(action.payload._id){
                    SOCKET.emit('deleteNote',action.payload._id)
                }
            })
            // fulfilled
            .addCase(deleteNote.rejected,state=>{
                state.isNoteDeleting = false
            })
    },
})

// actions
export const {
    newNoteEvent,
    deleteNoteEvent,
} = notesSlice.actions
// selectors
// notes
export const selectNotes = state => state.notes.notes
// isNotePending
export const selectIsNotePending = state => state.notes.isNotePending
// isNoteDeleting
export const selectIsNoteDeleting = state => state.notes.isNoteDeleting 

export default notesSlice.reducer