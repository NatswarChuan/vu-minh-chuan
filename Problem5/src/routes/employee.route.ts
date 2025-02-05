import express from 'express';
import * as employeeController from '../controllers/employee.controller';

const router = express.Router();

/**
 * Route to create a new employee.
 * @route POST /employees
 */
router.post('/', employeeController.createEmployee);

/**
 * Route to retrieve a list of employees with optional filtering, sorting, and pagination.
 * @route GET /employees
 * @queryParam name - Filter employees by name (partial match).
 * @queryParam email - Filter employees by email (partial match).
 * @queryParam sort_by - Sort by one or more fields (comma-separated).
 * @queryParam order - Sort order for each corresponding `sort_by` field (comma-separated, `asc` or `desc`).
 * @queryParam page - Page number for pagination (default: 1).
 * @queryParam page_size - Number of items per page (default: 10).
 */
router.get('/', employeeController.getEmployees);

/**
 * Route to retrieve a specific employee by ID.
 * @route GET /employees/:id
 * @pathParam id - The ID of the employee to retrieve.
 */
router.get('/:id', employeeController.getEmployeeById);

/**
 * Route to update an existing employee's information.
 * @route PUT /employees/:id
 * @pathParam id - The ID of the employee to update.
 */
router.put('/:id',  employeeController.updateEmployee);

/**
 * Route to delete an employee by ID.
 * @route DELETE /employees/:id
 * @pathParam id - The ID of the employee to delete.
 */
router.delete('/:id', employeeController.deleteEmployee);

export default router;

