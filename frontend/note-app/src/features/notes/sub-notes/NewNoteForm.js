import {useState} from 'react'
import {motion} from 'framer-motion'

// icons
// cancel
import { MdCancelPresentation } from "react-icons/md"
// file
import { MdOutlineAttachFile } from "react-icons/md"
// send
import { GrSend } from "react-icons/gr"

// main
// NewNoteForm
const NewNoteForm = () => {
    // local states
    // note
    const [note,setNote] = useState('')
    // file
    const [file,setFile] = useState(null)

    // adjust text-area height
    const adjustTextAreaHeight = e => {
        let textaea = document.getElementById('new-note-textarea')
        textaea.style.height = '18px'
        let scHeight = e.target.scrollHeight 
        textaea.style.height = `${scHeight}px`
    }

    // file input change handler
    const fileInutChaneHandler = e => {
        let fileNameDisplayer = document.getElementById('file-name-span')
        setFile(e.target.files[0])
        fileNameDisplayer.textContent = e.target.files[0].name
    }

    // reset file
    const resetFile = () => {
        let fileNameDisplayer = document.getElementById('file-name-span')
        fileNameDisplayer.textContent = ''
        setFile(null)
    }

    // submit hander
    const submitHandler = () => {
        let textaea = document.getElementById('new-note-textarea')
        let fileNameDisplayer = document.getElementById('file-name-span')

        let formData = new FormData()
        if(note.trim() && file){
            formData.append('note',note)
            formData.append('file',file)
        }else if(note.trim() && !file){
            formData.append('note',note)
        }else if(!note.trim() && file){
            formData.append('file',file)
        }else{
            console.log('empty form')
        }
        setNote('')
        setFile(null)
        textaea.style.height = '18px'
        textaea.focus()
        fileNameDisplayer.textContent = ''
    }
  return (
    <div className="flex items-center">
        <div className="relative">
            <motion.div className="absolute bottom-0 left-3 text-xs text-emerald-900 bg-white p-1 rounded-sm font-serif" 
                drag
                dragSnapToOrigin
            >
                <div className="flex items-center justify-between">
                    <span id="file-name-span"></span>
                    {
                        file
                        ?
                        <>
                        <button className="text-xl py-1 text-red-500" 
                            onClick={resetFile}
                        >
                            <MdCancelPresentation />
                        </button>
                        </>
                        :
                        <></>
                    }
                </div>
                <div className="flex items-center bg-emerald-700 rounded-sm text-gray-100 py-1 pr-1">
                    <input type="file" name="file" id="file" accept="image/*" hidden  
                        onChange={fileInutChaneHandler} 
                    />
                    <label htmlFor="file" 
                        className="self-end text-xl text-gray-300 cursor-pointer"
                    >
                        <MdOutlineAttachFile />
                    </label>
                    <textarea name="note" placeholder="note..." 
                        id="new-note-textarea" 
                        className="focus:outline-none bg-transparent w-[230px] h-[18px] resize-none" 
                        value={note} 
                        onChange={e=>setNote(e.target.value)}  
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

export default NewNoteForm