const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    async login(_, { username, email, password }) {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }
      return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    },
    async getAllEmployees() {
      return await Employee.find();
    },
    async searchEmployeeById(_, { eid }) {
      return await Employee.findById(eid);
    },
    async searchEmployeeByDesignationOrDepartment(_, { designation, department }) {
      return await Employee.find({ $or: [{ designation }, { department }] });
    }
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      return await newUser.save();
    },
    async addEmployee(_, args) {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },
    async updateEmployeeById(_, { eid, ...updates }) {
      return await Employee.findByIdAndUpdate(eid, updates, { new: true });
    },
    async deleteEmployeeById(_, { eid }) {
      await Employee.findByIdAndDelete(eid);
      return "Employee deleted successfully";
    }
  }
};

module.exports = resolvers;
