import {useSelector,useDispatch} from 'react-redux'

// actions from slice
// connections
import {
    acceptConnection,
    selectIsConnectionAccepting,
    selectIsConnectionId,
    setIsConnectionId,
} from '../../../connections/connectionsSlice'

// sub-profiles
// GetProfile
import GetProfile from "../../../profiles/sub-profiles/GetProfile"
// sub-users
// GetUsername
import GetUsername from "../../../users/sub-users/GetUsername"

// icons
// connect
import { GrConnect } from "react-icons/gr"
// main
// SingleFriendRequest
const SingleFriendRequest = ({userId,connectionId}) => {

    // states from slice
    // connections
    const isConnectionAccepting = useSelector(selectIsConnectionAccepting)
    const isConnectionId = useSelector(selectIsConnectionId)

    // hooks
    const dispatch = useDispatch()

  return (
    <div className="my-1 py-1 ml-5 border-b border-emerald-700 border-opacity-[.13] flex items-center justify-between text-xs text-emerald-700 font-serif">
        {/* profile and name */}
        <div className="flex items-center cursor-pointer">
            <GetProfile userId={userId} />
            <span className="mx-1">
                <GetUsername userId={userId} />
            </span>
        </div>
        {/* btns */}
        <div>
            {
                isConnectionAccepting && isConnectionId === connectionId
                ?
                <div className='flex items-center justify-center mr-7'>
                    <div className='w-[24px] h-[24px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin'></div>
                </div>
                :
                <button 
                    className="flex items-center px-1 py-[.13rem] rounded-sm bg-emerald-700 text-gray-300 transition-all ease-in-out duration-100 hover:bg-emerald-500 hover:text-gray-700"
                    onClick={()=>{
                        dispatch(setIsConnectionId(connectionId))
                        dispatch(acceptConnection(connectionId))
                    }}
                >
                    <GrConnect className="text-lg mx-[.13rem]"/>
                    <span>connect</span>
                </button>
            }
        </div>
    </div>
  )
}

export default SingleFriendRequest