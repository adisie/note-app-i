import { useState } from "react"

// icons
import { GrSend } from "react-icons/gr"

// main
// NewMessage
const NewMessage = () => {
  // states
  const [message,setMessage] = useState('')

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
      console.log(message)
    }
    setMessage('')
    textarea.style.height = '18px'
    textarea.focus()
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