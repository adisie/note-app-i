
// pages
import Home from "./features/home/Home"
// components
import Header from "./components/Header"

// main
const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <Home />
    </div>
  )
}

export default App