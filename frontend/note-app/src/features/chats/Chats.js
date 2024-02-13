import {useSelector} from 'react-redux'

// actions from slices
// chatsSlice
import {
    selectChatDir,
} from './chatsSlice'

// sub-chats
import FriendsList from "./sub-chats/FriendsList"
import ChatBox from "./sub-chats/ChatBox"
import FindList from "./sub-chats/FindList"
import RequestsList from "./sub-chats/RequestsList"
import Notifications from './sub-chats/Notifications'
// main
// Chats
const Chats = () => {
    // states from slices
    // chatsSlice
    const chatDir = useSelector(selectChatDir) 

  return (
    <div className="flex-grow m-1 flex">
        {
            chatDir === 'FRL'
            ?
            <FriendsList />
            :
            chatDir === 'CTB'
            ?
            <ChatBox />
            :
            chatDir === 'FIL'
            ?
            <FindList />
            :
            chatDir === 'RQL'
            ?
            <RequestsList />
            :
            chatDir === 'NOT'
            ?
            <Notifications />
            :
            <></>
        }
    </div>
  )
}

export default Chats