import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProviderController from "./providers/ProviderController";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ element }) => {
  const [cookies] = useCookies(['token']);
  return cookies.token ? element : <Navigate to="/login" />;
};

export default function App() {
  return (
    <ProviderController>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<PrivateRoute element={<Admin/>} />} />
        </Routes>
      </Router>
    </ProviderController>
  )
}