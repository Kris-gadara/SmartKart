import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CustomerDashboard.css';

const staticProducts = [
  {
    _id: "1",
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with long battery life.",
    price: 4999,
    image: "https://tse2.mm.bing.net/th/id/OIP.SffqYZMvcu0dWfUxRaP-PAHaJa?pid=Api&P=0&h=180"
  },
  {
    _id: "2",
    name: "Smartwatch",
    description: "Fitness tracking smartwatch with customizable watch faces.",
    price: 2999,
    image: "https://tse4.mm.bing.net/th/id/OIP.59wH81I3_UhiJAdPellmFgHaIT?pid=Api&P=0&h=180"
  },
  {
    _id: "3",
    name: "Tablet",
    description: "10-inch Android tablet with powerful performance and battery life.",
    price: 8999,
    image: "https://tse3.mm.bing.net/th/id/OIP.29PGs88vphVAyEPSjIMHZQHaHa?pid=Api&P=0&h=180"
  },
  {
    _id: "4",
    name: "Laptop",
    description: "High-performance laptop suitable for gaming and productivity.",
    price: 39999,
    image: "https://tse1.mm.bing.net/th/id/OIP.QPr-7VIYnNIGsWgVi8nz6QHaHa?pid=Api&P=0&h=180"
  },
  {
    _id: "5",
    name: "Smartphone",
    description: "Latest-gen smartphone with a stunning AMOLED display and fast charging.",
    price: 25999,
    image: "https://tse2.mm.bing.net/th/id/OIP.x0yL_-t9Z0u3eeKoaNEI0wHaHd?pid=Api&P=0&h=180"
  }
];

function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(staticProducts);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = staticProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Discover Amazing Electronics</h2>
        <p>Find the latest gadgets and cutting-edge technology</p>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search terms or browse all products</p>
            <button onClick={() => setSearchQuery('')} className="clear-search-btn">
              Clear Search
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                  }}
                />
                <div className="product-overlay">
                  <button
                    className="add-to-cart-btn-overlay"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <p className="product-price">₹{product.price.toLocaleString()}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
