import {useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'

import {
    getAllFiles,
    addNewFiles,
} from './filesSlice'

import { FaCirclePlus } from "react-icons/fa6"

// sub-files
import FilesList from "./sub-files/FilesList"
// main
// Files
const Files = () => {
    // local state
    const [isDragging,setIsDragging] = useState(false) 

    // hooks
    const dispatch = useDispatch()

    // effects
    // all files
    useEffect(()=>{
        dispatch(getAllFiles())
    },[])

    // on drag over handler
    const onDragOverHandler = e => {
        e.preventDefault()
        setIsDragging(true)
        e.dataTransfer.dropEffect = 'copy'
    }

    // on drag leave handler
    const onDragLeaveHandler = e => {
        e.preventDefault()
        setIsDragging(true)
    }

    // on drop handler
    const onDropHandler = e => {
        let formData = new FormData()
        e.preventDefault()
        setIsDragging(false) 
        let files = e.dataTransfer.files
        for(let i = 0; i < files.length; i++){
            formData.append('files',files[i])
        }
        dispatch(addNewFiles(formData))
    }

    const submitHandler = e => {
        let formData = new FormData()
        let files = e.target.files 
        for(let i = 0; i < files.length; i++){
            formData.append('files',files[i])
        }
        dispatch(addNewFiles(formData))
    }

  return (
    <div className="flex-grow flex relative" onDragOver={onDragOverHandler} onDragLeave={onDragLeaveHandler} onDrop={onDropHandler}>
        <div className="flex-grow max-w-[720px] px-3 mx-auto flex flex-col">
            <FilesList />
            <div className='flex items-center justify-center'>
                <input type="file" name="files" id="files" hidden multiple onChange={submitHandler}/>
                <label htmlFor="files" className='text-3xl text-emerald-700 cursor-pointer'>
                    <FaCirclePlus />
                </label>
            </div>
        </div>
        {
            isDragging 
            ?
            <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-[.13] flex items-center justify-center">
                <div className="bg-white p-5 rounded-md w-max font-black font-serif">Drop Here</div>
            </div>
            :
            <></>
        }
    </div>
  )
}

export default Files