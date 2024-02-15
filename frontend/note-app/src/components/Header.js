import {NavLink} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

// actions from slices
// usersSlice
import {
  selectUser,
} from '../features/users/usersSlice'
// homeSlice
import {
  selectMainDir,
  setMainDir,
} from '../features/home/homeSlice'

// commentsSlice
import {
  setIsComment,
} from '../features/comments/commentsSlice'

// icons
// menu
import { GrMenu } from "react-icons/gr"
// pen
import { RiQuillPenFill } from "react-icons/ri"

// sub-components
// InHeader
import InHeader from './sub-components/InHeader'
// OutHeader
import OutHeader from './sub-components/OutHeader'

// sub-headers for diffrent parts
// note-header
import NotesSearchBar from '../features/notes/sub-notes/NotesSearchBar'
// chats-header
import ChatsHeader from '../features/chats/sub-chats/ChatsHeader'

// main
// Header
const Header = () => {
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)
  // homeSlice
  const mainDir = useSelector(selectMainDir)


  // hooks
  const dispatch = useDispatch()

  // home side bar toggler
  const homeSideBarToggler = () => {
    let homeSideBar = document.getElementById('home-left-side-bar-id') 
    let screenShadow = document.getElementById('screen-shadow')

    if(homeSideBar?.classList.contains('left-[-100vw]')){
      homeSideBar?.classList.remove('left-[-100vw]')
      homeSideBar?.classList.add('left-0')
      screenShadow?.classList.remove('hidden')
    }else {
      homeSideBar?.classList.add('left-[-100vw]')
      homeSideBar?.classList.remove('left-0')
      screenShadow?.classList.add('hidden')
    }
  }

  return (
    <header className="bg-emerald-700 text-xs text-gray-100 font-serif">
      <div className="max-w-[820px] mx-auto px-3 py-[.35rem] flex items-center justify-between">
        {/* menu and logo */}
        <div className="flex items-center">
          {/* menu icon */}
          <div className="flex items-center mr-1 screen-level-3:hidden">
            <button className="text-xl text-gray-300" 
              onClick={()=>{
                // dispatch(setIsComment(null))
                // dispatch(setMainDir('NOTES'))
                homeSideBarToggler()
              }}
            >
              <GrMenu />
            </button>
          </div>
          {/* site logo */}
          <div className="items-center hidden screen-level-3:flex">
            <NavLink className="flex items-center text-xl text-gray-400 font-black" to={"/"} 
              onClick={()=>{
                dispatch(setIsComment(null))
                dispatch(setMainDir('NOTES'))
              }}
            >
              <RiQuillPenFill className="text-2xl"/>
              <span>note<span className="text-gray-200">Share</span></span>
            </NavLink>
          </div>
        </div>
        {/* header bars */}
        <div className="flex-grow flex items-center justify-center">
          {
            mainDir === 'NOTES'
            ?
            <NotesSearchBar />
            :
            mainDir === 'CHATS'
            ?
            <ChatsHeader />
            :
            <></>
          }
        </div>
        {/* log-container */}
        <div>
          {
            user 
            ?
            <InHeader user={user}/>
            :
            <OutHeader />
          }
        </div>
      </div>
    </header>
  )
}

export default Header