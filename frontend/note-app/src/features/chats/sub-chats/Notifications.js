import {useSelector} from 'react-redux'

// actions from slices
// notifications
import {
  selectNotifications,
  selectIsNotificationReading
} from '../../connections/connectionsSlice'

// sub-not
import SingleNotification from '../sub-chats/sub-not/SingleNotification'

// main
// Notifications
const Notifications = () => {
  // states from slices
  // connections
  const notifications = useSelector(selectNotifications) 
  const isNotificationReading = useSelector(selectIsNotificationReading) 

  if(isNotificationReading){
    return <div className='flex-grow h-[92vh] p-2 overflow-y-auto'>
        <div className='w-full h-full flex pt-5 justify-center'>
          <div className='w-[81px] h-[81px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin'></div>
        </div>
    </div>
  }
  
  return (
    <div className="flex-grow h-[92vh] p-2 overflow-y-auto">
      {
        notifications.map(notification => (
          <SingleNotification key={notification._id} notification={notification}/>
        ))
      }
    </div>
  )
}

export default Notifications