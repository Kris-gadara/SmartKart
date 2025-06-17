# SmartKart - E-commerce Platform

A full-stack e-commerce application built with React.js, Node.js, Express.js, and MongoDB. SmartKart provides a modern shopping experience with separate interfaces for customers and administrators.

## 🚀 Features

### Customer Features
- **User Authentication** - Secure login/register system
- **Product Browsing** - Browse and search products
- **Shopping Cart** - Add/remove items with real-time updates
- **Order Management** - View order history and status
- **User Profile** - Manage personal information
- **Responsive Design** - Works on all devices

### Admin Features
- **Admin Dashboard** - Overview of all orders
- **Product Management** - Add, edit, and delete products
- **Order Management** - Update order status
- **User Management** - View customer information

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface
- **React Router** - Navigation
- **CSS3** - Styling
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kris-gadara/SmartKart.git
   cd SmartKart
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd smartkart/backend && npm install
   cd ../frontend && npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `smartkart/backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/smartkart
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both servers:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

## 🔐 Default Admin Credentials

- **Email:** admin@smartkart.com
- **Password:** admin123

## 📁 Project Structure

```
SmartKart/
├── smartkart/
│   ├── backend/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   └── App.js
│       └── package.json
├── package.json
└── README.md
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 🎨 UI/UX Features

- **Modern Design** - Clean and intuitive interface
- **Responsive Layout** - Mobile-first approach
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages
- **Search Functionality** - Real-time product search

## 🔧 Development

### Running in Development Mode
```bash
# Start both servers
npm run dev

# Start backend only
npm run backend

# Start frontend only
npm run frontend
```

### Building for Production
```bash
cd smartkart/frontend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kris Gadara**
- GitHub: [@Kris-gadara](https://github.com/Kris-gadara)

## 🙏 Acknowledgments

- React.js community
- Node.js ecosystem
- MongoDB documentation
- All contributors and supporters

---

**SmartKart** - Your premium destination for cutting-edge electronics and smart devices. 🛒✨ 