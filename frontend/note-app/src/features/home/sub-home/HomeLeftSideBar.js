import { NavLink } from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// usersSlice
import {
  setUsersFlag,
  selectUser,
  logout,
} from '../../users/usersSlice'
// homeSlice
import {
  setMainDir,
} from '../homeSlice'
// profilesSlice
import {
  setIsProfileLocation,
} from '../../profiles/profilesSlice'
// favoritesSlice
import {
  selectMyFavorites,
} from '../../favorites/favoritesSlice'
// commentsSlice
import {
  setIsComment,
} from '../../comments/commentsSlice'
// chats
import {
  setChatDir,
} from '../../chats/chatsSlice'
// connections
import {
  resetNotifications,
} from '../../connections/connectionsSlice'
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
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)
  // favoritesSlice
  const myFavorites = useSelector(selectMyFavorites) 
  // hooks
  const dispatch = useDispatch()

  // active link style
  const activeLinkStyle = ({isActive}) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
    }
  }

  return (
    <div className="min-w-[20%] text-xs text-emerald-700 font-serif">
      {/* authenticated side bar */}
      <div className="pr-1">
        <ul className="flex flex-col">
          <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
            <NavLink 
              className={"flex-grow flex items-center"} 
              to={"/"} 
              style={activeLinkStyle} 
              onClick={()=>{
                dispatch(setIsProfileLocation(false))
                dispatch(setIsComment(null))
                dispatch(setMainDir('NOTES'))
                dispatch(setChatDir('FRL'))
              }}
            >
              <RiQuillPenFill className="text-xl mr-1 opacity-[.75]"/>
              <span>Notes</span>
            </NavLink>
          </li>

          {
            user
            ?
            <>
              <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
                <NavLink 
                  to={"/favorites"}
                  className={"flex-grow flex items-center"} 
                  style={activeLinkStyle} 
                  onClick={()=>{
                    dispatch(setIsProfileLocation(false))
                    dispatch(setIsComment(null))
                    dispatch(setChatDir('FRL'))
                  }}
                >
                  <MdOutlineFavorite className="text-xl mr-1 opacity-[.75]"/>
                  <span>Favorites</span>
                </NavLink>
                {
                  myFavorites?.length > 0 
                  ?
                <div className="w-[18px] h-[18px] rounded-full bg-emerald-700 text-xs text-gray-300 flex items-center justify-center">
                  <span>{myFavorites?.length > 21 ? `${myFavorites.length}+` : myFavorites.length}</span>
                </div>
                  :
                  <></>
                }
              </li>

              <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
                <NavLink 
                  to={"/chats"}
                  className={"flex-grow flex items-center"} 
                  style={activeLinkStyle} 
                  onClick={()=>{
                    dispatch(setIsProfileLocation(false))
                    dispatch(setIsComment(null))
                    dispatch(setMainDir('CHATS'))
                    dispatch(setChatDir('FRL'))
                  }}
                >
                  <IoLogoWechat className="text-xl mr-1 opacity-[.75]"/>
                  <span>Chats</span>
                </NavLink>
              </li>
              
              <li className="flex-grow flex items-center my-[.3rem] pb-1 border-emerald-700 border-b border-opacity-[.13] transition-all ease-in-out duration-300 hover:pl-1">
                <NavLink 
                  className={"flex-grow flex items-center"} 
                  // style={activeLinkStyle} 
                  onClick={()=>{
                    dispatch(setIsProfileLocation(false))
                    dispatch(setIsComment(null))
                    dispatch(setChatDir('FRL'))
                  }}
                >
                  <IoMdSettings className="text-xl mr-1 opacity-[.75]"/>
                  <span>Settings</span>
                </NavLink>
              </li>
              <div className="mt-3 flex items-center justify-center bg-emerald-700 rounded-sm text-gray-300 py-1 cursor-pointer transition-all ease-in-out duration-300 hover:opacity-[.75]" 
                onClick={()=>{
                  dispatch(logout())
                  dispatch(setIsProfileLocation(false))
                  dispatch(setIsComment(null))
                  dispatch(setMainDir('NOTES'))
                  dispatch(setChatDir('FRL'))
                  dispatch(resetNotifications())
                }}
              >
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