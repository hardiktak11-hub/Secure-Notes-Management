# 🔐 Secure Notes Management

A full-stack **MERN** application for securely creating and managing personal notes, built with a production-style backend: JWT authentication, refresh-token rotation, HTTP-only cookies, and a REST API consumed by a React frontend.

**Live:** [Frontend](https://secure-notes-management.vercel.app) · [Backend API](https://secure-notes-management.onrender.com) · [Repository](https://github.com/hardiktak11-hub/Secure-Notes-Management)

> ⚠️ The backend is hosted on Render's free tier and spins down after inactivity — the first request after idle time may take 30–50s to respond.

---

## Overview

Secure Notes Management lets users register, log in, and manage a private set of notes — each user can only access their own data. The project was built to practice production backend patterns (auth flow, ownership-scoped queries, MVC architecture) rather than just CRUD scaffolding.

The backend — API design, authentication, database schema, and integration — was designed and implemented independently. The frontend UI was built with AI-assisted scaffolding to move quickly, while the API integration and app logic were implemented and tested by me.

---

## Features

**Authentication**
- User registration & login
- JWT access + refresh token flow, with refresh-token rotation
- HTTP-only cookie-based session handling
- Password hashing with bcrypt
- Protected routes via auth middleware
- Logout with token invalidation

**Notes Management**
- Full CRUD (create, read, update, delete)
- Pin / unpin notes
- Search notes (MongoDB regex-based)
- Sort by newest / oldest
- Pagination
- User-scoped access — notes are only visible to their owner

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, React Router DOM, Axios, Context API, CSS |
| Backend | Node.js, Express.js, JWT, bcrypt, cookie-parser, CORS |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Vercel (frontend) · Render (backend) · MongoDB Atlas (database) |

---

## Architecture

```
Secure-Notes-Management/
│
├── frontend/
│   ├── src/
│   │   ├── component/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── app.js
│
├── package.json
└── README.md
```

MVC architecture on the backend, with route-level middleware enforcing authentication and resource ownership before any controller logic runs.

---

## Authentication Flow

1. User registers → password is hashed with bcrypt before storage.
2. User logs in → backend issues a short-lived **access token** and a longer-lived **refresh token**.
3. Both tokens are set as **HTTP-only cookies**, inaccessible to client-side JS (mitigates XSS token theft).
4. Protected routes verify the access token via middleware before processing any request.
5. When the access token expires, the refresh token endpoint issues a new one without requiring re-login.
6. Logout clears both cookies and invalidates the session.

---

## API Reference

**Auth** — `/api/v1/users`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate and receive tokens |
| POST | `/logout` | Invalidate session |
| POST | `/refresh-token` | Issue a new access token |
| GET | `/current-user` | Get the authenticated user's profile |

**Notes** — `/api/v1/notes` *(all routes protected, scoped to the authenticated user)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create a note |
| GET | `/` | Get all notes (supports search, sort, pagination) |
| GET | `/:id` | Get a single note by ID |
| PUT | `/:id` | Update a note |
| DELETE | `/:id` | Delete a note |
| PATCH | `/:id/pin` | Pin or unpin a note |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- A MongoDB Atlas connection string (or local MongoDB instance)

### Clone

```bash
git clone https://github.com/hardiktak11-hub/Secure-Notes-Management.git
cd Secure-Notes-Management
```

### Backend

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=10000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=development
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:10000/api/v1
```

```bash
npm run dev
```

---

## Security Notes

- Passwords are never stored in plaintext — hashed with bcrypt before persistence.
- Tokens are stored in HTTP-only cookies rather than `localStorage`, reducing XSS exposure.
- Refresh tokens rotate on use, limiting the blast radius of a leaked token.
- All note routes are ownership-scoped at the query level — one user cannot read or modify another user's notes, even with a guessed ID.
- CORS is configured to only accept requests from the deployed frontend origin in production.

---

## Roadmap

- [ ] Rich text editor for notes
- [ ] File attachments
- [ ] Tags & categories
- [ ] Note sharing between users
- [ ] Email verification
- [ ] Forgot / reset password flow
- [ ] Archive & trash bin (soft delete)
- [ ] Dark mode
- [ ] Docker-based deployment

---

## Author

**Hardik Tak**
B.Tech Computer Science Engineering
[GitHub](https://github.com/hardiktak11-hub)

---

If this project is useful to you, consider giving it a ⭐ on GitHub.

