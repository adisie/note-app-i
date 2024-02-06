import {Routes,Route} from 'react-router-dom'

// sub-home
// HomeLeftSideBar
import HomeLeftSideBar from "./sub-home/HomeLeftSideBar"

// features
// users
// Users
import Users from "../users/Users"
// posts
// Posts
import Posts from "../posts/Posts"
// profiles
// Profiles
import Profiles from '../profiles/Profiles'

// main
// Home
const Home = () => {
  return (
    <div className="flex-grow flex">
        <div className="flex-grow max-w-[820px] mx-auto px-3 flex">
            <HomeLeftSideBar />
            <Routes>
                <Route index element = {<Posts />} />
                <Route path = "users" element = {<Users />} />
                <Route path = "profiles" element = {<Profiles />} />
            </Routes>
        </div>
    </div>
  )
}

export default Home