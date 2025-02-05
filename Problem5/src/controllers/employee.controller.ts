import {
  CreateEmployeeDTO, GetEmployeesDTO, GetEmployeeByIdDTO, UpdateEmployeeDTO, DeleteEmployeeDTO,
  DeleteEmployeeDTOBody
} from '../dtos/employee/request.dto';
import {
  CreateEmployeeResponseDTO, GetEmployeesResponseDTO, GetEmployeeByIdResponseDTO, UpdateEmployeeResponseDTO, DeleteEmployeeResponseDTO
} from '../dtos/employee/response.dto';
import * as employeeService from '../services/employee.service';
import { CreateEmployeeResponseDataDTO, GetEmployeeResponseDataDTO, UpdateEmployeeResponseDataDTO } from '../dtos/employee/response.dto';

/**
 * Controller function to create a new employee.
 * @param req The Express request object containing employee data in the body.
 * @param res The Express response object.
 */
export const createEmployee = async (req: CreateEmployeeDTO, res: CreateEmployeeResponseDTO) => {
  try {
    const { employee_name, employee_email, employee_age: age } = req.body;
    const employee_age: number = parseInt(age, 10);

    if (isNaN(employee_age)) {
      res.status(400).json({ success: false, error: 'Invalid employee age' });
      return;
    }

    const newEmployee = await employeeService.createEmployee(employee_name, employee_email, employee_age);

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: new CreateEmployeeResponseDataDTO(newEmployee),
    });
  } catch (error: any) {
    if (error.message === 'Data has changed, please reload and try again.' || error.message === 'Employee with this email already exists') { // Improved error handling for optimistic locking
      res.status(409).json({ success: false, error: error.message }); // 409 Conflict if optimistic locking fails
    }
    else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

/**
 * Controller function to retrieve a list of employees.
 * Supports filtering, sorting, and pagination.
 * @param req The Express request object containing query parameters for filtering, sorting, and pagination.
 * @param res The Express response object.
 */
export const getEmployees = async (req: GetEmployeesDTO, res: GetEmployeesResponseDTO) => {
  try {
    const { name, email, sort_by = ["employee_id"], order = ["asc"], page: page_query = "1", page_size: page_size_query = "10" } = req.query;
    const page: number = parseInt(page_query, 10);
    const page_size: number = parseInt(page_size_query, 10);

    const employees = await employeeService.getEmployees(
      { name, email }, 
      Array.isArray(sort_by) ? sort_by : [sort_by], 
      Array.isArray(order) ? order : [order],
      (page - 1) * page_size,
      page_size
    );

    const totalEmployees = await employeeService.getTotalEmployees({ name, email });

    res.json({
      success: true,
      message: "Successfully retrieved employee list",
      data: employees.map(emp => new GetEmployeeResponseDataDTO(emp)),
      pagination: {
        page: page,
        page_size: page_size,
        total: totalEmployees,
        total_pages: Math.ceil(totalEmployees / page_size),
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message }); // Send error message in response
  }
};

/**
 * Controller function to retrieve an employee by ID.
 * @param req The Express request object containing the employee ID in the URL parameters.
 * @param res The Express response object.
 */
export const getEmployeeById = async (req: GetEmployeeByIdDTO, res: GetEmployeeByIdResponseDTO) => {
  try {
    const employeeId: number | null = employeeService.parseEmployeeId(req.params.id, res);
    if (!employeeId) return;

    const employee = await employeeService.getEmployeeById(employeeId);
    if (!employee) {
      res.status(404).json({ success: false, error: 'Employee not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Successfully retrieved employee information',
      data: new GetEmployeeResponseDataDTO(employee),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message }); // Send error message in response
  }
};


/**
 * Controller function to update an existing employee.
 * @param req The Express request object containing updated employee data in the body and the employee ID in the URL parameters.
 * @param res The Express response object.
 */
export const updateEmployee = async (req: UpdateEmployeeDTO, res: UpdateEmployeeResponseDTO) => {
  try {
    const employeeId: number | null = employeeService.parseEmployeeId(req.params.id, res);
    if (!employeeId) return;

    const { employee_name, employee_email, updated_at, employee_age: age } = req.body;
    const employee_age: number = parseInt(age, 10);

    if (isNaN(employee_age)) {
      res.status(400).json({ success: false, error: 'Invalid employee age' });
      return;
    }

    const updatedEmployee = await employeeService.updateEmployee(employeeId, employee_name, employee_email, employee_age, updated_at);

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: new UpdateEmployeeResponseDataDTO(updatedEmployee),
    });
  } catch (error: any) {
    if (error.message === 'Data has changed, please reload and try again.') { // Improved error handling for optimistic locking
      res.status(409).json({ success: false, error: error.message }); // 409 Conflict if optimistic locking fails
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};


/**
 * Controller function to delete an employee.
 * @param req The Express request object containing the employee ID in the URL parameters and the `updated_at` timestamp for optimistic locking in the body.
 * @param res The Express response object.
 */
export const deleteEmployee = async (req: DeleteEmployeeDTO, res: DeleteEmployeeResponseDTO) => {
  try {
    const employeeId: number | null = employeeService.parseEmployeeId(req.params.id, res);
    if (!employeeId) return;

    const { updated_at }: DeleteEmployeeDTOBody = req.body;
    await employeeService.deleteEmployee(employeeId, updated_at);

    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error: any) {
      if (error.message === 'Data has changed, please reload and try again.') {
          res.status(409).json({ success: false, error: error.message });
      } else {
          res.status(500).json({ success: false, error: error.message });
      }
  }
};
