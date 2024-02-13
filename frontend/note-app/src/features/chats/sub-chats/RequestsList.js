import {useSelector} from 'react-redux'

// actions from slices
// connections
import {
  selectRequestedConnections,
} from '../../connections/connectionsSlice'
// sub-req
// SingleFriendRequest
import SingleFriendRequest from "./sub-req/SingleFriendRequest"
// main
// RequestsList
const RequestsList = () => {
  // states from slices
  // connections
  const requestedConnections = useSelector(selectRequestedConnections) 

  return (
    <div className="flex-grow h-[92vh] p-2 overflow-y-auto">
      {
        requestedConnections.map(connection=>(
          <SingleFriendRequest key={connection._id} userId={connection.senderId} connectionId={connection._id}/>
        ))
      }
    </div>
  )
}

export default RequestsList