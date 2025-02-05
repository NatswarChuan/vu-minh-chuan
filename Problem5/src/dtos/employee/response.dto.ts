import { Employee } from "@prisma/client";
import { BaseResponseDTO } from "..";

/**
 * Response DTO for retrieving a list of employees.
 * Extends the BaseResponseDTO with an array of `GetEmployeeResponseDataDTO`.
 */
export interface GetEmployeesResponseDTO extends BaseResponseDTO<GetEmployeeResponseDataDTO[]> {}

/**
 * Response DTO for retrieving a single employee by ID.
 * Extends the BaseResponseDTO with `GetEmployeeResponseDataDTO`.
 */
export interface GetEmployeeByIdResponseDTO extends BaseResponseDTO<GetEmployeeResponseDataDTO> {}

/**
 * Response DTO for creating a new employee.
 * Extends the BaseResponseDTO with `CreateEmployeeResponseDataDTO`.
 */
export interface CreateEmployeeResponseDTO extends BaseResponseDTO<CreateEmployeeResponseDataDTO> {}

/**
 * Response DTO for updating an employee.
 * Extends the BaseResponseDTO with `UpdateEmployeeResponseDataDTO`.
 */
export interface UpdateEmployeeResponseDTO extends BaseResponseDTO<UpdateEmployeeResponseDataDTO> {}

/**
 * Response DTO for deleting an employee.
 * Extends the BaseResponseDTO.
 */
export interface DeleteEmployeeResponseDTO extends BaseResponseDTO<null> {}

/**
 * Data Transfer Object (DTO) for employee information used in list and single retrievals.
 * Simplifies the `Employee` object for external use.
 */
export class GetEmployeeResponseDataDTO {
    /**
     * The ID of the employee.
     */
    id: number;
    /**
     * The name of the employee.
     */
    name: string;
    /**
     * The email address of the employee.
     */
    email: string;
    /**
     * The age of the employee.
     */
    age: number;
    /**
     * The timestamp of the last update.
     */
    updated_at: Date;

    /**
     * Constructor for the GetEmployeeResponseDataDTO.
     * @param employee The `Employee` object retrieved from Prisma.
     */
    constructor(employee: Employee) {
        this.id = employee.employee_id;
        this.name = employee.employee_name;
        this.email = employee.employee_email;
        this.updated_at = employee.updated_at;
        this.age = employee.employee_age;
    }
}

/**
 * Data Transfer Object (DTO) for the response after creating an employee.
 * Includes the `created_at` timestamp.
 */
export class CreateEmployeeResponseDataDTO {
    /**
     * The ID of the employee.
     */
    id: number;
    /**
     * The name of the employee.
     */
    name: string;
    /**
     * The email address of the employee.
     */
    email: string;
    /**
     * The age of the employee.
     */
    age: number;

    /**
     * The timestamp of the last update.
     */
    updated_at: Date;
    /**
     * The timestamp of creation.
     */
    created_at: Date;


    /**
     * Constructor for the CreateEmployeeResponseDataDTO.
     * @param employee The newly created `Employee` object from Prisma.
     */
    constructor(employee: Employee) {
        this.id = employee.employee_id;
        this.name = employee.employee_name;
        this.email = employee.employee_email;
        this.updated_at = employee.updated_at;
        this.created_at = employee.created_at;
        this.age = employee.employee_age;
    }
}

/**
 * Data Transfer Object (DTO) for the response after updating an employee.
 */
export class UpdateEmployeeResponseDataDTO {
    /**
     * The ID of the employee.
     */
    id: number;
    /**
     * The name of the employee.
     */
    name: string;
    /**
     * The email address of the employee.
     */
    email: string;
    /**
     * The age of the employee.
     */
    age: number;
    /**
     * The timestamp of the last update.
     */
    updated_at: Date;
    /**
     * The timestamp of creation.
     */
    created_at: Date;

    /**
     * Constructor for the UpdateEmployeeResponseDataDTO.
     * @param employee The updated `Employee` object from Prisma.
     */
    constructor(employee: Employee) {
        this.id = employee.employee_id;
        this.name = employee.employee_name;
        this.email = employee.employee_email;
        this.age = employee.employee_age;
        this.updated_at = employee.updated_at;
        this.created_at = employee.created_at;
    }
}
