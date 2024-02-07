import {useState} from 'react'
import {motion} from 'framer-motion'

// icons
// send
import { GrSend } from "react-icons/gr"

// main
// NewComment
const NewComment = () => {
    // local states
    // note
    const [comment,setComment] = useState('')

    // adjust text-area height
    const adjustTextAreaHeight = e => {
        let textaea = document.getElementById('new-comment-textarea')
        textaea.style.height = '18px'
        let scHeight = e.target.scrollHeight 
        textaea.style.height = `${scHeight}px`
    }

    // submit hander
    const submitHandler = () => {
        let textaea = document.getElementById('new-comment-textarea')
       if(comment.trim()){
        console.log({comment})
       }
        setComment('')
        textaea.style.height = '18px'
        textaea.focus()
    }
  return (
    <div className="flex items-center">
        <div className="relative">
            <motion.div className="absolute bottom-0 left-3 text-xs text-emerald-900 bg-gray-300 p-1 rounded-sm font-serif" 
                drag
                dragSnapToOrigin
            >
                <div className="flex items-center bg-emerald-700 rounded-sm text-gray-100 py-[.15rem]">
                    <textarea name="note" placeholder="comment..." 
                        id="new-comment-textarea" 
                        className="focus:outline-none bg-transparent w-[230px] h-[18px] resize-none mx-1 max-h-[400px]" 
                        value={comment} 
                        onChange={e=>setComment(e.target.value)}  
                        onKeyUp={adjustTextAreaHeight}        
                    ></textarea>
                    <button 
                        className="self-end text-xl text-gray-300" 
                        onClick={submitHandler} 
                    >
                        <GrSend />
                    </button>
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default NewComment