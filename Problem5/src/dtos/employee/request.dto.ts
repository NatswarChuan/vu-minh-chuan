import { Request } from 'express';

/**
 * Data Transfer Object (DTO) for creating an employee's request body.
 */
export interface CreateEmployeeDTOBody {
  /**
   * The name of the employee.
   */
  employee_name: string;
  /**
   * The email address of the employee.
   */
  employee_email: string;
  /**
   * The age of the employee.
   */
  employee_age: string;
}

/**
 * Data Transfer Object (DTO) for creating an employee's request.
 * Extends the Express `Request` interface.
 */
export interface CreateEmployeeDTO extends Request {
  /**
   * The request body containing employee data.
   */
  body: CreateEmployeeDTOBody;
}

/**
 * Data Transfer Object (DTO) for retrieving an employee by ID.
 * Extends the Express `Request` interface.
 */
export interface GetEmployeeByIdDTO extends Request {
  /**
   * The request parameters containing the employee ID.
   */
  params: {
    /**
     * The ID of the employee.
     */
    id: string;
  };
}

/**
 * Data Transfer Object (DTO) for retrieving a list of employees.
 * Extends the Express `Request` interface.
 */
export interface GetEmployeesDTO extends Request {
  /**
   * Query parameters for filtering, sorting, and pagination.
   */
  query: {
    /**
     * Filter employees by name (partial match).
     */
    name?: string;
    /**
     * Filter employees by email (partial match).
     */
    email?: string;
    /**
     * Sort by specified fields (e.g., `employee_name`, `employee_age`).
     */
    sort_by?: string[];
    /**
     * Sort order for each corresponding `sort_by` field (`asc` or `desc`).
     */
    order?: ("asc" | "desc")[];
    /**
     * Page number for pagination.
     */
    page?: string;
    /**
     * Number of items per page.
     */
    page_size?: string;
  };
}

/**
 * Interface representing the query parameters for retrieving employees.  This mirrors the structure within GetEmployeesDTO.query
 */
export interface GetEmployeesDTOQuery {
  /**
   * Filter employees by name (partial match).
   */
  name?: string;
  /**
   * Filter employees by email (partial match).
   */
  email?: string;
  /**
   * Sort by specified fields (e.g., `employee_name`, `employee_age`).
   */
  sort_by?: string[];
  /**
   * Sort order for each corresponding `sort_by` field (`asc` or `desc`).
   */
  order?: ("asc" | "desc")[];
  /**
   * Page number for pagination.
   */
  page?: string;
  /**
   * Number of items per page.
   */
  page_size?: string;
}

/**
 * Data Transfer Object (DTO) for updating an employee's request body.
 */
export interface UpdateEmployeeDTOBody {
  /**
   * The updated name of the employee.
   */
  employee_name: string;
  /**
   * The updated email address of the employee.
   */
  employee_email: string;
  /**
   * The timestamp of the last update (used for optimistic locking).
   */
  updated_at: string;
  /**
   * The updated age of the employee.
   */
  employee_age: string;
}

/**
 * Data Transfer Object (DTO) for updating an employee's request.
 * Extends the Express `Request` interface.
 */
export interface UpdateEmployeeDTO extends Request {
  /**
   * Request parameters containing the employee ID.
   */
  params: {
    /**
     * The ID of the employee to update.
     */
    id: string;
  };
  /**
   * The request body with updated employee data.
   */
  body: UpdateEmployeeDTOBody;
}

/**
 * Data Transfer Object (DTO) for deleting an employee's request body.
 */
export interface DeleteEmployeeDTOBody {
  /**
   * The timestamp of the last update (used for optimistic locking).
   */
  updated_at: string;
}

/**
 * Data Transfer Object (DTO) for deleting an employee's request.
 * Extends the Express `Request` interface.
 */
export interface DeleteEmployeeDTO extends Request {
  /**
   * Request parameters containing the employee ID.
   */
  params: {
    /**
     * The ID of the employee to delete.
     */
    id: string;
  };
  /**
   * The request body containing the timestamp for optimistic locking.
   */
  body: DeleteEmployeeDTOBody;
}

