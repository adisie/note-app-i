import {useSelector} from 'react-redux'

// actions from slices
// users
import {
  selectUser,
  selectUsers,
} from '../../users/usersSlice'
// chats
import {
  selectPendingConnections,
  selectRequestedConnections,
  selectAcceptedConnections,
} from '../../connections/connectionsSlice'

// sub-find
// SingleFriendFind
import SingleFriendFind from "./sub-find/SingleFriendFind"
// main
// FindList
const FindList = () => {
  // states from slices
  // users
  const user = useSelector(selectUser) 
  const users = useSelector(selectUsers)

  // connections
  const pendingConnections = useSelector(selectPendingConnections)
  const requestedConnections = useSelector(selectRequestedConnections)
  const acceptedConnections = useSelector(selectAcceptedConnections)

  let findUsers = users.filter(usr => usr._id !== user?._id) 

  let finalUsers = [] 
  findUsers.forEach(findU => {
    let isPending = pendingConnections.find(penU => penU.receiverId === findU._id) || requestedConnections.find(penU => penU.senderId === findU._id) || acceptedConnections.find(penU => penU.senderId === findU._id || penU.receiverId === findU._id)
    if(!isPending){
      finalUsers.push(findU)
    }
  })
  return (
    <div className="flex-grow h-[92vh] p-2 overflow-y-auto" id="find-friend-list-con">
      {
        finalUsers.map(user=>(
          <SingleFriendFind key={user._id} userId={user._id} />
        ))
      }
    </div>
  )
}

export default FindList