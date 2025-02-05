# Employee Management API

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Start the server](#start-the-server)
  - [API Endpoints](#api-endpoints)
- [Database Management](#database-management)

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 2222.x)
- MySQL
- npm or yarn

### Clone the Repository
```sh
git clone https://github.com/NatswarChuan/vu-minh-chuan.git
cd vu-minh-chuan/problem5
```

### Install Dependencies
```sh
npm install
```

---

## Configuration

### Setup Environment Variables
Create a `.env` file in the root directory and configure your database connection:
```
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
PORT=3000
```

Replace `user`, `password`, and `database_name` with your MySQL credentials.

---

## Usage

### Start the Server

#### Development Mode (with auto-reload)
```sh
npm run dev
```

#### Production Mode
```sh
npm run build
npm start
```

---

## Database Management

### Apply Database Schema
```sh
npm run db:push
```

### Generate Prisma Client
```sh
npm run generate
```

---

## API Endpoints

### Create an Employee (POST)
```http
POST http://127.0.0.1:3000/employees/
Content-Type: application/json

{
  "employee_name": "Nguyễn Văn A",
  "employee_email": "naaa@gmail.com",
  "employee_age": "30"
}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "naaa@gmail.com",
    "age": 30,
    "updated_at": "2025-02-05T09:46:46.390Z",
    "created_at": "2025-02-05T09:46:46.390Z"
  }
}
```

**Response DTO Explanation:**
- `id`: Unique identifier for the employee.
- `name`: Full name of the employee.
- `email`: Email address of the employee.
- `age`: Age of the employee.
- `updated_at`: Timestamp of the last update.
- `created_at`: Timestamp of when the employee record was created.

### Get Employees with Filters (GET)
```http
GET http://127.0.0.1:3000/employees?name=Nguyễn&email=nva@gmail.com&sort_by=employee_age&order=asc&page=1&page_size=10
```
**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Nguyễn Văn A",
      "email": "naaa@gmail.com",
      "age": 30,
      "updated_at": "2025-02-05T09:46:46.390Z"
    }
  ]
}
```

**Response DTO Explanation:**
- `status`: API response status.
- `data`: List of employees matching the filters.
- `id`, `name`, `email`, `age`, `updated_at`: As explained above.

### Get Employee by ID (GET)
```http
GET http://127.0.0.1:3000/employees/{id}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "naaa@gmail.com",
    "age": 30,
    "updated_at": "2025-02-05T09:46:46.390Z"
  }
}
```

**Response DTO Explanation:**
- Similar to the list endpoint but returns a single employee.

### Update Employee Details (PUT)
```http
PUT http://127.0.0.1:3000/employees/{id}
Content-Type: application/json

{
  "employee_name": "Nguyễn Văn B",
  "employee_email": "nvb@gmail.com",
  "updated_at": "2025-02-05T09:46:46.390Z",
  "employee_age": "31"
}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Nguyễn Văn B",
    "email": "nvb@gmail.com",
    "age": 31,
    "updated_at": "2025-02-05T09:50:00.390Z",
    "created_at": "2025-02-05T09:46:46.390Z"
  }
}
```

**Response DTO Explanation:**
- Includes updated employee details.
- `updated_at` reflects the latest modification timestamp.

### Delete an Employee (DELETE)
```http
DELETE http://127.0.0.1:3000/employees/{id}
Content-Type: application/json

{
  "updated_at": "2025-02-05T09:47:20.497Z"
}
```
**Response:**
```json
{
  "status": "success",
  "data": null
}
```

**Response DTO Explanation:**
- `data` is `null` since the record is deleted.
- `status` confirms the success of the operation.

---

## Additional API Endpoints

### Get Employees Sorted by Age (Ascending)
```http
GET http://127.0.0.1:3000/employees?sort_by=employee_age&order=asc
```

### Get Employees Sorted by Created Date (Descending)
```http
GET http://127.0.0.1:3000/employees?sort_by=created_at&order=desc
```

### Get Employees with Multiple Sorting Fields
```http
GET http://127.0.0.1:3000/employees?sort_by=employee_name,employee_age&order=asc,asc&page=1&page_size=10
```

### Get Employees Filtered by Email and Age
```http
GET http://127.0.0.1:3000/employees?email=nva@gmail.com&employee_age=30&page=1&page_size=10
```

