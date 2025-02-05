import { PrismaClient } from '@prisma/client';

/**
 * A singleton instance of the PrismaClient.
 * This ensures that only one instance of PrismaClient is created and used throughout the application.
 * This is important for performance and to avoid potential connection issues.
 * @constant
 */
const prisma = new PrismaClient();


// By exporting the initialized instance, it can be readily imported and used in other modules.
export { prisma };

