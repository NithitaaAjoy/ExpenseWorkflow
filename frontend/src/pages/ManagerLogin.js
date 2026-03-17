import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

function ManagerLogin() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    role: "manager"
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {

    try {

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
      });

      const data = await res.json();

      alert(data.message);

      // ✅ Correct condition
      if (data.message === "Login successful") {

        localStorage.setItem("role", data.role);

        navigate("/manager-dashboard");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }

  };

  return (
    <div>

      <h2>Manager Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default ManagerLogin;