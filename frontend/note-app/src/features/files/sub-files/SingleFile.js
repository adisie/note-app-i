
import {useDispatch} from 'react-redux'
import GetFile from "./GetFile"
import { IoMdTrash } from "react-icons/io"

import {
    deleteFiles,
} from '../filesSlice'
// main
// SingleFile
const SingleFile = ({file}) => {
    const dispatch = useDispatch()
  return (
    <div className="py-3 mb-5 border-b border-b-emerald-700 border-opacity-[.13] grid grid-cols-2 relative">
        {
            file.files.map((fl,index)=>(
                <GetFile key={index} file={fl}/>
            ))
        }
        <button className="absolute bottom-0 left-0" onClick={()=>{
            dispatch(deleteFiles(file._id))
        }}>
            <IoMdTrash className="text-xl m-1 text-red-700"/>
        </button>
    </div>
  )
}

export default SingleFile