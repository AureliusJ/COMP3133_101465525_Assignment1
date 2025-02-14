require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const authMiddleware = require("./middleware/auth");

const app = express();

// Connect to MongoDB
connectDB();

// Initialize Apollo Server with authentication context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Apply authentication middleware
    authMiddleware(req);
    return { user: req.user }; // Pass user info to GraphQL resolvers
  }
});

// Start server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000/graphql"));
}

startServer();
