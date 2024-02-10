import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

// actions from slices
// profilesSlice
import {
    selectProfileOwnerId,
} from '../profilesSlice'

// icons
// pen
import { RiQuillPenFill } from "react-icons/ri"
// favorite
import { MdOutlineFavorite } from "react-icons/md"

// sub-users
// GetUsername
import GetUsername from "../../users/sub-users/GetUsername"
// sub-profiles
// GetProfile
import GetProfile from "../sub-profiles/GetProfile"


// main
// ProfileNav
const ProfileNav = () => {
    // states from slices
    // profilesSlice
    const profileOwnerId = useSelector(selectProfileOwnerId)

  return (
    <div className="px-1 flex items-center justify-between text-xs font-serif">
        {/* user proeile and name */}
        <div className="items-center hidden mr-3" id="profile-header-user-name-profile">
            <GetProfile userId={profileOwnerId}/>
            <span className="ml-1">
                <GetUsername userId={profileOwnerId}/>
            </span>
        </div>
        {/* nav link */}
        <div className="flex-grow flex items-center">
            <NavLink 
                to={'/profiles'}
                className="flex items-center"
            >
                <RiQuillPenFill className="text-lg"/>
                <span>Notes</span>
            </NavLink>
            <NavLink 
                to={"/profiles/favorites"}
                className="flex items-center ml-3"
            >
                <MdOutlineFavorite className='text-lg'/>
                <span>Favorites</span>
            </NavLink>
        </div>
    </div>
  )
}

export default ProfileNav