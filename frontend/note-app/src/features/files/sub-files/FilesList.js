import {useRef,useEffect} from 'react'
import {useSelector} from 'react-redux'

import {
  selectFiles,
} from '../filesSlice'

import SingleFile from './SingleFile'
// main
// files list
const FilesList = () => {
  const files = useSelector(selectFiles)
  const scroll = useRef()
  useEffect(()=>{
    scroll.current.scrollIntoView({behavior: 'smooth'})
  },[files])
  return (
    <div className="h-[88vh] overflow-y-auto">
      {
        files.map(file=>(
          <SingleFile key={file._id} file={file}/>
        ))
      }
      <div ref={scroll}/>
    </div>
  )
}

export default FilesList