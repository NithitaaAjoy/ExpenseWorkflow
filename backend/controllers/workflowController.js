const { createWorkflow, getWorkflows } = require("../models/workflowModel");

async function addWorkflow(data) {

  const workflow = {
    name: data.name,
    version: 1,
    is_active: true,
    input_schema: data.input_schema,
    start_step_id: null
  };

  await createWorkflow(workflow);

  return { message: "Workflow created successfully" };
}

async function listWorkflows() {

  const workflows = await getWorkflows();

  return workflows;
}

module.exports = { addWorkflow, listWorkflows };