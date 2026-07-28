# 📝 Secure Notes Management

A full-stack **MERN** application that allows users to securely manage their personal notes with **JWT Authentication**, **Refresh Tokens**, **Protected Routes**, and a modern React frontend.

## 🚀 Live Demo

- 🌐 **Frontend:** https://secure-notes-management.vercel.app
- ⚙️ **Backend API:** https://secure-notes-management.onrender.com
- 📂 **GitHub Repository:** https://github.com/hardiktak11-hub/Secure-Notes-Management

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- Secure JWT Authentication
- Refresh Token Authentication
- Logout
- Protected Routes
- HTTP-Only Cookies
- Password Hashing using bcrypt

### 📝 Notes Management
- Create Notes
- Read Notes
- Update Notes
- Delete Notes
- Pin / Unpin Notes
- Search Notes
- Pagination
- Sort by Newest / Oldest
- User-specific Notes (Each user only accesses their own notes)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Context API
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📁 Project Structure

```
Secure-Notes-Management
│
├── frontend
│   ├── src
│   │   ├── component
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── src
│   ├── config
│   ├── controllers
│   ├── db
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── app.js
│
├── package.json
└── README.md
```

---

## 🔑 Authentication Flow

1. User registers.
2. Password is securely hashed using bcrypt.
3. User logs in.
4. Backend generates:
   - Access Token
   - Refresh Token
5. Tokens are stored as HTTP-Only Cookies.
6. Protected APIs verify JWT before allowing access.
7. Refresh Token generates new Access Tokens when required.

---

## 📌 REST API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/users/register` | Register User |
| POST | `/api/v1/users/login` | Login |
| POST | `/api/v1/users/logout` | Logout |
| POST | `/api/v1/users/refresh-token` | Refresh Access Token |
| GET | `/api/v1/users/current-user` | Get Current User |

---

### Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/notes` | Create Note |
| GET | `/api/v1/notes` | Get All Notes |
| GET | `/api/v1/notes/:id` | Get Note by ID |
| PUT | `/api/v1/notes/:id` | Update Note |
| DELETE | `/api/v1/notes/:id` | Delete Note |
| PATCH | `/api/v1/notes/:id/pin` | Pin / Unpin Note |

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file:

```env
PORT=10000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_EXPIRY=7d

NODE_ENV=production
```

---

### Frontend

```env
VITE_API_URL=https://secure-notes-management.onrender.com/api/v1
```

---

## 💻 Installation

### Clone Repository

```bash
git clone https://github.com/hardiktak11-hub/Secure-Notes-Management.git
```

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Screenshots

### Login Page

*(Add Screenshot)*

### Dashboard

*(Add Screenshot)*

### Create Note

*(Add Screenshot)*

---

## 🌟 Future Improvements

- Dark Mode
- Rich Text Editor
- Note Categories
- File Attachments
- Share Notes
- Email Verification
- Forgot Password
- Profile Management
- Note Archive
- Trash Bin

---

## 👨‍💻 Author

**Hardik Tak**

- GitHub: https://github.com/hardiktak11-hub
- LinkedIn: *(Add LinkedIn URL)*

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
