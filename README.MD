
# REST API

This is a REST API built with Node.js, Express, TypeScript and MongoDB. It provides endpoints for user management and authentication. 

## Features

- **User Management**:
  - Create a new user
  - Get user details by ID
  - Update user details
  - Delete a user

- **Authentication**:
  - Register a new user
  - Login and receive a session token
  - Protected routes requiring authentication

## Prerequisites

- Node.js (v18 or later)
- MongoDB

## Installation

1. **Clone the Repository**

 ```sh
  git clone https://github.com/Dushyantgoswami/REST-API
  cd REST-API/
 ```
 2. **Install Dependencies**
 ```
  npm install
 ```
2. **Create .env File**
```
cp .env.example .env
```
Update the .env file with your own values.

3. **Configure TypeScript**
```
npm install -g typescript
```

4. **Compile TypeScript**
```
tsc -b
```
5.**Start the Server**
```
node dist/index.js
```


# API Endpoints

##  User Management
- **GET /users** : Get all users
- **POST /auth/register** : Create a new user
- **PUT /users/:id** : Update a user by ID
- **DELETE /users/:id**: Delete a user by ID

## Authentication

**POST /auth/login**: Login and receive a session token


## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.
