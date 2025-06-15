# 🛒 E-Commerce MERN Project

A full-featured E-Commerce web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project includes features like product management, user authentication, shopping cart, order processing, Stripe payments, and admin panel controls.

---

## 📸 Screenshots

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
---


## 🔧 Features

### 👤 User Features
- User registration and login with JWT
- Update user profile (name, email, password)
- Browse products and view product details
- Add/remove products to/from shopping cart
- Place orders and pay via Stripe
- View order history and download invoices
- Submit and view product reviews

### 🛍️ Admin Features
- Admin dashboard overview
- Manage users (list, edit, delete)
- Manage products (create, update, delete)
- Manage orders (view, mark as delivered)
- View all submitted reviews

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js with Hooks
- Redux Toolkit for state management
- Tailwind CSS for UI design
- Axios for API requests
- React Router for routing
- React Icons and React Toastify

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Stripe API for payment integration
- Cloudinary for image uploads
- Multer for handling file uploads

---

## 📁 Folder Structure

```
├── client/               # Frontend (React)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── ...
├── api/                  # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   └── ...
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/hafiz1379/E-Commerce-With-MERN
cd mern-ecommerce
```

### 2. Setup Backend
```bash
cd api
npm install
```

Create a `.env` file in the `api/` folder:
```env
PORT=8000
NODE_ENV=development
DB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Start backend server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` folder:
```env
VITE_API_URL=http://localhost:8000/api
```

Start frontend server:
```bash
npm run dev
```

---

## 📦 Deployment

You can deploy the app using:
- **Render** for backend (Node.js server)
- **Vercel** or **Netlify** for frontend (React + Vite)

Don't forget to configure environment variables on your deployment platforms.

---

## 🙌 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request for improvements or bug fixes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

Created by **Hafizullah Rasa**  
📫 Email: hafizrasa1379@gmail.com
🌐 Portfolio: https://hafiz1379.github.io/Portfolio/
