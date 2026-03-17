import { useEffect, useState } from "react";
import "../styles/form.css";

function ManagerDashboard() {

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {

    try {

      const res = await fetch("http://localhost:5000/expenses");    

      const data = await res.json();
 
      if (data.success) {
        setExpenses(data.expenses);
      }

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const updateStatus = async (id, status) => {

    await fetch("http://localhost:5000/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        status: status
      })
    });

    fetchExpenses();

  };

  return (
    <div>

      <h2>Manager Dashboard</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Department</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {expenses.length > 0 ? (

            expenses.map((expense) => (

              <tr key={expense._id}>

                <td>{expense.employeeName}</td>
                <td>{expense.employeeEmail}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.department}</td>
                <td>{expense.priority}</td>
                <td>{expense.status}</td>

                <td>

                  <button
                    onClick={() =>
                      updateStatus(expense._id, "approved")
                    }
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(expense._id, "rejected")
                    }
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="8">No expenses found</td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ManagerDashboard;