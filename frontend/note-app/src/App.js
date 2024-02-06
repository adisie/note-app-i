
// components
// Header
import Header from "./components/Header"
// features
// home
// Home
import Home from "./features/home/Home"

// main
// App
const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <Home />
    </div>
  )
}

export default App