import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import NotificationBadge,{Effect,} from 'react-notification-badge'

// actions from slices
// chats
import {
    setChatDir,
} from '../chatsSlice'
// home
import {
    setMainDir,
} from '../../home/homeSlice'
// connections
import {
    selectNotifications,
    readAllNotifications,
} from '../../connections/connectionsSlice'
// icons
// notifications
import { IoMdNotifications } from "react-icons/io";
// messages
import { RiMessage2Fill } from "react-icons/ri"
// main
// NotificationBtns
const NotificationBtns = () => {
    // states from slices
    // connections
    const notifications = useSelector(selectNotifications)
    let unReadNotifications = notifications.filter(notification => notification.isRead === false)
    // hooks
    const dispatch = useDispatch()
  return (
    <div className='flex mx-1 text-gray-400 items-center text-xl'>
        <NavLink 
            to={'/chats'} 
            onClick={()=>{
                dispatch(setChatDir('FRL'))
                dispatch(setMainDir('CHATS'))
            }}
        >
            <RiMessage2Fill />
        </NavLink>
        <NavLink 
            to={'/chats'} 
            className={"flex"} 
            onClick={()=>{
                dispatch(setChatDir('NOT'))
                dispatch(setMainDir('CHATS'))
                dispatch(readAllNotifications())
            }}
        >   
            <IoMdNotifications className={unReadNotifications?.length > 0 ? "text-3xl" : ""}/>
            {
                unReadNotifications?.length > 0 
                ?
                <NotificationBadge count={unReadNotifications.length} effect={Effect.ROTATE_Y} className="text-xs"/>
                :
                <></>
            }
        </NavLink>
    </div>
  )
}

export default NotificationBtns