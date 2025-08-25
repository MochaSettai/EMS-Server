import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getSalary, addSalary } from '../controller/salary.controller.js';

const router = express.Router();

router.get('/:id', authMiddleware, getSalary);
router.post('/add', authMiddleware, addSalary);


export default router;