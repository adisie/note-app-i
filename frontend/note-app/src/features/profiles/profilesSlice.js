import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// initialState
const initialState = {
    profiles: [],
}

// all profiles
export const allProfiles = createAsyncThunk('profiles/allProfiles',async () => {
    try{
        const response = await axios.get('/api/profiles/all-profiles')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// profilesSlice
const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {

    },
    extraReducers: builder =>{
        builder
            // cases
            // all profiles
            // fulfilled
            .addCase(allProfiles.fulfilled,(state,action) => {
                if(action.payload.profiles){
                    state.profiles = action.payload.profiles
                }
            })
            // rejected
            .addCase(allProfiles.rejected,state=>{
                console.log('all profiles rejected case')
            })
    }
})

// selectors
// profiles
export const selectProfiles = state => state.profiles.profiles

export default profilesSlice.reducer
