# 🔐 Secure Notes Management System

A full-stack Secure Notes Management application built using the MERN stack. The project focuses on implementing a production-style backend with JWT authentication, secure API design, CRUD operations, search, sorting, pagination, and protected routes.

The frontend provides a clean interface to interact with the backend APIs and was developed with AI-assisted guidance while the backend architecture, APIs, authentication, and database implementation were built and integrated by me.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Access Token Authentication
- Refresh Token Implementation
- Secure HTTP-only Cookies
- Protected Routes
- Logout Functionality

### Notes Management
- Create Notes
- Read Notes
- Update Notes
- Delete Notes
- Search Notes
- Sort Notes
- Pagination
- Pin / Unpin Notes

### Security
- Password Hashing using bcrypt
- JWT Authentication
- Route Protection Middleware
- Cookie-based Authentication
- User-specific Notes Access

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser

### Frontend
- React
- React Router
- Axios
- Tailwind CSS

---

# Project Structure

```
Secure-Notes-Management/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── App.jsx
```

---

# Backend Highlights

## Authentication Flow

- Register User
- Login User
- Generate Access Token
- Generate Refresh Token
- Store Refresh Token
- Verify JWT Middleware
- Logout
- Protected APIs

---

## Notes APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/notes/createnote` | Create Note |
| GET | `/api/v1/notes/getallnotes` | Get All Notes |
| GET | `/api/v1/notes/:id` | Get Note by ID |
| PUT | `/api/v1/notes/:id` | Update Note |
| DELETE | `/api/v1/notes/:id` | Delete Note |
| PATCH | `/api/v1/notes/:id/pin` | Pin / Unpin Note |

---

## Additional Backend Features

- MVC Architecture
- RESTful API Design
- User Authorization
- Error Handling
- Request Validation
- Pagination
- Sorting
- Search using MongoDB Regular Expressions
- Protected Middleware
- Secure Cookie Authentication

---

# Installation

## Clone Repository

```bash
git clone https://github.com/hardiktak11-hub/Secure-Notes-Management.git
```

## Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=YOUR_MONGODB_URI

ACCESS_TOKEN_SECRET=YOUR_SECRET
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=YOUR_SECRET
REFRESH_TOKEN_EXPIRY=7d
```

Run backend

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Screenshots

_Add screenshots here after deployment._

---

# Learning Outcomes

This project helped me gain practical experience with:

- Building REST APIs
- JWT Authentication
- Refresh Token Flow
- Secure Cookie Authentication
- MongoDB Querying
- Mongoose Relationships
- Express Middleware
- MVC Architecture
- CRUD Operations
- API Integration with React

---

# Frontend Note

The frontend was developed with AI-assisted guidance to rapidly build a functional user interface while allowing me to focus on implementing and integrating the backend architecture, authentication flow, API design, and database operations. All backend logic, REST APIs, authentication, and database integration were implemented and tested by me.

---

# Future Improvements

- Rich Text Editor
- File Attachments
- Dark Mode
- Tags & Categories
- Note Sharing
- Favorites
- Real-time Collaboration
- Deployment with Docker

---

# Author

**Hardik Tak**

B.Tech Computer Science Engineering

GitHub: https://github.com/hardiktak11-hub
