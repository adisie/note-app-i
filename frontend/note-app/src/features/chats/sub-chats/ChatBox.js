
// sub-box
import ChatHeader from './sub-box/ChatHeader'
import MessagesList from './sub-box/MessagesList'
import NewMessage from './sub-box/NewMessage'

// main
// ChatBox
const ChatBox = () => {
  return (
    <div className='flex-grow flex flex-col px-1'>
      <ChatHeader />
      <MessagesList />
      <NewMessage />
    </div>
  )
}

export default ChatBox