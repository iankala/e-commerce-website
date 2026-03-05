# 🛍️ Forever — Full Stack E-Commerce Website

A complete, production-ready full-stack e-commerce web application built with the MERN stack and Stripe payment integration.

## Live Demo

🔗 [View Live](https://github.com/iankala/e-commerce-website)

## Screenshots

> Home Page | Collection | Cart | Checkout

## About

Forever is a fully functional online clothing store with a customer-facing storefront, an admin dashboard for inventory and order management, and a secure backend API. Users can browse collections, manage their cart, authenticate securely, and complete purchases via Stripe.

## Features

- 🏠 Home, Collection, About, and Contact pages
- 🔍 Product search and filtering by category
- 🛒 Shopping cart with real-time item count
- 👤 User registration and login with JWT authentication
- 💳 Secure checkout with Stripe payment processing
- 📦 Order tracking and history
- 🛠️ Admin dashboard — add, edit, and delete products; manage orders
- 📱 Fully responsive design across all devices

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt
- Stripe API
- Multer (image uploads)
- Cloudinary (image storage)

## Project Structure

```
e-commerce-website/
├── frontend/               # Customer-facing React app
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProductCard, SearchBar
│   │   ├── pages/          # Home, Collection, Product, Cart, Orders
│   │   └── context/        # ShopContext — global cart and user state
│   └── vite.config.js
│
├── backend/                # Node.js REST API
│   ├── controllers/        # Product, order, user, cart logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── middleware/         # Auth middleware
│   └── server.js
│
└── admin/                  # Admin dashboard (React)
    ├── src/
    │   ├── components/     # Sidebar, Navbar
    │   └── pages/          # Add Item, List Items, Orders
    └── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Stripe account](https://stripe.com) for payment keys
- [Cloudinary account](https://cloudinary.com) for image storage

### 1. Clone the repository

```bash
git clone https://github.com/iankala/e-commerce-website.git
cd e-commerce-website
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=your_admin_password
```

Start the server:

```bash
npm start
```

Backend runs on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Admin Dashboard Setup

```bash
cd admin
npm install
npm run dev
```

Admin runs on `http://localhost:5174`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register new user |
| POST | `/api/user/login` | Login user |
| GET | `/api/product/list` | Get all products |
| POST | `/api/product/add` | Add product (admin) |
| DELETE | `/api/product/remove` | Remove product (admin) |
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/cart/get` | Get user cart |
| POST | `/api/order/place` | Place order with Stripe |
| GET | `/api/order/userorders` | Get user orders |
| GET | `/api/order/list` | Get all orders (admin) |

## Environment Variables

Never commit your `.env` file. Ensure your `.gitignore` includes:

```
node_modules/
.env
dist/
```

## Author

**Ian Kala** — [GitHub](https://github.com/iankala)

