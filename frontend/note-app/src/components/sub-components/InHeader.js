import {NavLink} from 'react-router-dom'

// default user profile image
import profileImage from '../../assets/images/profiles/male-profile-3.jpg'
// main
// InHeader
const InHeader = () => {
  return (
    <div className="flex items-center">
        <NavLink 
          className="flex items-center" 
          to={"/profiles"}
          >
            <span className="text-gray-300 mr-1">username</span>
            <img className="w-[28px] h-[28px] rounded-full" src={profileImage} alt="" />
        </NavLink>
        <button className="border border-gray-300 rounded-sm px-3 py-[.175rem] ml-3 transition-all ease-in-out duration-300 hover:text-emerald-700 hover:bg-gray-300">logout</button>
    </div>
  )
}

export default InHeader