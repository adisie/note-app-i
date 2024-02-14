import {useRef,useEffect} from 'react'
import {useSelector} from 'react-redux'

// actions from slices
// chats
import {
  selectIsChatSelected,
  selectMessages,
} from '../../chatsSlice'
// users
import {
  selectUser,
} from '../../../users/usersSlice'

// sub box
import SingleMessage from "./SingleMessage"
// main
// MessagesList
const MessagesList = () => {
  // states 
  const scroll = useRef()

  // states from slices
  // chats
  const isChatSelected = useSelector(selectIsChatSelected)
  const messages = useSelector(selectMessages) 
  let filteredMessages = messages.filter(message => message.connectionId === isChatSelected) 
  const user = useSelector(selectUser)
  
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: 'smooth'})
  })

  return (
    <div className="flex-grow h-[84vh] overflow-y-auto pt-3" id="message-list-container">
      {
        filteredMessages.map(message=>(
          <SingleMessage key={message._id} isOwn={message.senderId === user?._id} message={message}/>
        ))
      }
        <div ref={scroll}/>
    </div>
  )
}

export default MessagesList