import {useDispatch, useSelector} from 'react-redux'

// actions from slices
// users
import {
  setIsSearch,
  selectIsSearch,
} from '../../users/usersSlice'

// icons
// search
import { CiSearch } from "react-icons/ci"

// main
// NotesSearchBar
const NotesSearchBar = () => {
  // states from slice
  // users
  const isSearch = useSelector(selectIsSearch)
  // hooks
  const dispatch = useDispatch()
  // input change handler
  const inputChangeHandler = e => {
    dispatch(setIsSearch(e.target.value))
  }
  return (
    <div>
      <div className="bg-black bg-opacity-[.15] flex items-center rounded-full px-1 py-[.075rem] text-gray-400">
        <CiSearch className="text-xl"/>
        <input type="text" name="username" placeholder="username" 
          className="focus:outline-none bg-transparent" 
          onChange={inputChangeHandler} 
          value={isSearch}
        />
      </div>
    </div>
  )
}

export default NotesSearchBar