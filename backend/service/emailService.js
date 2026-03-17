const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nithitaa.ajoy2005@gmail.com",   // your gmail
    pass: "khko rcre gdzs xtao"            // gmail app password
  }
});

// function to send email
const sendApprovalEmail = async (toEmail, expense, status) => {

  try {

    const mailOptions = {
      from: "Manager-ServiceNow<nithitaa.ajoy2005@gmail.com>",
      to: toEmail,
      subject: "Expense Approval Status",

      text: `Hello ${expense.employeeName},

Your expense request has been ${status}.

Amount: ₹${expense.amount}
Description: ${expense.description}

Thank you,
Expense Workflow System`
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

  } catch (error) {

    console.error("Email sending failed:", error);

  }

};

module.exports = { sendApprovalEmail };