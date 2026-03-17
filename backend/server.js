const http = require("http");
const url = require("url");
const { ObjectId } = require("mongodb");

const { connectDB, getDB } = require("./db/connection");
const { signup, login } = require("./controllers/authController");
const { sendApprovalEmail } = require("./service/emailService");

connectDB();

http.createServer((req, res) => {

  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", async () => {

    try {

      // ================= SIGNUP =================
      if (req.method === "POST" && parsedUrl.pathname === "/signup") {

        const data = JSON.parse(body);

        const result = await signup(data);

        res.end(JSON.stringify(result));
      }

      // ================= LOGIN =================
      else if (req.method === "POST" && parsedUrl.pathname === "/login") {

        const data = JSON.parse(body);

        const result = await login(data);

        res.end(JSON.stringify(result));
      }

      // ================= SUBMIT EXPENSE =================
      else if (req.method === "POST" && parsedUrl.pathname === "/expense") {

        const data = JSON.parse(body);

        const db = getDB();

        const expense = {
          employeeName: data.employeeName,
          employeeEmail: data.employeeEmail,
          amount: data.amount,
          description: data.description,
          department: data.department,
          priority: data.priority,
          country: data.country,
          date: new Date(),
          status: "pending"
        };

        await db.collection("expenses").insertOne(expense);

        res.end(JSON.stringify({
          success: true,
          message: "Expense submitted successfully"
        }));
      }

      // ================= GET EXPENSES =================
      else if (req.method === "GET" && parsedUrl.pathname === "/expenses") {

        const db = getDB();

        const expenses = await db
          .collection("expenses")
          .find()
          .toArray();

        res.end(JSON.stringify({
          success: true,
          expenses: expenses
        }));
      }

      // ================= APPROVE / REJECT =================
      else if (req.method === "POST" && parsedUrl.pathname === "/approve") {

        const data = JSON.parse(body);

        const db = getDB();

        const expense = await db.collection("expenses").findOne({
          _id: new ObjectId(data.id)
        });

        if (!expense) {
          res.end(JSON.stringify({
            success: false,
            message: "Expense not found"
          }));
          return;
        }

        await db.collection("expenses").updateOne(
          { _id: new ObjectId(data.id) },
          { $set: { status: data.status } }
        );

        // SEND EMAIL
        await sendApprovalEmail(
          expense.employeeEmail,
          expense,
          data.status
        );

        res.end(JSON.stringify({
          success: true,
          message: "Status updated and email sent"
        }));
      }

      // ================= ROUTE NOT FOUND =================
      else {

        res.end(JSON.stringify({
          success: false,
          message: "Route not found"
        }));

      }

    } catch (error) {

      console.log("Server Error:", error);

      res.end(JSON.stringify({
        success: false,
        message: "Server error"
      }));

    }

  });

}).listen(5000, () => {

  console.log("Server running on port 5000");

});