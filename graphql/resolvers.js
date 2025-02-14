const Employee = require("../models/Employee");

const resolvers = {
  Query: {
    async login(_, { username, email, password }) {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("❌ Invalid credentials");
      }
      return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    },
    async getAllEmployees(_, __, { user }) {
      if (!user) {
        throw new Error("❌ Unauthorized: You must be logged in to access this data.");
      }
      return await Employee.find();
    },
    async searchEmployeeById(_, { eid }, { user }) {
      if (!user) {
        throw new Error("❌ Unauthorized: You must be logged in to access this data.");
      }
      return await Employee.findById(eid);
    },
    async searchEmployeeByDesignationOrDepartment(_, { designation, department }, { user }) {
      if (!user) {
        throw new Error("❌ Unauthorized: You must be logged in to access this data.");
      }
      return await Employee.find({ $or: [{ designation }, { department }] });
    }
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      return await newUser.save();
    },
    async addEmployee(_, args, { user }) {
      if (!user) {
        throw new Error("❌ Unauthorized: You must be logged in to add an employee.");
      }
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },
    async updateEmployeeById(_, { eid, ...updates }, { user }) {
      if (!user) {
        throw new Error("❌ Unauthorized: You must be logged in to update an employee.");
      }
      return await Employee.findByIdAndUpdate(eid, updates, { new: true });
    },
    async deleteEmployeeById(_, { eid }, { user }) {
      if (!user) {
        throw new Error("❌ Unauthorized: You must be logged in to delete an employee.");
      }
      await Employee.findByIdAndDelete(eid);
      return "Employee deleted successfully";
    }
  }
};

module.exports = resolvers;
