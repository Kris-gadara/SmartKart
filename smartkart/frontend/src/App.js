import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import CustomerLogin from './pages/CustomerLogin';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerProfile from './pages/CustomerProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import EditProduct from './pages/EditProduct';
import AdminRegister from './pages/AdminRegister';
import { CartProvider } from './context/CartContext';
import { CustomerProtectedRoute, AdminProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            
            <Route path="/dashboard" element={
              <CustomerProtectedRoute>
                <CustomerDashboard />
              </CustomerProtectedRoute>
            } />
            <Route path="/profile" element={
              <CustomerProtectedRoute>
                <CustomerProfile />
              </CustomerProtectedRoute>
            } />
            <Route path="/cart" element={
              <CustomerProtectedRoute>
                <Cart />
              </CustomerProtectedRoute>
            } />
            <Route path="/checkout" element={
              <CustomerProtectedRoute>
                <Checkout />
              </CustomerProtectedRoute>
            } />

            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/products/add" element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <AdminProtectedRoute>
                <ManageProducts />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/products/edit/:id" element={
              <AdminProtectedRoute>
                <EditProduct />
              </AdminProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App; 