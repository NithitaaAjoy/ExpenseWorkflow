import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {

    try {

      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      const data = await res.json();

      alert(data.message);

      if (data.success) {
        navigate("/employee-login");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }

  };

  return (
    <div>

      <h2>Signup</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <br /><br />

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

      <select name="role" onChange={handleChange}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>

      <br /><br />

      <button onClick={handleSignup}>Signup</button>

    </div>
  );
}

export default Signup;