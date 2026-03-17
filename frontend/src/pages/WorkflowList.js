import { useState, useEffect } from "react";

function WorkflowList() {

 const [workflows, setWorkflows] = useState([]);
 const [name, setName] = useState("");

 useEffect(() => {
  loadWorkflows();
 }, []);

 const loadWorkflows = async () => {

  const res = await fetch("http://localhost:5000/workflows");
  const data = await res.json();

  setWorkflows(data);
 };

 const createWorkflow = async () => {

  const res = await fetch("http://localhost:5000/workflows", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    name: name,
    input_schema: {}
   })
  });

  const data = await res.json();

  alert(data.message);

  loadWorkflows();
 };

 return (

  <div>

   <h2>Workflow List</h2>

   <input
    placeholder="Workflow Name"
    onChange={(e) => setName(e.target.value)}
   />

   <button onClick={createWorkflow}>Create</button>

   <table border="1">

    <thead>
     <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Version</th>
      <th>Status</th>
     </tr>
    </thead>

    <tbody>

     {workflows.map((wf) => (

      <tr key={wf._id}>

       <td>{wf._id}</td>
       <td>{wf.name}</td>
       <td>{wf.version}</td>
       <td>{wf.is_active ? "Active" : "Inactive"}</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 );
}

export default WorkflowList;