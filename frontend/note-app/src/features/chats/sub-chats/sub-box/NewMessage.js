import { useState } from "react"
import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// chats
import {
  selectIsChatSelected,
  newMessage,
  selectIsMessagePending,
} from '../../chatsSlice'
// users
import {
  selectUser,
} from '../../../users/usersSlice'
// connections
import {
  selectAcceptedConnections,
} from '../../../connections/connectionsSlice'

// icons
import { GrSend } from "react-icons/gr"

// main
// NewMessage
const NewMessage = () => {
  // states from slices
  // chats
  const isChatSelected = useSelector(selectIsChatSelected)
  const isMessagePending = useSelector(selectIsMessagePending)
  // users
  const user = useSelector(selectUser)
  // connections
  const acceptedConnections = useSelector(selectAcceptedConnections) 

  let connection = acceptedConnections.find(con => con._id === isChatSelected) 
  
  let receiverId = connection.senderId === user._id ? connection.receiverId : connection.senderId 

  // console.log({connectionId: isChatSelected,senderId: user._id,receriverId})
  // states
  const [message,setMessage] = useState('')

  // hooks
  const dispatch = useDispatch()

  // addjust text area height
  const addjustTextareaHeight = e => {
    let textarea = document.getElementById('message') 
    textarea.style.height = '18px' 
    let scHeight = e.target.scrollHeight 
    textarea.style.height = `${scHeight}px`
  }

  // submit handler
  const submitHandler = () => {
    let textarea = document.getElementById('message') 
    if(message.trim()){
      dispatch(newMessage({connectionId: isChatSelected,senderId: user?._id,receiverId,message}))
    }
    setMessage('')
    textarea.style.height = '18px'
    textarea.focus()
  }

  // isMessagePending
  if(isMessagePending){
    return <div className="flex items-center justify-center relative">
      <div className="absolute bottom-0 flex items-start bg-gray-200 px-1 py-[.195rem] w-[24px] h-[24px] border-emerald-700 border-4 rounded-full border-r-transparent animate-spin"></div>
    </div>
  }


  return (
    <div className="flex items-center justify-center relative">
      <div className="absolute bottom-0 flex items-start bg-gray-200 rounded-sm px-1 py-[.195rem] font-serif text-xs">
        <textarea name="message" id="message" 
          className="focus:outline-none w-[250px] h-[18px] bg-transparent resize-none mt-[.1rem] max-h-[450px]" 
          placeholder="message..." 
          onKeyUp={addjustTextareaHeight}  
          value={message} 
          onChange={e=>setMessage(e.target.value)} 
        ></textarea>
        <button
          className="self-end text-xl opacity-[.65] hover:opacity-[.85]" 
          onClick={submitHandler}
        >
          <GrSend />
        </button>
      </div>
    </div>
  )
}

export default NewMessage