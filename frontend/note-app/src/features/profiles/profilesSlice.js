import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    profiles: [],
    isProfilePending: false,
    isProfiles: null,
    isProfileOwner: null,
    profileOwnerId: null,
    isProfileLocation: false,
    isProfileDeleting: false,
    profileCurrentIndex: null,
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
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete profile
export const deleteProfile = createAsyncThunk('profiles/deleteProfile',async _id => {
    try{
        const response = await axios.delete(`/api/profiles/delete-profile/${_id}`)
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
        },
        newProfileEvent: (state,action) => {
            let index = state.profiles.findIndex(pro => pro._id === action.payload.userId)
            let userProfiles = state.profiles.find(pro => pro._id === action.payload.userId)
            let profiles = [...userProfiles?.profiles,{_id: action.payload._id,profilePath: action.payload.profilePath}]
            let filteredProfiles = []
            profiles.forEach(profile => {
                let isProfileExist = filteredProfiles.find(pro => pro._id === profile._id) 
                if(!isProfileExist){
                    filteredProfiles.push(profile)
                }
            })

            state.profiles.at(index).profiles = filteredProfiles 
            state.profileCurrentIndex = filteredProfiles.length - 1
        },
        setIsProfiles: (state,action) => {
            let profiles = state.profiles.find(pro => pro._id === action.payload) 
            state.isProfiles = profiles.profiles
            state.profileCurrentIndex = profiles.profiles.length - 1
            state.profileOwnerId = action.payload
        },
        setIsProfileOwner: (state,action) => {
            state.isProfileOwner = action.payload 
        },
        setIsProfileLocation: (state,action) => {
            state.isProfileLocation = action.payload
        },
        deleteProfileEvent: (state,action) => {
            let index = state.profiles.findIndex(pro => pro._id === action.payload.userId)
            let userProfiles = state.profiles.find(pro => pro._id === action.payload.userId)
            let profiles = [...userProfiles?.profiles] 
            profiles = profiles.filter(pro => pro._id !== action.payload._id)
            state.profiles.at(index).profiles = profiles 
            if(profiles.length > 0){
                state.profileCurrentIndex = state.profileCurrentIndex - 1
            }else {
                state.profileCurrentIndex = null
            }
        },
        setProfileCurrentIndex: (state,action) => {
            state.profileCurrentIndex = action.payload
        },
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
            // new profile
            // pending
            .addCase(addNewProfile.pending,state => {
                state.isProfilePending = true
            })
            // fulfilled
            .addCase(addNewProfile.fulfilled,(state,action) => {
                state.isProfilePending = false 
                if(action.payload.profile){
                    SOCKET.emit('newProfile',action.payload.profile)
                }
            })
            // rejected
            .addCase(addNewProfile.rejected,state => {
                state.isProfilePending = false
            })
            // delete profile
            // pending
            .addCase(deleteProfile.pending,state=>{
                state.isProfileDeleting = true
            })
            // fulfilled
            .addCase(deleteProfile.fulfilled,(state,action) => {
                state.isProfileDeleting = false 
                if(action.payload.message === 'profile deleted'){
                    SOCKET.emit('deleteProfile',action.payload)
                }
            })
            // rejected
            .addCase(deleteProfile.rejected,state => {
                state.isProfileDeleting = false
            })
    }
})

// actions
export const {
    addNewUserProfileEvent,
    newProfileEvent,
    setIsProfiles,
    setIsProfileOwner,
    setIsProfileLocation,
    deleteProfileEvent,
    setProfileCurrentIndex,
} = profilesSlice.actions

// selectors
// profiles
export const selectProfiles = state => state.profiles.profiles
// isprofilePending
export const selectIsProfilePending = state => state.profiles.isProfilePending 
// isProfiles
export const selectIsProfiles = state => state.profiles.isProfiles 
// isProfileOwner
export const selectIsProfileOwner = state => state.profiles.isProfileOwner 
// profileOwnerId
export const selectProfileOwnerId = state => state.profiles.profileOwnerId
// isProfileLocation
export const selectIsProfileLocation = state => state.profiles.isProfileLocation 
// isProfileDeleting
export const selectIsProfileDeleting = state => state.profiles.isProfileDeleting 
// profileCurrentIndex
export const selectProfileCurrentIndex = state => state.profiles.profileCurrentIndex

export default profilesSlice.reducer
