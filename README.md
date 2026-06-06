# Expense Tracker API

Project from [roadmap.sh](https://roadmap.sh/projects/expense-tracker-api)

A REST API for tracking personal expenses with user authentication.

## Tech Stack
- Node.js + Express
- MySQL
- JWT Authentication
- bcrypt password hashing

## How to Run

1. Clone the repo:
   git clone https://github.com/SANJAY23CB50/expens-tracker.git
   cd expens-tracker

2. Install dependencies:
   npm install

3. Create a .env file in the root folder:
   PORT=3000
   DB_HOST=localhost
   DB_USER=expense_user
   DB_PASSWORD=expense123
   DB_NAME=expense_tracker
   JWT_SECRET=mysecretkey123

4. Set up MySQL database and run these queries:
   CREATE DATABASE IF NOT EXISTS expense_tracker;
   USE expense_tracker;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(150) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE expenses (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     title VARCHAR(150) NOT NULL,
     amount DECIMAL(10,2) NOT NULL,
     category ENUM('Groceries','Leisure','Electronics','Utilities','Clothing','Health','Others') NOT NULL,
     expense_date DATE NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );

5. Start the server:
   npm run dev

6. Test with Thunder Client or Postman at:
   http://localhost:3000

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/signup | Register new user |
| POST | /auth/login | Login, returns JWT token |

### Expenses (add JWT token in Authorization: Bearer header)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /expenses | Get all expenses |
| GET | /expenses?range=week | Past week |
| GET | /expenses?range=month | Past month |
| GET | /expenses?range=3months | Past 3 months |
| GET | /expenses?start=YYYY-MM-DD&end=YYYY-MM-DD | Custom range |
| POST | /expenses | Add expense |
| PUT | /expenses/:id | Update expense |
| DELETE | /expenses/:id | Delete expense |

## Categories
Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others

## Project Reference
https://roadmap.sh/projects/expense-tracker-api
