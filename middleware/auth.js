const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("❌ Authentication required: No token provided");
  }

  const token = authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    throw new Error("❌ Invalid token format");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request
    return req.user;
  } catch (err) {
    throw new Error("❌ Token verification failed: " + err.message);
  }
};

module.exports = authMiddleware;
