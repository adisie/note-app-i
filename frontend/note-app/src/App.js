
// pages
// Files
import Files from "./features/files/Files"

// components
// Header
import Header from "./components/Header"

// main
const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <Files />
    </div>
  )
}

export default App