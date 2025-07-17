import fs from 'fs';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

// Ensure upload folder exists only if using local file upload (optional)
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    console.error('❌ Error Fetching Products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products.' });
  }
};

// ✅ GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID format.' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ✅ ADD PRODUCT (with image URL instead of file)
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image, // direct URL string from frontend
    });

    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('❌ Error Adding Product:', error.message);
    res.status(500).json({ success: false, message: 'Error adding product.' });
  }
};

// ✅ UPDATE PRODUCT (support image URL)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        image: image || product.image, // support URL-based images
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('❌ Error Updating Product:', error.message);
    res.status(500).json({ success: false, message: 'Error updating product.' });
  }
};

// ✅ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({ success: true, message: 'Product deleted successfully!' });
  } catch (error) {
    console.error('❌ Error Deleting Product:', error);
    res.status(500).json({ success: false, message: 'Error deleting product.' });
  }
};
