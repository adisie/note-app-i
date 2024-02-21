import {useDispatch} from 'react-redux'

// global constants
import {
    BASE_URL
} from '../../../config'

// actions from slices
// home
import {
deleteFile,
} from '../homeSlice'

// icons
import { IoMdTrash } from "react-icons/io"
// main
// Single File
const SingleFile = ({file}) => {
    const dispatch = useDispatch()
  return (
    <>
    {
        true 
        ?
        <div className="my-3 mb-5">
            <div>
                <img src={`${BASE_URL}/${file.filePath}`} alt="file" className="h-[350px] w-[100%] object-cover" />
            </div>
            <button className='text-xl my-1 text-emerald-700 opacity-[.75] hover:opacity-[1] relative z-50' 
                onClick={()=>{
                    dispatch(deleteFile(file._id))
                }}
            >
                <IoMdTrash />
            </button>
        </div>
        :
        <div></div>
    }
    </>
  )
}

export default SingleFile