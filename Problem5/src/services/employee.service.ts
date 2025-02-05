import { Employee } from '@prisma/client';
import { prisma } from '../ultils/prisma.util';
import { Response } from 'express';
import { validate as isUUID } from 'uuid';


/**
 * Parses and validates a UUID employee ID
 * @param id The employee ID as a string
 * @param res Express response object
 * @returns Original UUID string if valid, null if invalid
 */
export const parseEmployeeId = (id: string, res: Response): string | null => {
  
  if (!isUUID(id)) {
    res.status(400).json({ 
      success: false, 
      error: 'Invalid UUID format for employee ID' 
    });
    return null;
  }
  
  return id;
};

/**
 * Creates a new employee.
 * @param employee_name The name of the employee.
 * @param employee_email The email of the employee.
 * @param employee_age The age of the employee.
 * @returns The newly created employee.
 * @throws Error if employee with the given email already exists.
 */
export const createEmployee = async (employee_name: string, employee_email: string, employee_age: number): Promise<Employee> => {
  const existingEmployee = await prisma.employee.findUnique({
    where: { employee_email },
  });

  if (existingEmployee) {
    throw new Error('Employee with this email already exists');
  }

  return await prisma.employee.create({
    data: { employee_name, employee_email, employee_age },
  });
};

/**
 * Retrieves a list of employees based on filters, sorting, and pagination.
 * @param filters An object containing filter criteria (name, email).
 * @param sortFields An array of fields to sort by.
 * @param sortOrders An array of sort orders ("asc" or "desc").
 * @param skip The number of records to skip for pagination.
 * @param take The number of records to retrieve for pagination.
 * @returns An array of employees.
 */
export const getEmployees = async (filters: any, sortFields: string[], sortOrders: string[], skip: number, take: number): Promise<Employee[]> => {
  const validSortFields: string[] = ["employee_name", "employee_email", "employee_age", "created_at"];
  
  const orderBy = sortFields
    .map((field, index) => ({
      [field]: validSortFields.includes(field) ? (sortOrders[index] === "desc" ? "desc" : "asc") : undefined,
    }))
    .filter(sortObj => Object.values(sortObj)[0] !== undefined);

  return await prisma.employee.findMany({
    where: {
      employee_name: filters.name ? { contains: filters.name } : undefined,
      employee_email: filters.email ? { contains: filters.email } : undefined,
    },
    orderBy,
    skip,
    take,
  });
};

/**
 * Retrieves an employee by ID.
 * @param id The ID of the employee.
 * @returns The employee if found, null otherwise.
 */
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  return await prisma.employee.findUnique({ where: { employee_id: id } });
};

/**
 * Updates an existing employee.
 * @param id The ID of the employee to update.
 * @param employee_name The updated name of the employee.
 * @param employee_email The updated email of the employee.
 * @param employee_age The updated age of the employee.
 * @param updated_at The timestamp of the last update for optimistic locking.
 * @returns The updated employee.
 * @throws Error if employee is not found or data has changed (optimistic locking failure).
 */
export const updateEmployee = async (id: string, employee_name: string, employee_email: string, employee_age: number, updated_at: string): Promise<Employee> => {
  const existingEmployee = await prisma.employee.findUnique({ where: { employee_id: id } });

  if (!existingEmployee) {
    throw new Error('Employee not found');
  }

  if (new Date(updated_at).getTime() !== new Date(existingEmployee.updated_at).getTime()) {
    throw new Error('Data has changed, please reload and try again.');
  }

  return await prisma.employee.update({
    where: { employee_id: id },
    data: { employee_name, employee_email, employee_age },
  });
};

/**
 * Deletes an employee.
 * @param id The ID of the employee to delete.
 * @param updated_at The timestamp of the last update for optimistic locking.
 * @throws Error if employee is not found or data has changed (optimistic locking failure).
 */
export const deleteEmployee = async (id: string, updated_at: string): Promise<void> => {
  const existingEmployee = await prisma.employee.findUnique({ where: { employee_id: id } });

  if (!existingEmployee) {
    throw new Error('Employee not found');
  }

  if (new Date(updated_at).getTime() !== new Date(existingEmployee.updated_at).getTime()) {
    throw new Error('Data has changed, please reload and try again.');
  }

  await prisma.employee.delete({ where: { employee_id: id } });
};


/**
 * Gets the total number of employees based on filters.
 * @param filters An object containing filter criteria (name, email).
 * @returns The total count of employees.
 */
export const getTotalEmployees = async (filters: any): Promise<number> => {
  return await prisma.employee.count({
    where: {
      employee_name: filters.name ? { contains: filters.name } : undefined,
      employee_email: filters.email ? { contains: filters.email } : undefined,
    },
  });
};
