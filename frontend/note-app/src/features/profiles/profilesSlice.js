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

// add new profile
export const addNewProfile = createAsyncThunk('profiles/addNewProfile',async data => {
    try{
        const response = await axios.post('/api/profiles/new-profile',data)
        console.log(response.data)
    }catch(err){
        console.log(err)
    }
})
// profilesSlice
const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        addNewUserProfileEvent: (state,action) => {
            let profiles = [...state.profiles,{_id: action.payload._id,profiles: []}]
            let filteredProfiles = []
            profiles.forEach(profile=>{
                let isProfileExist = filteredProfiles.find(pro=>pro._id === profile._id)
                if(!isProfileExist){
                    filteredProfiles.push(profile)
                }
            })
            state.profiles = filteredProfiles
        }
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

// actions
export const {
    addNewUserProfileEvent,
} = profilesSlice.actions

// selectors
// profiles
export const selectProfiles = state => state.profiles.profiles

export default profilesSlice.reducer
