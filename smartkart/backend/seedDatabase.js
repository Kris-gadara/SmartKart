import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import bcrypt from 'bcryptjs';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Sample products data
const products = [
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with long battery life.",
    price: 4999,
    image: "https://tse2.mm.bing.net/th/id/OIP.SffqYZMvcu0dWfUxRaP-PAHaJa?pid=Api&P=0&h=180"
  },
  {
    name: "Smartwatch",
    description: "Fitness tracking smartwatch with customizable watch faces.",
    price: 2999,
    image: "https://tse4.mm.bing.net/th/id/OIP.59wH81I3_UhiJAdPellmFgHaIT?pid=Api&P=0&h=180"
  },
  {
    name: "Tablet",
    description: "10-inch Android tablet with powerful performance and battery life.",
    price: 8999,
    image: "https://tse3.mm.bing.net/th/id/OIP.29PGs88vphVAyEPSjIMHZQHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Laptop",
    description: "High-performance laptop suitable for gaming and productivity.",
    price: 39999,
    image: "https://tse1.mm.bing.net/th/id/OIP.QPr-7VIYnNIGsWgVi8nz6QHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Smartphone",
    description: "Latest-gen smartphone with a stunning AMOLED display and fast charging.",
    price: 25999,
    image: "https://tse2.mm.bing.net/th/id/OIP.x0yL_-t9Z0u3eeKoaNEI0wHaHd?pid=Api&P=0&h=180"
  }
];

// Admin user data
const adminUser = {
  name: "Admin User",
  email: "admin@smartkart.com",
  phone: "9876543210",
  password: "admin123",
  role: "admin"
};

// Seed database function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    console.log('Products collection cleared');
    
    // Add products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products added`);
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (!existingAdmin) {
      // Hash admin password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);
      
      // Create admin user
      const admin = await User.create({
        ...adminUser,
        password: hashedPassword
      });
      
      console.log('Admin user created:', admin.email);
    } else {
      console.log('Admin user already exists');
    }
    
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();