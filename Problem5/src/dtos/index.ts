import { Response } from "express";

/**
 * A base interface for response DTOs, extending the Express Response object.
 * This ensures consistent structure for API responses.
 * @interface BaseResponseDTO
 * @template T The type of the data property in the response.
 * @extends Response Extends the Express Response interface.
 */
export interface BaseResponseDTO<T> extends Response {
    /**
     * Sends a JSON response with a standardized structure.
     * @param data An object containing the response data.
     * @param data.success A boolean indicating the success status of the request. True for successful requests, false otherwise.
     * @param data.message An optional string message providing further context about the response.  This is typically a success or informational message.
     * @param data.data The actual data payload returned by the request. This can be of any type `T` and should be omitted for unsuccessful requests.
     * @param data.error An optional string error message if the request was unsuccessful.  This should be omitted for successful requests.
     * @param data.pagination An optional object containing pagination information. This object should include `page` (current page number), `page_size` (number of items per page), `total` (total number of items), and `total_pages` (total number of pages).
     * @returns The current response object (`this`) to allow for method chaining.
     */
    json(data: {
        success: boolean;
        message?: string;
        data?: T;
        error?: string;
        pagination?: {
            page: number;
            page_size: number;
            total: number;
            total_pages: number;
        }
    }): this;
}
