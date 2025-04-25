# Notes App API

A RESTful API for managing users and notes with authentication.

## Setup

1. Install dependencies:
```sh
npm install
```

2. Create `.env` file with:
```
PORT=<port_number>
DB_URL=<mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

3. Start the server:
```sh
node src/index.js
```

## API Endpoints

### User Routes

#### Register User
- **POST** `/api/user/registerUser`
- **Body:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```
- **Returns:** User object and JWT token

#### Login User 
- **POST** `/api/user/loginUser`
- **Body:**
```json
{
    "email": "string", 
    "password": "string"
}
```
- **Returns:** User object and JWT token

### Notes Routes
All notes routes require Authentication header: `Bearer <token>`

#### Create Note
- **POST** `/api/notes/createNote`
- **Body:**
```json
{
    "title": "string",
    "content": "string",
    "tags": ["string"]
}
```

#### Get All Notes
- **GET** `/api/notes/getAllNotes`
- **Returns:** Array of note objects

#### Update Note
- **PUT** `/api/notes/updateNote/:noteId`
- **Body:** Fields to update
```json
{
    "title": "string",
    "content": "string",
    "tags": ["string"]
}
```

#### Delete Note
- **DELETE** `/api/notes/deleteNote/:noteId`

## Models

### User
- name: String (required)
- email: String (required, unique)
- password: String (required)
- notes: Array of note references

### Note
- user: Reference to User
- title: String (required)
- content: String
- tags: Array of strings
- timestamps: true