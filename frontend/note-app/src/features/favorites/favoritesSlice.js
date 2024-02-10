import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// initialState
const initialState = {
    myFavorites: [],
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
        console.log(response.data)
    }catch(err){
        console.log(err)
    }
})

// removet favorite
export const removeFavorite = createAsyncThunk('favorites/removeFavorite',async _id => {
    try{
        const response = await axios.delete(`/api/favorites/delete-favorite/${_id}`)
        console.log(response.data)
    }catch(err){
        console.log(err)
    }
})

// favoritesSlice
const favoritessSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            // cases
            // my favorites
            // fulfilled
            .addCase(allMyFavorites.fulfilled,(state,action)=>{
                if(action.payload.favorites){
                    state.myFavorites = action.payload.favorites 
                }
            })
    },
})

// selectors
// my favorites
export const selectMyFavorites = state => state.favorites.myFavorites 

// exports
export default favoritessSlice.reducer
