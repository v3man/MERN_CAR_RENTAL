<div align="center">
  <h1>🚗 MERN CAR RENTAL</h1>
  <p>A full-stack premium car rental platform built with the MERN stack (MongoDB, Express, React, Node.js).</p>
</div>

---

## 📖 Overview

**MERN CAR RENTAL** (internally "First Class") is a luxurious, highly-responsive web application designed to handle the end-to-end flow of a premium car rental service. It features a complete user booking system, a robust admin dashboard for managing inventory and customer support, secure JWT authentication, and beautiful tailored UI components built with Tailwind CSS.

## ✨ Key Features

### 👤 User Features:
- **Authentication:** Secure Signup, Login, and Logout flows powered by JWT and bcrypt.
- **Search & Filter:** Browse luxury vehicles by city, dates, and brand.
- **Dynamic Booking System:** Real-time date selection to prevent double bookings.
- **User Dashboard:** Dedicated page (`/my-bookings`) to view and manage active bookings.
- **Responsive UI:** Glassmorphism navigation, smooth scroll animations, and premium hover effects.

### 🛡️ Admin Features:
- **Vehicle Fleet Management:** Add, edit, and delete car listings with image uploads.
- **Booking Management:** View all user reservations, track monetary volume, and confirm/cancel bookings.
- **Support Inbox:** Integrated support ticket system to handle user queries from the localized Contact Page.
- **Analytics Dashboard:** At-a-glance KPI metrics for total fleet size, monthly revenue, and active bookings.

---

## 🛠️ Technology Stack

**(M) MongoDB** - NoSQL Database for flexible, scalable data storage (Mongoose ODM).
**(E) Express.js** - Fast, unopinionated backend web framework for REST API routing.
**(R) React.js** - Frontend UI library using Vite, React Router, and React Context API.
**(N) Node.js** - JavaScript runtime environment for the backend server.

**Styling & UI:** Tailwind CSS, React Hot Toast
**Security:** Helmet, express-mongo-sanitize, express-rate-limit, express-validator

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your machine.
You will also need a [MongoDB Atlas](https://www.mongodb.com/atlas/database) URI (or a local MongoDB instance).

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/mern-car-rental.git
cd mern-car-rental
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and configure the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
```
Start the Vite development server:
```bash
npm run dev
```

The application should now be running on `http://localhost:5173`!

---

## 📐 Folder Structure

```
mern-car-rental/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── api/            # Axios configurations
│   │   ├── assets/         # Images and SVGs
│   │   ├── components/     # Reusable UI components (Navbar, CarCard, etc.)
│   │   ├── context/        # React Context (AuthContext)
│   │   └── pages/          # Full page views (Home, Login, Admin Dashboard)
│   └── tailwind.config.js
│
├── server/                 # Node/Express Backend
│   ├── config/             # DB & Imagekit connections
│   ├── controllers/        # Business logic for routes
│   ├── middleware/         # Auth, Error handlers, Validators
│   ├── models/             # Mongoose schemas (User, Car, Booking)
│   └── routes/             # Express API endpoints
│
└── .gitignore
```

---

## 🔒 Security Measures
This project implements strict modern backend security:
- **Helmet.js** for securing HTTP headers.
- **Express Rate Limiting** to prevent brute-force attacks on authentication routes.
- **Express Mongo Sanitize** wrapper to actively drop malicious NoSQL injection attempts.
- **Express Validator** for strict input sanitization and payload validation.
- **Bcrypt.js** hash salt encryption for all user passwords.

---

## 📜 License
This project is for educational and portfolio purposes.
