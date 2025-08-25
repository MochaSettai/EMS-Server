import Department from "../models/department.model.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    } catch (error) {
        return res.status(500).json({success: false, error: "get departments server error"})
    }
}

const getDepartmentById = async (req, res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById(id)
        return res.status(200).json({success: true, department})
    } catch (error) {
        return res.status(500).json({success: false, error: "get department by ID server error"})
    }
}

const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save() // save the department to the mongoose database
        return res.status(200).json({success: true, department: newDep})
    } catch (error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updatedDep = await Department.findByIdAndUpdate(id, {
            dep_name,
            description
        })
        return res.status(200).json({success: true, message: "department updated"})
    } catch (error) {
        return res.status(500).json({success: false, error: "update department server error"})
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedDep = await Department.findById(id);
        await deletedDep.deleteOne();
        return res.status(200).json({success: true, department: deletedDep})
    } catch (error) {
        return res.status(500).json({success: false, error: "delete department server error"})
    }
}


export {getDepartments, getDepartmentById, addDepartment, updateDepartment, deleteDepartment}