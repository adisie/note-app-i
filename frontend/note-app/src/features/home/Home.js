import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

// actions from slices
// home slice
import {
    files,
} from './homeSlice'

// sub-files
import FileList from "./sub-home/FileList"
import NewFile from "./sub-home/NewFile"
// main
// Home
const Home = () => {
    // hooks
    const dispatch = useDispatch()
    // effects
    // files
    useEffect(()=>{
        dispatch(files())
    },[])
  return (
    <div className="flex-grow flex flex-col">
        <FileList />
        <NewFile />
    </div>
  )
}

export default Home