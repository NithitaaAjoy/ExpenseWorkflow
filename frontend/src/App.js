import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Signup from "./pages/Signup";
import EmployeeLogin from "./pages/EmployeeLogin";
import ManagerLogin from "./pages/ManagerLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

import "./styles/dashboard.css";

function App() {
  return (
    <BrowserRouter>

      <h1 className="title">Expense Workflow System</h1>

      <div className="navbar">
        <Link to="/signup">Signup</Link>
        <Link to="/employee-login">Employee Login</Link>
        <Link to="/manager-login">Manager Login</Link>
      </div>

      <Routes>

        <Route path="/" element={<EmployeeLogin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />

        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;