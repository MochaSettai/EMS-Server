import mongoose from "mongoose";
import Employee from "./employee.model.js"
import Leave from "./leave.model.js"
import Salary from "./salary.model.js"

const departmentSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

// Cascade deletion middleware(document)
departmentSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
    try {
        const employees = await Employee.find({ department: this._id });
        const empIds = employees.map(emp => emp._id);

        await Employee.deleteMany({ department: this._id });
        await Leave.deleteMany({ employeeId: { $in: empIds } });
        await Salary.deleteMany({ employeeId: { $in: empIds } });

        next();
    } catch(error) {
        next(error);
    }
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;