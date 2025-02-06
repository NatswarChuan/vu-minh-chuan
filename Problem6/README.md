# Scoreboard API Service

## Overview

This API service is responsible for updating user scores based on actions performed on our website. When a user completes an action, the API will:

- Authenticate the user using JWT.
- Validate and verify the action (ensuring a unique action ID, corresponding score, and rate limits are observed).
- Update the user's score in a NoSQL database.
- Leverage Redis for fast leaderboard retrieval and ranking.
- Update the leaderboard in Redis and sort users based on score and update time.
- Broadcast the top 10 leaderboard (sorted by score and, for equal scores, by the earliest update time) to all connected clients in real time using WebSocket.
- Log all score update requests for monitoring, analysis, and DDoS prevention.
- Ensure all communications are secured via HTTPS and input data is validated to prevent security vulnerabilities.

## Technology Stack

- **Programming Language:** TypeScript
- **Database:** NoSQL (e.g., MongoDB) for fast data queries
- **Cache:** Redis for accelerated responses and leaderboard management
- **Authentication:** JWT for secure API access
- **Real-time Communication:** WebSocket for live leaderboard updates
- **Security:** HTTPS for secure data transmission, input validation, and DDoS protection tools
- **Anti-Spam Measures:**
  - Each action carries a unique ID and is validated to prevent replay attacks.
  - Actions are verified before any score updates occur.
  - A stack/queue mechanism is implemented to restrict the number of score update requests per user within a specified time window.
- **Score Limits:** Each action has an associated score value and may impose limits on the score increment based on the action type.

## System Architecture

### 1. Request Flow

The following diagram illustrates the flow of execution when a user performs an action:

```mermaid
flowchart TD
    A[Client performs an action] -->|Send API Request| B[Application Server]
    B --> C[JWT Authentication Middleware]
    C -->|Invalid Token| D[Return Unauthorized Error]
    C -->|Valid Token| E[Input Data Validation]
    E --> F[Action Validation (check ID, score value, rate limit, replay protection)]
    F -->|Invalid/Spam Action| G[Return Error: Invalid Action or Spam Detected]
    F -->|Valid Action| H[Update User Score in NoSQL DB]
    H --> I[Log Score Update Request]
    I --> J[Update Leaderboard in Redis]
    J --> K[Retrieve Top 10 Leaderboard]
    K --> L[Broadcast Leaderboard via WebSocket]
    L --> M[Log Broadcast Event]
    M --> N[End of Request Processing]
```

*Note:* Every action that involves receiving or sending data is logged for tracking and security purposes.

### 2. Module Components

#### 2.1. Authentication and Data Validation

- **JWT Middleware:** Verifies the user's token to ensure the request is made by an authenticated user.
- **Input Validator:** Uses libraries like `Joi` or `class-validator` to validate incoming data, ensuring that the action ID, score, and other parameters meet the expected formats and limits.
- **Replay Protection:** Prevents duplicate action submissions by validating `actionId` against a time-based cache.

#### 2.2. Action Processing and Score Update

- **Action Handler:** Processes incoming requests, checks the validity of the action ID, the score associated with the action, and enforces request rate limits.
- **Spam Protection:** Implements a stack/queue mechanism to throttle excessive requests from the same user.
- **Score Updater:** If the action is valid, updates the user's score in the NoSQL database and synchronizes changes with Redis.

#### 2.3. Leaderboard Management

- **Redis Manager:** Manages the leaderboard data stored in Redis, ensuring fast sorting based on score and update time. When users have equal scores, the user with the earlier update is ranked higher.
- **Leaderboard Updater:** Updates the leaderboard after each score change, ensuring real-time accuracy.
- **Leaderboard API:** Retrieves and returns the top 10 users based on score.

#### 2.4. Real-Time Updates

- **WebSocket Server:** After a successful score update, broadcasts the latest top 10 leaderboard to all connected clients in real time.
- **Logging:** The broadcast event is logged to ensure tracking of all transmitted updates.
- **Client Update Handling:** Clients receive and process leaderboard updates to ensure synchronized data display.

#### 2.5. Logging and Monitoring

- **Logger:** Records every score update request, including details for each action, to facilitate monitoring, analysis, and early detection of potential abuse (such as spam or DDoS attacks). Every action that involves receiving or sending data is logged.

## Security and Performance Considerations

- **Security:**
  - All client-server communications use HTTPS.
  - Input data is strictly validated to prevent common vulnerabilities and security issues.
  - DDoS prevention tools are integrated to safeguard the system.
  - **Replay Attack Prevention:** Each `actionId` is checked against a short-term cache (e.g., Redis) to prevent reusing the same action multiple times.
- **Performance:**
  - NoSQL is employed to provide rapid data queries.
  - Redis ensures quick response times for leaderboard operations.
  - Rate limiting is enforced per user to avoid spam.

## Error Handling

- **Common Error Codes:**
  - `401 Unauthorized`: Invalid or missing JWT token.
  - `403 Forbidden`: User lacks permission for the requested operation.
  - `429 Too Many Requests`: Rate limit exceeded.
  - `400 Bad Request`: Invalid request format or missing required parameters.
  - `500 Internal Server Error`: Unexpected server-side failure.
- **Logging Errors:**
  - All errors are logged for debugging and analysis.
  - Detailed error messages are available for internal monitoring but sanitized for external responses to avoid exposing sensitive details.
- **Error Recovery:**
  - If a leaderboard update fails, the system retries the update.
  - If WebSocket fails to broadcast updates, the client can manually fetch the latest leaderboard data.

## API Examples

### 1. Score Update Request

#### Request
```json
POST /api/score/update
Headers: { "Authorization": "Bearer <JWT_TOKEN>" }
Body:
{
  "actionId": "12345"
}
```

#### Response
```json
{
  "success": true,
  "message": "Score updated successfully",
  "leaderboard": [
    { "username": "user1", "score": 150 },
    { "username": "user2", "score": 140 },
    ...
    { "username": "user10", "score": 100}
  ]
}
```

## Future Enhancements & Improvements

- **GraphQL Support:** Provide an alternative to REST API for optimized queries.
- **Action History Tracking:** Maintain a record of past score updates for users.
- **User Ranking Tiers:** Introduce ranking levels (e.g., Bronze, Silver, Gold) for better user engagement.
- **Leaderboard Customization:** Allow users to filter leaderboard by time range (daily, weekly, all-time).

## Conclusion

The Scoreboard API Service is designed to securely and efficiently update user scores and broadcast real-time leaderboard changes. This document provides a comprehensive guide for the backend engineering team to implement and maintain a robust, scalable, and secure API service.

