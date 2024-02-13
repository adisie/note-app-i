import {useSelector} from 'react-redux'

// actions from slices
// chats
import {
  selectIsChatSelected
} from '../../chatsSlice'

// connections
import {
  selectAcceptedConnections,
} from '../../../connections/connectionsSlice'
// users
import {
  selectUser,
} from '../../../users/usersSlice'

// sub-profiles
import GetProfile from '../../../profiles/sub-profiles/GetProfile'
// sub-users
import GetUsername from '../../../users/sub-users/GetUsername'
import IsOnline from '../../../users/sub-users/IsOnline'

// main
// ChatHeader
const ChatHeader = () => {
  // states from slices
  const acceptedConnections = useSelector(selectAcceptedConnections)
  const isChatSelected = useSelector(selectIsChatSelected)
  const user = useSelector(selectUser)
  let connection = acceptedConnections.find(con => con._id === isChatSelected) 
  
  let userId = connection.senderId === user._id ? connection.receiverId : connection.senderId 


  return (
    <div className='bg-gray-300 flex items-center text-xs text-emerald-900 font-serif p-1'>
        {/* profile and username */}
        <div className='flex items-center'>
            <GetProfile userId={userId} />
            <span className='mx-1'>
              <GetUsername userId={userId} />
            </span>
        </div>
        <IsOnline userId={userId} />
        {/* actions */}
        <div>
            <span>typing</span>
        </div>
    </div>
  )
}

export default ChatHeader