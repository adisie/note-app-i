
// icons
import { MdOutlineDriveFileRenameOutline } from "react-icons/md"
// main
// Header
const Header = () => {
  return (
    <div className="bg-emerald-700 text-gray-300">
        <div className="max-w-[720px] mx-auto px-3">
            <div>
                <button className="flex items-center text-xl font-serif py-1">
                    <MdOutlineDriveFileRenameOutline />
                    Files
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header