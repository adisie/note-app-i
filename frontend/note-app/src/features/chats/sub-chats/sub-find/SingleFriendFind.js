import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// connections slice
import {
    selectIsConnectionId,
    selectIsConnectionPending,
    setIsConnectionId,
    newConnection,
} from '../../../connections/connectionsSlice'

// icons
// add-me
import { TiUserAdd } from "react-icons/ti"

// sub-profiles
// GetProfile
import GetProfile from '../../../profiles/sub-profiles/GetProfile'
// sub-users
// GetUsername
import GetUsername from '../../../users/sub-users/GetUsername'

// main
// SingleFriendFind
const SingleFriendFind = ({userId}) => {
    // states from slices
    // connections slice
    const isConnectionId = useSelector(selectIsConnectionId)
    const isConnectionPending = useSelector(selectIsConnectionPending)
    // hooks
    const dispatch = useDispatch()
  return (
    <div className='my-1 py-1 ml-5 border-b border-emerald-700 border-opacity-[.13] flex items-center justify-between text-xs text-emerald-700 font-serif'>
        {/* user profile and name */}
        <NavLink 
            className={"flex items-center"}
        >
            {/* profile */}
            <GetProfile userId={userId}/>
            {/* username */}
            <span className="ml-1">
                <GetUsername userId={userId}/>
            </span>
        </NavLink>
        {/* btns */}
        <div>
            {
                isConnectionPending && isConnectionId === userId
                ?
                <div className='flex items-center justify-center mr-7'>
                    <div className='w-[24px] h-[24px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin'></div>
                </div>
                :
                <button 
                    className="flex items-center px-3 py-[.13rem] rounded-sm bg-emerald-700 text-gray-300 transition-all ease-in-out duration-100 hover:bg-emerald-500 hover:text-gray-700" 
                    onClick={()=>{
                        dispatch(setIsConnectionId(userId))
                        dispatch(newConnection({receiverId: userId}))
                    }}
                >
                    <TiUserAdd className="text-lg"/>
                    <span>add me</span>
                </button>
            }
        </div>
    </div>
  )
}

export default SingleFriendFind