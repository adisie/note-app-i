import {useSelector} from 'react-redux'

// actions from slices
// connections
import {
  selectAcceptedConnections,
} from '../../connections/connectionsSlice'

// users
import {
  selectUser,
} from '../../users/usersSlice'

// sub-friend
// SingleFriend
import SingleFriend from "./sub-friend/SingleFriend"
// main
// FriendsList
const FriendsList = () => {
  // states from slices
  // connections
  const acceptedConnections = useSelector(selectAcceptedConnections) 
  // users
  const user = useSelector(selectUser) 
  let finalUsersIds = [] 
  acceptedConnections.forEach(usr => {
    let userId = usr.senderId === user._id ? usr.receiverId : usr.senderId 
    finalUsersIds.push({userId,_id: usr._id})
  })
  return (
    <div className="flex-grow h-[92vh] p-2 overflow-y-auto">
      {
        finalUsersIds.map(connection =>(
          <SingleFriend key={connection._id} userId={connection.userId} connectionId={connection._id}/>
        ))
      }
    </div>
  )
}

export default FriendsList