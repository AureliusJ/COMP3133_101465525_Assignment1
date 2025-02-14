const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req) => {
  try {
    // Ensure body exists
    if (!req.body || !req.body.query) {
      return; // No query, no authentication needed
    }

    // Extract operation name from query
    const operationNameMatch = req.body.query.match(/\b(mutation|query)\s+(\w+)/);
    const operationName = operationNameMatch ? operationNameMatch[2] : null;

    // Skip authentication for public routes
    const publicRoutes = ["signup", "login"];
    if (operationName && publicRoutes.includes(operationName)) {
      console.log(`Skipping authentication for public route: ${operationName}`);
      return;
    }

    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("❌ Authentication required: No token provided");
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("❌ Invalid token format");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request
  } catch (error) {
    throw new Error(`❌ Authentication failed: ${error.message}`);
  }
};

module.exports = authMiddleware;
