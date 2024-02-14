
// icons
// search
import { CiSearch } from "react-icons/ci"

// main
// NotesSearchBar
const NotesSearchBar = () => {
  return (
    <div>
      <div className="bg-black bg-opacity-[.15] flex items-center rounded-full px-1 py-[.1rem] text-gray-400">
        <CiSearch className="text-xl"/>
        <input type="text" name="username" placeholder="username" 
          className="focus:outline-none bg-transparent"
        />
      </div>
    </div>
  )
}

export default NotesSearchBar