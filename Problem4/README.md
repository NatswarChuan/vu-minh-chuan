# Summation Functions in TypeScript

This repository provides three unique implementations of a function to calculate the sum of integers from 1 to n in TypeScript.  Each implementation is accompanied by comments explaining its time and space complexity, as well as its advantages and disadvantages.

## Functions

### `sum_to_n_a(n: number): number`

Calculates the sum using an array and the `reduce` method.

*   **Time Complexity:** O(n) - Linear time.
*   **Space Complexity:** O(n) - Linear space.

### `sum_to_n_b(n: number): number`

Calculates the sum recursively.

*   **Time Complexity:** O(n) - Linear time.
*   **Space Complexity:** O(n) - Linear space (due to call stack).

### `sum_to_n_c(n: number): number`

Calculates the sum using the mathematical formula: `n * (n + 1) / 2`.

*   **Time Complexity:** O(1) - Constant time.
*   **Space Complexity:** O(1) - Constant space.

## Validation

A `validationNumber(n: number)` function is included to ensure the input `n` is within the valid range (non-negative and less than `Number.MAX_SAFE_INTEGER`).  If the input is invalid, an error is thrown.

## Test Cases

The `testCases` array demonstrates the functionality of each `sum_to_n` function with various inputs, including edge cases and invalid inputs.  The output of each test case is printed to the console, along with any errors that are thrown.

## Usage

To use these functions in your TypeScript project:

1.  Clone the repository: `git clone https://github.com/NatswarChuan/vu-minh-chuan.git`
2.  Import the desired function into your module:

    ```typescript
    import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './src/sum-to-n';

    const result = sum_to_n_c(10);
    console.log(result); // Output: 55
    ```

## Running Tests

To run the test cases, you can use a TypeScript compiler (like `tsc`) and Node.js:

1.  Compile the TypeScript code: `tsc`
2.  Run the compiled JavaScript file: `node index.js`