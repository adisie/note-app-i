import { useSelector } from "react-redux"

// actions from slices
// connections slice
import {
  selectConnections,
} from '../../connections/connectionsSlice'

// sub-friend
// SingleFriend
import SingleFriend from "./sub-friend/SingleFriend"
// main
// FriendsList
const FriendsList = () => {
  // states from slices
  // connections slice
  const connections = useSelector(selectConnections)

  return (
    <div className="flex-grow h-[92vh] p-2 overflow-y-auto">
      {
        connections.map(connection =>(
          <SingleFriend key={connection._id} userId={connection.receiverId}/>
        ))
      }
    </div>
  )
}

export default FriendsList