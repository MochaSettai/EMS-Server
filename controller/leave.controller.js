import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";


const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name"
        },
        {
          path: "userId",
          select: "name",
        }
      ]
    })
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get leaves server error" });
  }
}

const getLeavesById = async (req, res) => {
  try {
    const { id } = req.params;

    let leaves = await Leave.find({employeeId: id})
    if(!leaves || leaves.length < 1) {
      const employee = await Employee.findOne({userId: id})
      if(employee){
        leaves = await Leave.find({employeeId: employee._id})
      }   
    }
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get leaves by id server error" });
  }
}

const getLeaveById = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name"
        },
        {
          path: "userId",
          select: "name profileImage"
        }
      ]
    })
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get leave by id server error" });
  }
}

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({userId})

    const newLeave = new Leave({
      employeeId: employee._id, 
      leaveType, 
      startDate, 
      endDate, 
      reason
    });

    await newLeave.save();

    return res.status(200).json({success: true, message: 'leave added'})

  } catch (error) {
    return res.status(500).json({ success: false, error: "add leave server error" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    console.log('once')
    const { id } = req.params;
    console.log(id)
    const { status } = req.body;
    console.log(status)
  
    const updatedLeave = await Leave.findByIdAndUpdate(id, {
      status
    });
    console.log('twice')
  
    if(!updatedLeave) {
      return res.status(404).json({ success: false, error: "leave not found" });
    }
  
    return res.status(200).json({ success: true, message: "leave status updated" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "update leave status server error" });
  }
}

export { getLeaves, getLeavesById, getLeaveById, addLeave, updateLeaveStatus };