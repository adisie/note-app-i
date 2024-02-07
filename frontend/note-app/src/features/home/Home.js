import {Routes,Route} from 'react-router-dom'

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
  return (
    <div className="flex-grow flex">
        <div className="flex-grow max-w-[820px] mx-auto px-3 flex">
            <HomeLeftSideBar />
            <Routes>
                <Route index element = {<Notes />} />
                <Route path = "users" element = {<Users />} />
                <Route element = {<PrivateRoutes />} >
                  <Route path = "profiles" element = {<Profiles />} />
                </Route>
            </Routes>
        </div>
    </div>
  )
}

export default Home