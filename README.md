# Online Gas Booking System

This is a client-facing online gas booking system that allows them to book gas barrels whenever they need them. Instead of using the traditional way of obtaining gas barrels over the phone, customers can now easily arrange for them and even make payments.

## Features

- User and Admin Accounts
- User registration
- Payment options for users include cash on delivery and Paytm QR codes.
- Booking a Cylinder
- My Booking History
- Email notifications

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Prerequisites

- Node.js
- MongoDB

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/gas-agency.git
   ```

2. **Install server dependencies:**

   ```bash
   cd gas-agency
   npm install
   ```

3. **Install client dependencies:**

   ```bash
   cd client
   npm install
   ```

4. **Create a `config.env` file in the root directory and add the following:**

   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d

   # Email settings (for nodemailer)
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   FROM_EMAIL=your_from_email
   FROM_NAME=Gas Agency
   ```

5. **Run the application:**

   - **Start the backend server:**

     ```bash
     npm start
     ```

   - **Start the frontend application:**

     ```bash
     cd client
     npm start
     ```

## Test Cases

- **User Registration:**
  - A new user should be able to register with a unique email.
  - A user should not be able to register with an existing email.
- **User Login:**
  - A registered user should be able to login with correct credentials.
  - A user should not be able to login with incorrect credentials.
- **Cylinder Booking:**
  - A logged-in user should be able to book a cylinder.
  - A user with 0 remaining barrels should not be able to book a regular cylinder.
- **Admin:**
  - An admin should be able to view all users and bookings.
  - An admin should be able to approve or reject pending bookings.
  - An admin should be able to create notices.

## Logging

Logs are stored in the `logs` directory.

- `error.log`: Contains only error logs.
- `combined.log`: Contains all logs.
