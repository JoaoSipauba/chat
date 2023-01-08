import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login"
import RoomPage from "./pages/room"

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/room" element={<RoomPage/>}/>
        </Routes>
    </Router>
  )
}

export default App
