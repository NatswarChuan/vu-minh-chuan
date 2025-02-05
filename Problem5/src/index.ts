import express from 'express';
import employeeRoutes from './routes/employee.route';

// Create an Express application
const app = express();
// Use port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount employee routes under the '/employees' path
app.use('/employees', employeeRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
