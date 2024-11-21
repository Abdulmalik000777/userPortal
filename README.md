markdown
# UserPortal

UserPortal is a user management system that allows for registration, login, and user management actions such as blocking, unblocking, and deleting users.

## Features

- **User Registration**: Register new users with name, email, and password.
- **User Login**: Authenticate users and generate a JSON Web Token (JWT).
- **Block Users**: Block users by their IDs.
- **Unblock Users**: Unblock users by their IDs.
- **Delete Users**: Delete users by their IDs.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)
- [MySQL](https://www.mysql.com/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/userPortal.git
cd userPortal
Install Dependencies
bash
npm install
Configure the Environment Variables
Create a .env file in the root directory and add the following configuration:

env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=MysqllocaluserPortal
DB_PORT=3306
JWT_SECRET=your_jwt_secret
PORT=3000
Set Up the Database
Make sure you have MySQL installed and running. Create the database and required table by running the SQL script provided in database_setup.sql or following the steps to run individual queries.

Running the Server
bash
npm start
This will start the server on port 3000 by default.

API Endpoints
Register a User
http
POST /api/users/register
Request Body:

json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
Response:

json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "status": "active",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
Login a User
http
POST /api/users/login
Request Body:

json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
Response:

json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "status": "active",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
Block Users
http
PATCH /api/users/block
Headers:

json
{
  "Authorization": "Bearer jwt_token_here"
}
Request Body:

json
{
  "ids": [1, 2]
}
Response:

json
{
  "message": "Users blocked successfully"
}
Unblock Users
http
PATCH /api/users/unblock
Headers:

json
{
  "Authorization": "Bearer jwt_token_here"
}
Request Body:

json
{
  "ids": [1, 2]
}
Response:

json
{
  "message": "Users unblocked successfully"
}
Delete Users
http
DELETE /api/users/delete
Headers:

json
{
  "Authorization": "Bearer jwt_token_here"
}
Request Body:

json
{
  "ids": [1, 2]
}
Response:

json
{
  "message": "Users deleted successfully"
}
Running Tests
bash
npm test
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Express.js

Sequelize

MySQL

JWT
