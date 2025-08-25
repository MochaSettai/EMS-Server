import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getDepartments, getDepartmentById, addDepartment, updateDepartment, deleteDepartment } from '../controller/department.controller.js';


const router = express.Router();

router.get('/', authMiddleware, getDepartments);
router.get('/:id', authMiddleware, getDepartmentById);
router.post('/add', authMiddleware, addDepartment);
router.put('/edit/:id', authMiddleware, updateDepartment);
router.delete('/delete/:id', authMiddleware, deleteDepartment);

export default router;