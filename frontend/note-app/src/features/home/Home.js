import { useEffect } from 'react'
import {Routes,Route} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

// global constants
import { SOCKET } from '../../config'

// actions from slices
// usersSlice
import {
  allUsers,
  userSignupEvent,
  checkAuth,
  setOnlineUsers,
  selectUser,
} from '../users/usersSlice'
// profilesSlice
import {
  allProfiles,
  addNewUserProfileEvent,
  newProfileEvent,
  setIsProfiles,
  deleteProfileEvent,
} from '../profiles/profilesSlice'
// commentsSlice
import {
  allComments,
} from '../comments/commentsSlice'
// favoritesSlice
import {
  allMyFavorites,
} from '../favorites/favoritesSlice'

// sub-home
// HomeLeftSideBar
import HomeLeftSideBar from "./sub-home/HomeLeftSideBar"

// features
// users
// Users
import Users from "../users/Users"
// notes
// Notes
import Notes from "../notes/Notes"
// profiles
// Profiles
import Profiles from '../profiles/Profiles'
// utils
// PrivateRoutes
import PrivateRoutes from '../../utils/PrivateRoutes'
// IsProfileOn
import IsProfileOn from '../../utils/IsProfileOn'

// sub-profile-pages
// PNotes
import PNotes from '../profiles/sub-profile-pages/PNotes'
// PFavorites
import PFavorites from '../profiles/sub-profile-pages/PFavorites'


// main
// Home
const Home = () => {

  // states from slice
  // usersSlice
  const user = useSelector(selectUser)

  // hooks
  const dispatch = useDispatch()

  // effects
  // all users
  useEffect(()=>{
    dispatch(allUsers())
  },[])
  // online users
  useEffect(()=>{
    SOCKET.on('onlineUsersEvent',onlineUsers => {
      dispatch(setOnlineUsers(onlineUsers))
    })
  },[])
  // reconnect user
  // all my favorites
  useEffect(()=>{
    if(user){
      dispatch(allMyFavorites())
      SOCKET.emit('userLogin',user._id)
    }
  },[])
  // all profiles
  useEffect(()=>{
    dispatch(allProfiles())
  },[])
  // all comments
  useEffect(()=>{
    dispatch(allComments())
  },[])
  //user signup event
  useEffect(()=>{
    SOCKET.on('userSignupEvent',user=>{
      console.log(user)
      dispatch(userSignupEvent(user))
      dispatch(addNewUserProfileEvent(user))
      dispatch(setIsProfiles(user._id))
    })
  },[])

  // profiles
  // new profile
  useEffect(()=>{
    SOCKET.on('newProfileEvent',profile => {
      dispatch(newProfileEvent(profile))
      dispatch(setIsProfiles(profile.userId))
    })
  },[])

  // delete profile
  useEffect(()=>{
    SOCKET.on('deleteProfileEvent',profile=>{
      dispatch(deleteProfileEvent(profile))
      dispatch(setIsProfiles(profile.userId))
    })
  },[])

  // check auth
  useEffect(()=>{
    dispatch(checkAuth())
  },[])

  return (
    <div className="flex-grow flex">
        <div className="flex-grow max-w-[820px] mx-auto px-3 flex">
            <HomeLeftSideBar />
            <Routes>
                <Route index element = {<Notes />} />
                <Route path = "users" element = {<Users />} />
                <Route element = {<IsProfileOn />}>
                  <Route path = "profiles" element = {<Profiles />}>
                    <Route index element = {<PNotes />} />
                    <Route path = "favorites" element = {<PFavorites />} />
                  </Route>
                </Route>
                <Route element = {<PrivateRoutes />} >
                </Route>
            </Routes>
        </div>
    </div>
  )
}

export default Home