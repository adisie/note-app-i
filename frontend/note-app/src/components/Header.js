import {NavLink} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

// actions from slices
// usersSlice
import {
  selectUser,
} from '../features/users/usersSlice'

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

// main
// Header
const Header = () => {
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)

  // hooks
  const dispatch = useDispatch()

  return (
    <header className="bg-emerald-700 text-xs text-gray-100 font-serif">
      <div className="max-w-[820px] mx-auto px-3 py-[.35rem] flex items-center justify-between">
        {/* menu and logo */}
        <div className="flex items-center">
          {/* menu icon */}
          <div className="flex items-center mr-1">
            <button className="text-xl text-gray-300">
              <GrMenu />
            </button>
          </div>
          {/* site logo */}
          <div className="flex items-center">
            <NavLink className="flex items-center text-xl text-gray-400 font-black" to={"/"} 
              onClick={()=>{
                dispatch(setIsComment(null))
              }}
            >
              <RiQuillPenFill className="text-2xl"/>
              <span>note<span className="text-gray-200">Share</span></span>
            </NavLink>
          </div>
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