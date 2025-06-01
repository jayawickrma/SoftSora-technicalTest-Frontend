import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskPage } from "./Pages/TaskPage.tsx";
import { LoginPage } from "./Pages/LoginPage.tsx";
// import {EditTaskModal} from "./Components/EditTaskComponent.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/tasks" element={<TaskPage />} />
                {/*<Route path="/edit" element={<EditTaskModal/>}/>*/}
            </Routes>
        </Router>
    );
}

export default App;
