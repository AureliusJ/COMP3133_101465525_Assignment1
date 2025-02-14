# Employee Management System (GraphQL API)

## 📌 Project Overview
This project is a **GraphQL-based Employee Management System** built with:
- **Node.js**
- **Express.js**
- **GraphQL (Apollo Server)**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Postman for API Testing**

This system allows users to **sign up, log in, and manage employees** (CRUD operations) securely.

---

## 🚀 Features
- **User Authentication** (Signup, Login with JWT)
- **Employee Management**
  - Add, update, delete employees
  - Fetch employees by ID, designation, or department
  - Get all employees
- **MongoDB as Database**
- **Secure APIs with JWT Authentication**
- **GraphQL for Flexible Data Fetching**

---

## 📦 Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### **2️⃣ Install Dependencies**

npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Start the Server**
```sh
npm start
```

### **5️⃣ Test the API**
Use Postman to test the API endpoints.

---

## 📚 Documentation

### **GraphQL Queries and Mutations**
- **Queries**
    - `getEmployeeById(id: ID!): Employee`
    - `getEmployees: [Employee]`
    - `getEmployeesByDesignation(designation: String!): [Employee]`
    - `getEmployeesByDepartment(department: String!): [Employee]`
- **Mutations**
    - `addEmployee(name: String!, designation: String!, department: String!): Employee`
    - `updateEmployee(id: ID!, name: String, designation: String, department: String): Employee`
    - `deleteEmployee(id: ID!): Employee`

---

## 🛠️ Built With
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Apollo Server** - GraphQL server
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Postman** - API testing

---

