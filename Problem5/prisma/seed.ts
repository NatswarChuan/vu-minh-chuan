import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Interface defining the data shape for creating an employee.
 * This mirrors the structure expected by Prisma for employee creation.
 */
interface EmployeeCreateInput {
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
  employee_age: number;
}

/**
 * Seeds the database with a specified number of randomly generated employees.
 * @param count The number of employees to create. Defaults to 100 if not provided.
 */
async function seedEmployees(count: number = 100) {
  // Generate an array of employee data using Faker.js
  const employees: EmployeeCreateInput[] = Array.from({ length: count }, () => ({
    employee_name: faker.person.fullName(),
    employee_email: faker.internet.email(),
    employee_age: faker.number.int({ min: 18, max: 65 }),
  }));

  // Insert the generated employees into the database using Prisma's createMany method.
  await prisma.employee.createMany({
    data: employees,
    skipDuplicates: true, // Skip duplicate entries if any
  });

  console.log(`Seeded ${count} employees.`);
}

/**
 * Main function to execute the seeding process.
 */
async function main() {
  await seedEmployees(); // No need to pass the count as it defaults to 100 now.
}

// Execute the main function and handle potential errors, then disconnect Prisma.
main()
  .catch((e) => {
    console.error(e); // Log any errors during seeding
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect Prisma client after seeding is complete
  });
