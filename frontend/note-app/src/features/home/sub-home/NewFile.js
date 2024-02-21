import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { FaCirclePlus } from "react-icons/fa6"

// actions from slices
import {
    newFile,
    selectIsFileUploading,
} from '../homeSlice'

// main
// New File
const NewFile = () => {
    const [isDragging,setIsDragging] = useState(false)
    // states
    // home 
    const isFileUploading = useSelector(selectIsFileUploading)
    // hooks
    const dispatch = useDispatch()

    // submit handler
    const submitHandler = e => {
        let formData = new FormData() 
        formData.append('file',e.target.files[0])
        dispatch(newFile(formData))
    }

    // onDragOverHandler
    const onDragOverHandler = e => {
        console.log('HADDIS')
        e.preventDefault()
        setIsDragging(true)
        e.dataTransfer.dropEffect = 'copy'
    }

    // onDragLeaveHandler 
    const onDragLeaveHandler = e => {
        e.preventDefault()
        setIsDragging(true)
    }

    // on drop handler
    const onDropHandler = e => {
        e.preventDefault()
        setIsDragging(false)
        let formData = new FormData() 
        formData.append('file',e.dataTransfer.files[0])
        dispatch(newFile(formData))
    }

  return (
    <div className="max-w-[720px] mx-auto px-3 relative">
        <input type="file" name="file" id="file" hidden onChange={submitHandler}/>
        {
            isFileUploading 
            ?
            <div className="w-[16px] h-[16px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin m-1" />
            :
            <label htmlFor="file" className="text-xl cursor-pointer bg-emerald-700 relative z-50">
                <FaCirclePlus className="text-emerald-700 text-2xl m-1"/>
            </label>
        }
        
            
        <div className='fixed top-0 left-0 w-full h-full' onDragOver={onDragOverHandler} onDragLeave={onDragLeaveHandler} onDrop={onDropHandler}> 
            {
                isDragging 
                ?
                <div className='w-full h-full flex items-center justify-center bg-black bg-opacity-[.13]'>
                    <h3 className='text-3xl text-emerald-700 opacity-[1] font-serif relative z-50'>Drop File</h3>
                </div>
                :
                <></>
            }
        </div>
            
        
    </div>
  )
}

export default NewFile