import {useSelector} from 'react-redux'

// actions from slices
// usersSlice
import {
  selectUsers,
  selectUser,
} from '../../users/usersSlice'

// connectionsSlice
import {
  selectConnections,
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
  const connections = useSelector(selectConnections) 

  let findUsers = []

  users.forEach(usr => {
    let isUserExist = connections.find(fur => fur.receiverId === usr._id) 
    if(!isUserExist && usr._id !== user?._id){
      findUsers.push(usr)
    }
  })

  return (
    <div className="flex-grow h-[92vh] p-2 overflow-y-auto" id="find-friend-list-con">
      {
        findUsers.map(user=>(
          <SingleFriendFind key={user._id} userId={user._id} />
        ))
      }
    </div>
  )
}

export default FindList