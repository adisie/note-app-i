import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    myFavorites: [],
    isFavoritePending: false,
    noteId: null,
}

// all my favorites
export const allMyFavorites = createAsyncThunk('favorites/allMyFavorites', async () => {
    try{
        const response = await axios.get('/api/favorites/my-favorites')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// add new favorite
export const addNewFavorite = createAsyncThunk('favorites/addNewFavorite',async noteId => {
    try{
        const response = await axios.post('/api/favorites/add-favorite',{noteId})
        return response.data
    }catch(err){
        return err.response.data
    }
})

// removet favorite
export const removeFavorite = createAsyncThunk('favorites/removeFavorite',async _id => {
    try{
        const response = await axios.delete(`/api/favorites/delete-favorite/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// favoritesSlice
const favoritessSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setNoteId: (state,action) => {
            state.noteId = action.payload 
        },
        newFavoriteEvent: (state,action) => {
            let favorites = [action.payload,...state.myFavorites]
            let filteredFavorites = [] 
            favorites.forEach(favorite => {
                let isFavoriteExist = filteredFavorites.find(fav => fav._id === favorite._id)
                if(!isFavoriteExist){
                    filteredFavorites.push(favorite)
                }
            })
            state.myFavorites = filteredFavorites
        },
        removeFavoriteEvent: (state,action) => {
            state.myFavorites = state.myFavorites.filter(favorite => favorite._id !== action.payload._id)
        },
        resetMyFavorites: state => {
            state.myFavorites = []
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // my favorites
            // fulfilled
            .addCase(allMyFavorites.fulfilled,(state,action)=>{
                if(action.payload.favorites){
                    state.myFavorites = action.payload.favorites 
                }else {
                    state.myFavorites = []
                }
            })
            // new favorite
            // pending
            .addCase(addNewFavorite.pending,state => {
                state.isFavoritePending = true
            })
            // fulfilled
            .addCase(addNewFavorite.fulfilled,(state,action) => {
                state.isFavoritePending = false 
                state.noteId = null 
                if(action.payload.favorite){
                    SOCKET.emit('newFavorite',action.payload.favorite)
                }
            })
            // rejected
            .addCase(addNewFavorite.rejected,state => {
                state.noteId = null
                state.isFavoritePending = favoritessSlice 
            })
            // remove favorite
            // pending
            .addCase(removeFavorite.pending,state => {
                state.isFavoritePending = true
            })
            // fulfilled
            .addCase(removeFavorite.fulfilled,(state,action) => {
                state.noteId = null 
                state.isFavoritePending = false 
                if(action.payload.message === "favorite removed"){
                    SOCKET.emit('removeFavorite',action.payload)
                }
            })
            // rejected
            .addCase(removeFavorite.rejected,state => {
                state.noteId = null 
                state.isFavoritePending = false
            })
    },
})

// actions
export const {
    setNoteId,
    newFavoriteEvent,
    removeFavoriteEvent,
    resetMyFavorites,
} = favoritessSlice.actions

// selectors
// my favorites
export const selectMyFavorites = state => state.favorites.myFavorites 
// isFavoritePending
export const selectIsFavoritePending = state => state.favorites.isFavoritePending 
// noteId
export const selectNoteId = state => state.favorites.noteId 

// exports
export default favoritessSlice.reducer
