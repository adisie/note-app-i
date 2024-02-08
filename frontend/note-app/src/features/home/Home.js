import { useEffect } from 'react'
import {Routes,Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// global constants
import { SOCKET } from '../../config'

// actions from slices
// usersSlice
import {
  allUsers,
  userSignupEvent,
} from '../users/usersSlice'
// profilesSlice
import {
  allProfiles,
} from '../profiles/profilesSlice'
// commentsSlice
import {
  allComments,
} from '../comments/commentsSlice'

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


// main
// Home
const Home = () => {

  // hooks
  const dispatch = useDispatch()

  // effects
  // all users
  useEffect(()=>{
    dispatch(allUsers())
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
      dispatch(userSignupEvent(user))
    })
  },[])

  return (
    <div className="flex-grow flex">
        <div className="flex-grow max-w-[820px] mx-auto px-3 flex">
            <HomeLeftSideBar />
            <Routes>
                <Route index element = {<Notes />} />
                <Route path = "users" element = {<Users />} />
                <Route path = "profiles" element = {<Profiles />} />
                <Route element = {<PrivateRoutes />} >
                </Route>
            </Routes>
        </div>
    </div>
  )
}

export default Home