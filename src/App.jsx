import Home from "./pages/Home";
import Login from "./pages/Login";
import ProviderController from "./providers/ProviderController";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <ProviderController>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ProviderController>
  )
}