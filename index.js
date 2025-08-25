import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import departmentRouter from './routes/department.route.js';
import employeeRouter from './routes/employee.route.js';
import salaryRouter from './routes/salary.route.js';
import leaveRouter from './routes/leave.route.js';
import settingsRouter from './routes/settings.route.js';

import connectToDatabase from './db/db.js';


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))


// Routes
app.use('/api/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/settings', settingsRouter);


// Connection
connectToDatabase()
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
