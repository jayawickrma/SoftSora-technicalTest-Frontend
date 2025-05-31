import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {TaskPage} from "./Pages/TaskPage.tsx";


function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<TaskPage/>}  />
            </Routes>
        </Router>
    </>
  )
}

export default App
