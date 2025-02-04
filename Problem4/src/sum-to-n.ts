/**
 * Calculates the sum of numbers from 1 to n using an array and reduce.
 *
 * Time Complexity: O(n) - Linear time. Creates an array of size 'n' and then iterates over it using `reduce`. The operations take time proportional to 'n'.
 * Space Complexity: O(n) - Linear space. Creates an array of size 'n'. The space used grows linearly with the input 'n'.
 *
 * Pros:  Easy to understand and implement. Leverages functional programming paradigms.
 * Cons:  Less efficient in terms of both time and space compared to the formula approach (`sum_to_n_c`).  Not suitable for very large values of 'n' due to the linear space complexity.
 *
 * @param n The upper limit of the sum (inclusive).
 * @returns The sum of numbers from 1 to n.
 * @throws {Error} If 'n' is negative or exceeds the maximum safe integer.
 */
export function sum_to_n_a(n: number): number {
    validationNumber(n);

    let result: number = Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);

    return result;
}

/**
 * Calculates the sum of numbers from 1 to n using recursion.
 *
 * Time Complexity: O(n) - Linear time. The function makes a recursive call for each number from 'n' down to 0.
 * Space Complexity: O(n) - Linear space. Due to the recursive calls, the space used on the call stack grows linearly with 'n'. This can lead to stack overflow errors for large values of 'n'.
 *
 * Pros:  Elegant and concise code. Expresses the problem in a recursive manner.
 * Cons:  High space complexity due to the function call stack. Can lead to stack overflow errors for large values of 'n'. Less efficient than the formula approach (`sum_to_n_c`).
 *
 * @param n The upper limit of the sum (inclusive).
 * @returns The sum of numbers from 1 to n.
 * @throws {Error} If 'n' is negative or exceeds the maximum safe integer.
 */
export function sum_to_n_b(n: number): number {
    validationNumber(n);

    return n === 0 ? 0 : n + sum_to_n_b(n - 1);
}

/**
 * Calculates the sum of numbers from 1 to n using a mathematical formula.
 *
 * Time Complexity: O(1) - Constant time. Performs a fixed number of arithmetic operations, regardless of the size of 'n'.
 * Space Complexity: O(1) - Constant space. Uses a fixed number of variables. The space used does not change with the input 'n'.
 *
 * Pros: Simple and fast calculation.
 * Cons: Relies on a mathematical formula, which might not be as intuitively obvious to all developers. Potential for overflow if `n` is very large.
 *
 * @param n The upper limit of the sum (inclusive).
 * @returns The sum of numbers from 1 to n.
 * @throws {Error} If 'n' is negative or exceeds the maximum safe integer.
 */
export function sum_to_n_c(n: number): number {
    validationNumber(n);

    let result: number = n * (n + 1) / 2;

    return result;
}

/**
 * Validates the input number to ensure it's within the allowed range.
 *
 * @param n The number to validate.
 * @throws {Error} If 'n' is negative or exceeds the maximum safe integer.
 */
function validationNumber(n: number) {
    if (n >= Number.MAX_SAFE_INTEGER) {
        throw new Error("number is too large");
    }
    if (n < 0) {
        throw new Error("number is negative");
    }
}
