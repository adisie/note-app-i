import {useSelector} from 'react-redux'

// actions from slices
// chats
import {
  selectIsChatSelected,
} from '../chatsSlice'

// sub-box
import ChatHeader from './sub-box/ChatHeader'
import MessagesList from './sub-box/MessagesList'
import NewMessage from './sub-box/NewMessage'

// main
// ChatBox
const ChatBox = () => {
  // states from slices
  // chats
  const isChatSelected = useSelector(selectIsChatSelected)
  console.log(isChatSelected)
  return (
    <div className='flex-grow flex flex-col px-1'>
      <ChatHeader />
      <MessagesList />
      <NewMessage />
    </div>
  )
}

export default ChatBox