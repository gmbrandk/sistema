import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import Pruebas from "./pages/pruebas";
import "./App.css";

function App () {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/testing" element={<Pruebas />}></Route>
        </Routes>
      </Router>
    );
}

export default App;
