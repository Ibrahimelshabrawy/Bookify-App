# 📚 Bookify App Backend API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Redis](https://img.shields.io/badge/Redis-Caching-red)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

---

## 🚀 Overview

Bookify is a production-ready backend API for a book management application. It provides secure user authentication, book CRUD operations, favorites management, reading progress tracking, notes support, and file uploads for book cover images and PDFs.

Built with Node.js, Express, MongoDB, Redis, and Cloudinary, this backend is designed to support a modern book-reading experience with fast caching and media handling.

---
## 🎥 Demo Video

Watch the full Bookify App demo here:

[▶️ Watch Bookify App Demo](https://drive.google.com/file/d/12QFJf1gEoTCZ4ei2AySdwaZDR0E3PLj2/view?usp=sharing)

---

## 🔧 Key Features

- User signup and login with JWT authentication
- Secure logout with token invalidation
- Add, edit, retrieve, and remove books
- Upload book cover images and PDF files
- Manage favorite books
- Track reading progress per book
- Add, update, and delete reading notes
- Centralized validation and error handling
- Redis support for caching and token revocation
- Cloudinary support for media uploads
- Static file serving for uploaded content

---

## 🧱 Tech Stack

- Node.js 24.12.0
- Express 5
- MongoDB with Mongoose
- Redis
- Cloudinary
- JSON Web Tokens (JWT)
- Joi validation
- Multer file uploads
- Nodemailer (dependency available)

---

## 📂 Project Structure

```
Bookify App
│
├── config
│   ├── config.service.js
│   ├── development.env
│   └── production.env
├── src
│   ├── common
│   │   ├── middleware
│   │   ├── utils
│   │   ├── DB
│   │   └── ...
│   ├── modules
│   │   ├── Auth
│   │   ├── books
│   │   ├── favorites
│   │   ├── progress
│   │   ├── home
│   │   └── Notes
│   ├── app.controller.js
│   └── index.js
├── uploads
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file or use the environment files in `config/` with the following keys:

- `PORT`
- `SALT_ROUND`
- `DB_URI`
- `DB_URI_ONLINE`
- `ENCRYPT_SECRET_KEY`
- `ACCESS_SECRET_KEY`
- `REDIS_URI`
- `EMAIL`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`

> The project loads environment values from `config/development.env` or `config/production.env` depending on `NODE_ENV`.

---

## 🌍 Deployment

This project is deployed and available in production.

Live URL: http://13.219.191.61  
Confirm production environment variables are configured properly

---

## 🚀 Installation

```bash
git clone https://github.com/Ibrahimelshabrawy/Bookify-App.git
cd "Articulearn Project"
npm install
```

## ▶️ Running the Project

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run start:prod
```

---

## 🌐 API Endpoints

### Authentication

- `POST /auth/signup`
  - Create a new user account
  - Body: `firstName`, `lastName`, `email`, `password`, `bio`

- `POST /auth/signin`
  - Sign in and receive an access token
  - Body: `email`, `password`

- `POST /auth/logout`
  - Invalidate the current JWT or all sessions
  - Query: `flag=all` to logout from all sessions
  - Requires `Authorization: Bearer <token>`

### Users

- `GET /users/profile`
  - Get the authenticated user profile
  - Requires `Authorization: Bearer <token>`

- `PATCH /users/update-profile`
  - Update profile fields for authenticated user
  - Requires `Authorization: Bearer <token>`

- `DELETE /users/delete-profile`
  - Delete the authenticated user account
  - Requires `Authorization: Bearer <token>`

### Books

- `POST /books/add-book`
  - Add a new book
  - Requires authentication
  - File uploads: `image`, `pdf`

- `PATCH /books/edit-book/:id`
  - Edit book metadata by book ID
  - Requires authentication

- `GET /books/:id`
  - Get a single book by ID
  - Requires authentication

- `DELETE /books/:id`
  - Delete a book by ID
  - Requires authentication

- `GET /books`
  - Get books list with optional query filtering
  - Requires authentication

### Favorites

- `POST /favorites/add-to-favorites/:bookId`
  - Add a book to favorites
  - Requires authentication

- `DELETE /favorites/remove-from-favorites/:bookId`
  - Remove a book from favorites
  - Requires authentication

### Progress

- `POST /progress/create-progress/:bookId`
  - Create a reading progress record for a book
  - Requires authentication

- `PATCH /progress/update-progress/:bookId`
  - Update reading progress for a book
  - Requires authentication

### Home / Dashboard

- `GET /home/total-progress`
  - Get the total progress summary
  - Requires authentication

- `GET /home/favorites`
  - Get favorited books for the current user
  - Requires authentication

- `GET /home/currently-reading`
  - Get books currently being read
  - Requires authentication

### Notes

- `POST /note/add-note/:bookId`
  - Add a note for a book
  - Requires authentication

- `PATCH /note/update-note/:id`
  - Update a book note by note ID
  - Requires authentication

- `DELETE /note/delete-note/:id`
  - Delete a book note by note ID
  - Requires authentication

---

## 📌 Notes

- The server serves uploaded files from the `/uploads` directory.
- Requests that require authentication should include `Authorization: Bearer <token>`.
- Error handling is centralized through Express error middleware.

---

## 🧪 Development Notes

- The app uses `cross-env` for environment management.
- The production launch command uses `pm2` to run `src/index.js` in cluster mode.

---
