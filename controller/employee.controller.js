import multer from "multer";
import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });

  } catch (error) {
    return res.status(500).json({ success: false, error: "get employees server error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
      if(!employee) {
        employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get employee by ID server error" });
  }
};

const getEmployeesByDep = async (req, res) => {
  try {
    const { depId } = req.params;
    
    const employees = await Employee.find({ department: depId })
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });

  } catch (error) {
    return res.status(500).json({ success: false, error: "get employees by department server error" });
  }
};

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Checking if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, error: "user already registered in emp" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Storing the user to the Database
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    console.log(req.file.filename);
    const savedUser = await newUser.save();

    // Storing the employee to the Database
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();

    return res.status(200).json({
      success: true,
      employee: newEmployee,
      message: "employee created succesfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "add employee server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      maritalStatus, 
      designation, 
      department,
      salary,
    } = req.body;

    const updatedEmp = await Employee.findByIdAndUpdate(id, {
      maritalStatus,
      designation,
      salary,
      department
    });

    const updatedUser = await User.findByIdAndUpdate(updatedEmp.userId, {name})

    if(!updatedEmp || !updatedUser) {
      return res.status(500).json({ success: false, error: "user document not found" });
    }

    return res.status(200).json({ success: true, message: "employee updated" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "update employee server error" });
  }
};

export { getEmployees, getEmployeeById, getEmployeesByDep, addEmployee, updateEmployee, upload };
