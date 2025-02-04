import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './src/sum-to-n';

const testCases:number[] = [0, 1, 5, 10, 100, Number.MAX_SAFE_INTEGER - 10, -1, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER + 1];

for (const testCase of testCases) {
    try {
        console.log(`sum_to_n_a(${testCase}):`, sum_to_n_a(testCase)); // Expected: 0, 1, 15, 55, 5050, large number, error, error, error
    } catch (error:any) {
        console.error(`sum_to_n_a(${testCase}):`, error.message); // Expected: "number is negative" or "Invalid array length" or "number is too large"
    }

    try {
        console.log(`sum_to_n_b(${testCase}):`, sum_to_n_b(testCase)); // Expected: 0, 1, 15, 55, 5050, large number, error, error, error. May also encounter "Maximum call stack size exceeded" for large numbers.
    } catch (error:any) {
        console.error(`sum_to_n_b(${testCase}):`, error.message); // Expected: "number is negative" or "number is too large" or "Maximum call stack size exceeded"
    }

    try {
        console.log(`sum_to_n_c(${testCase}):`, sum_to_n_c(testCase)); // Expected: 0, 1, 15, 55, 5050, large number, error, very large number, error
    } catch (error:any) {
        console.error(`sum_to_n_c(${testCase}):`, error.message); // Expected: "number is negative" or "number is too large"
    }
}