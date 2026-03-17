const { createUser, findUserByEmail } = require("../models/usermodel");

async function signup(data) {

  const existing = await findUserByEmail(data.email);

  if (existing) {
    return {
      success: false,
      message: "User already exists"
    };
  }

  await createUser(data);

  return {
    success: true,
    message: "Signup successful"
  };
}

async function login(data) {

  const user = await findUserByEmail(data.email);

  if (!user) {
    return {
      success: false,
      message: "User not found"
    };
  }

  if (user.password !== data.password) {
    return {
      success: false,
      message: "Wrong password"
    };
  }

  if (user.role !== data.role) {
    return {
      success: false,
      message: "Access denied for this page"
    };
  }

  return {
    success: true,
    message: "Login successful",
    user: {
      email: user.email,
      role: user.role,
      name: user.name
    }
  };
}

module.exports = { signup, login };