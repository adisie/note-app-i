import {useRef,useEffect} from 'react'
import {useSelector} from 'react-redux'

// actions from slices
// home slice
import {
    selectFiles,
} from '../homeSlice'

import SingleFile from "./SingleFile"
// main
// File List
const FileList = () => {
    // states from slices
    // home slice
    const files = useSelector(selectFiles)
    const scroll = useRef()

    // effects
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: 'smooth'})
    },[files])
    
  return (
    <div className=" flex-grow w-[720px] mx-auto px-3 h-[88vh] overflow-y-auto relative z-40">
        {
            files.map(file=>(
                <SingleFile key={file._id} file={file}/>
            ))
        }
        <div ref={scroll}/>
    </div>
  )
}

export default FileList