import { NavLink } from "react-router-dom"
import {useDispatch} from 'react-redux'

// actions from slices
// usersSlice
import {
  setUsersFlag,
} from '../../users/usersSlice'

// icons
// pen
import { RiQuillPenFill } from "react-icons/ri"
// favorite
import { MdOutlineFavorite } from "react-icons/md"
// chat
import { IoLogoWechat } from "react-icons/io5"
// settings
import { IoMdSettings } from "react-icons/io"


// main
// HomeLeftSideBar
const HomeLeftSideBar = () => {
  // hooks
  const dispatch = useDispatch()

  return (
    <div className="w-[20%] text-xs text-emerald-700 font-serif">
      {/* authenticated side bar */}
      <div className="pr-1">
        <ul className="flex flex-col">
          <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
            <NavLink 
              className={"flex-grow flex items-center"} 
              to={"/"}
            >
              <RiQuillPenFill className="text-xl mr-1 opacity-[.75]"/>
              <span>Notes</span>
            </NavLink>
          </li>

          {
            !true
            ?
            <>
              <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
                <NavLink 
                  className={"flex-grow flex items-center"}
                >
                  <MdOutlineFavorite className="text-xl mr-1 opacity-[.75]"/>
                  <span>Favorites</span>
                </NavLink>
              </li>

              <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
                <NavLink 
                  className={"flex-grow flex items-center"}
                >
                  <IoLogoWechat className="text-xl mr-1 opacity-[.75]"/>
                  <span>Chats</span>
                </NavLink>
              </li>
              
              <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
                <NavLink 
                  className={"flex-grow flex items-center"}
                >
                  <IoMdSettings className="text-xl mr-1 opacity-[.75]"/>
                  <span>Settings</span>
                </NavLink>
              </li>
              <div className="mt-3 flex items-center justify-center bg-emerald-700 rounded-sm text-gray-300 py-1 cursor-pointer transition-all ease-in-out duration-300 hover:opacity-[.75]">
                <span>Logout</span>
              </div>
            </>
            :
            <NavLink 
              className="mt-3 flex items-center justify-center bg-emerald-700 rounded-sm text-gray-300 py-1 cursor-pointer transition-all ease-in-out duration-300 hover:opacity-[.75]" 
              to={"/users"} 
              onClick={()=>{
                dispatch(setUsersFlag('LOGIN'))
              }}
            
            >
              <span>Login</span>
            </NavLink>
          }
          

        </ul>
      </div>
    </div>
  )
}

export default HomeLeftSideBar