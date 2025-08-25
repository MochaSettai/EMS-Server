import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getEmployees, getEmployeeById, getEmployeesByDep, addEmployee, updateEmployee, upload } from '../controller/employee.controller.js';


const router = express.Router();

router.get('/', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, getEmployeeById);
router.get('/department/:depId', authMiddleware, getEmployeesByDep);

router.post('/add', authMiddleware, upload.single('image'), addEmployee);
router.put('/edit/:id', authMiddleware, updateEmployee);
// router.delete('/delete/:id', authMiddleware, deleteEmployee);

export default router;