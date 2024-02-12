import {useDispatch} from 'react-redux'

// actions from slices
// chatsSlice
import {
    setChatDir,
} from '../chatsSlice'

// icons
// friends
import { MdSupervisorAccount } from "react-icons/md"
// find
import { MdPersonSearch } from "react-icons/md"
// request
import { BsPersonFillAdd } from "react-icons/bs"
// main
// ChatsHeader
const ChatsHeader = () => {
    // hooks
    const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-center text-gray-300 text-xs font-serif">
        {/* friends */}
        <div className="flex items-center justify-center mr-2 cursor-pointer" 
            onClick={()=>{
                dispatch(setChatDir('FRL'))
            }}
        >
            <MdSupervisorAccount className="text-xl"/>
            <span>Friends</span>
        </div>
        {/* find */}
        <div className="flex items-center justify-center mr-2 cursor-pointer" 
            onClick={()=>{
                dispatch(setChatDir('FIL'))
            }}
        >
            <MdPersonSearch className="text-xl"/>
            <span>Find</span>
        </div>
        {/* request */}
        <div className="flex items-center justify-center mr-2 cursor-pointer" 
            onClick={()=>{
                dispatch(setChatDir('RQL'))
            }}
        >
            <BsPersonFillAdd className="text-xl"/>
            <span>Requests</span>
        </div>

    </div>
  )
}

export default ChatsHeader