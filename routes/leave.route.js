import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getLeaves, getLeavesById, getLeaveById, addLeave, updateLeaveStatus } from '../controller/leave.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getLeaves);
router.get('/:id', authMiddleware, getLeavesById);
router.get('/one/:id', authMiddleware, getLeaveById);
router.post('/add', authMiddleware, addLeave);
router.put('/status/:id', authMiddleware, updateLeaveStatus);


export default router;