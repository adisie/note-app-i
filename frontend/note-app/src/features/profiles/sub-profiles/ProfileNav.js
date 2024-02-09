import {NavLink} from 'react-router-dom'

// test image
import testProfile from '../../../assets/images/profiles/male-profile-3.jpg'

// icons
// pen
import { RiQuillPenFill } from "react-icons/ri"
// favorite
import { MdOutlineFavorite } from "react-icons/md"

// main
// ProfileNav
const ProfileNav = () => {

  return (
    <div className="px-1 flex items-center justify-between text-xs font-serif">
        {/* user proeile and name */}
        <div className="items-center hidden mr-3" id="profile-header-user-name-profile">
            <img src={testProfile} alt="" className="w-[24px] h-[24px] rounded-full mr-1"/>
            <span>username</span>
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