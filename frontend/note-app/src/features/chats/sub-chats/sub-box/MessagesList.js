import {useRef,useEffect} from 'react'
// sub box
import SingleMessage from "./SingleMessage"
// main
// MessagesList
const MessagesList = () => {
  // states 
  const scroll = useRef()
  
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: 'smooth'})
  })

  return (
    <div className="flex-grow h-[84vh] overflow-y-auto" id="message-list-container">
        <SingleMessage isOwn={false}/>
        <SingleMessage isOwn={true}/>
        <SingleMessage isOwn={false}/>
        <SingleMessage isOwn={true}/>
        <SingleMessage isOwn={false}/>
        <SingleMessage isOwn={true}/>
        <SingleMessage isOwn={false}/>
        <SingleMessage isOwn={true}/>
        <div ref={scroll}/>
    </div>
  )
}

export default MessagesList