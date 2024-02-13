import {formatDistanceToNow} from 'date-fns'

// sub-profiles
import GetProfile from "../../../profiles/sub-profiles/GetProfile"
// sub-users
import GetUsername from "../../../users/sub-users/GetUsername"

// icons
// delete
import { MdDelete } from "react-icons/md"
// main
// SingleNotification
const SingleNotification = ({notification}) => {
  return (
    <div className="my-1 py-1 ml-5 border-b border-emerald-700 border-opacity-[.13] flex items-center justify-between text-xs text-emerald-700 font-serif">
        {/* profile and name */}
        <div className="flex items-center cursor-pointer">
            <GetProfile userId={notification.senderId} />
            <span className="mx-1">
                <GetUsername userId={notification.senderId} />
            </span>
        </div>
        <div className="flex-grow flex items-center justify-start">
            {
                notification.flag === 'REQ'
                ?
                <span className="italic text-emerald-950">connection request</span>
                :
                notification.flag === 'ACC'
                ?
                <span className="italic text-emerald-950">accepted your request</span>
                :
                <></>
            }
            <span className="ml-1">
                {formatDistanceToNow(new Date(notification.createdAt),{addSuffix: true})}
            </span>
        </div>
        {/* btns */}
        <div>
            <button 
                className="text-lg text-emerald-700 opacity-[.35] hover:opacity-[1]"
            >
                <MdDelete className="text-lg"/>
            </button>
        </div>
    </div>
  )
}

export default SingleNotification