import { useState } from "react";
import "../styles/form.css";

function EmployeeDashboard() {

  const [expense, setExpense] = useState({
    employeeName: "",
    employeeEmail: "",
    amount: "",
    description: "",
    department: "",
    priority: "",
    country: ""
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value
    });
  };

  const submitExpense = async () => {

    const res = await fetch("http://localhost:5000/expense", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(expense)

    });

    const data = await res.json();

    alert(data.message);
  };

  return (

    <div>

      <h2>Submit Expense</h2>

      <input
      name="employeeName"
      placeholder="Employee Name"
      onChange={handleChange}
      />

      <br/><br/>

      <input
      name="employeeEmail"
      placeholder="Employee Email"
      onChange={handleChange}
      />

      <br/><br/>

      <input
      name="amount"
      placeholder="Amount"
      onChange={handleChange}
      />

      <br/><br/>

      <input
      name="description"
      placeholder="Description"
      onChange={handleChange}
      />

      <br/><br/>

      <input
      name="department"
      placeholder="Department"
      onChange={handleChange}
      />

      <br/><br/>

      <select name="priority" onChange={handleChange}>

        <option value="">Select Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>

      </select>

      <br/><br/>

      <input
      name="country"
      placeholder="Country"
      onChange={handleChange}
      />

      <br/><br/>

      <button onClick={submitExpense}>
        Submit Expense
      </button>

    </div>

  );
}

export default EmployeeDashboard;