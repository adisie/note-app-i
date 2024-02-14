import {useDispatch, useSelector} from 'react-redux'

// actions from slices
// chats
import {
    setIsChatSelected,
    setChatDir,
} from '../../chatsSlice'
// connections
import {
    deleteConnection,
    setIsConnectionId,
    selectIsConnectionDeleting,
    selectIsConnectionId
} from '../../../connections/connectionsSlice'

// sub-profiles
// GetProfile
import GetProfile from "../../../profiles/sub-profiles/GetProfile"
// sub-users
// GetUsername
import GetUsername from "../../../users/sub-users/GetUsername"
// IsOnline
import IsOnline from '../../../users/sub-users/IsOnline'

// icons
// disconnect
import { AiOutlineDisconnect } from "react-icons/ai"

// main
// SingleFriend
const SingleFriend = ({userId,connectionId}) => {
    // states from slices
    // connection
    const isConnectionId = useSelector(selectIsConnectionId)
    const isConnectionDeleting = useSelector(selectIsConnectionDeleting)
    // hooks
    const dispatch = useDispatch() 
  return (
    <div className="my-1 py-1 ml-5 border-b border-emerald-700 border-opacity-[.13] flex items-center justify-between text-xs text-emerald-700 font-serif">
        {/* profile and name */}
        <div className="flex items-center cursor-pointer" 
            onClick={()=>{
                dispatch(setChatDir('CBX'))
                dispatch(setIsChatSelected(connectionId))
            }}
        >
            <GetProfile userId={userId} />
            <span className="mx-1">
                <GetUsername userId={userId} />
            </span>
            <IsOnline userId={userId}/>
        </div>
        {/* btns */}
        <div>
            {
                isConnectionId === connectionId && isConnectionDeleting 
                ?
                <div className='w-[24px] h-[24px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin mr-9'></div>
                :
                <button 
                    className="flex items-center px-1 py-[.13rem] rounded-sm bg-emerald-700 text-gray-300 transition-all ease-in-out duration-100 hover:bg-emerald-500 hover:text-gray-700" 
                    onClick={()=>{
                        dispatch(setIsConnectionId(connectionId))
                        dispatch(deleteConnection(connectionId))
                    }}
                >
                    <AiOutlineDisconnect className="text-lg"/>
                    <span>disconnect</span>
                </button>
            }
        </div>
    </div>
  )
}

export default SingleFriend