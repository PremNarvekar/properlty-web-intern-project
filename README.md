# K Propertys — Luxury Real Estate Platform

A modern, full-stack luxury real estate web application built with **React**, **Node.js**, **Express**, and **MongoDB**. Features a stunning, minimal UI designed for high-end property listings with a powerful admin dashboard for content management.

---

## ✨ Features

### 🏠 Public Website
- **Hero Section** — Full-screen cinematic hero with dynamic background image and call-to-action
- **Info Section** — "Why Choose Us" section with animated image and statistics
- **Luxury Section** — Featured property grid with elegant card design
- **Property Detail Page** — Full property view with image gallery, specs, pricing card, and contact
- **Newsletter** — Email subscription section
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile

### 🔐 Admin Dashboard
- **Secure Authentication** — JWT-based login and registration
- **Property Management** — Full CRUD (Create, Read, Update, Delete) for property listings
- **Image Support** — Upload images via file or paste an image URL directly
- **Site Settings** — Edit Hero, Info, and Luxury section text, images, and content in real time
- **Live Preview** — Image URL preview before saving

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS        |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (Mongoose ODM)              |
| Auth       | JWT, bcryptjs                       |
| File Upload| Multer                              |
| Icons      | Lucide React                        |
| HTTP       | Axios                               |

---

## 📁 Project Structure

```
MegaPlexIntern/
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── src/
│   │   ├── controller/
│   │   │   ├── authController.js       # Login & Register
│   │   │   ├── adminController.js      # Media uploads
│   │   │   ├── adminPropertyController.js  # Property CRUD
│   │   │   └── settingsController.js   # Site settings
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js       # JWT verification
│   │   │   └── upload.js              # Multer config
│   │   ├── model/
│   │   │   ├── auth.model.js          # User schema
│   │   │   ├── Property.js            # Property schema
│   │   │   ├── SiteSettings.js        # Site settings schema
│   │   │   └── Media.js               # Media schema
│   │   └── routes/
│   │       ├── routes.js              # Auth routes
│   │       ├── adminPropertyRoutes.js # Property CRUD routes
│   │       ├── settingsRoutes.js      # Settings routes
│   │       └── userPropertyRoutes.js  # Public property routes
│   ├── app.js
│   ├── server.js
│   └── .env
│
├── Frontend/
│   └── src/
│       ├── components/
│       │   ├── home/
│       │   │   ├── Hero.jsx
│       │   │   ├── SearchFilter.jsx
│       │   │   ├── InfoSection.jsx
│       │   │   ├── LuxurySection.jsx
│       │   │   └── Newsletter.jsx
│       │   ├── layout/
│       │   │   ├── Navbar.jsx
│       │   │   └── Footer.jsx
│       │   └── shared/
│       │       └── PropertyCard.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── PropertyDetail.jsx
│       │   ├── AdminLogin.jsx
│       │   ├── AdminRegister.jsx
│       │   └── AdminDashboard.jsx
│       ├── router/
│       │   └── AppRouter.jsx
│       ├── services/
│       │   └── api.js
│       └── App.jsx
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (local or Atlas)
- **npm**

### 1. Clone the Repository

```bash
git clone https://github.com/PremNarvekar/property-web-intern.git
cd MegaPlexIntern
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend will start at **http://localhost:5173**

---

## 📖 API Endpoints

### Auth
| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | `/api/auth/register` | Register new admin|
| POST   | `/api/auth/login`    | Admin login       |

### Properties (Public)
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/properties`     | Get all properties   |
| GET    | `/api/property/:id`   | Get property by ID   |

### Properties (Admin)
| Method | Endpoint                  | Description         |
|--------|---------------------------|---------------------|
| POST   | `/api/admin/property`     | Add new property    |
| PUT    | `/api/admin/property/:id` | Update property     |
| DELETE | `/api/admin/property/:id` | Delete property     |
| GET    | `/api/admin/properties`   | Get all (admin)     |

### Site Settings
| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | `/api/settings`  | Get site settings    |
| PUT    | `/api/settings`  | Update site settings |

---

## 🎨 Design Philosophy

The UI follows a **minimalist luxury** design language:
- Clean typography with generous whitespace
- Glassmorphism effects on interactive elements
- Smooth micro-animations and hover transitions
- Neutral color palette (black, white, gray) with subtle gradients
- Responsive layout adapting seamlessly across devices

---

## 👨‍💻 Author

**Prem Narvekar**
- GitHub: [@PremNarvekar](https://github.com/PremNarvekar)

---

## 📄 License

This project is part of an internship assignment at MegaPlex.
