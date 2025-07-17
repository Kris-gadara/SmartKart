import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderStatuses = ['Pending', 'Shipped', 'Delivered'];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Admin not authenticated.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch orders' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else if (Array.isArray(data)) {
          setOrders(data);
        } else {
          throw new Error('Unexpected data format from backend');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const previousStatus = orders.find(order => order._id === orderId)?.status;

    setOrders(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('Admin not authenticated');

      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update order status' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert(`Error: ${err.message}`);

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: previousStatus } : order
        )
      );
    }
  };

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}><p style={styles.message}>Loading orders...</p></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.wrapper}>
        <div style={{ ...styles.card, border: '1px solid #fecaca', backgroundColor: '#fef2f2' }}>
          <p style={{ ...styles.message, color: '#e11d48' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Dashboard</h2>
        <div style={styles.section}>
          <h3 style={styles.subheading}>All Orders</h3>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Customer Email</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td style={styles.td}>{order._id}</td>
                      <td style={styles.td}>{order.customer?.email || order.customer}</td>
                      <td style={styles.td}>₹{order.totalAmount.toFixed(2)}</td>
                      <td style={styles.td}>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          style={styles.select}
                        >
                          {orderStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td style={styles.td}>
                        <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                          {order.items.map((item, i) => (
                            <li key={i}>{item.name} (Qty: {item.quantity}) – ₹{(item.price * item.quantity).toFixed(2)}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  card: {
    width: '100%',
    maxWidth: '1100px',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  section: {
    marginTop: '1rem',
  },
  subheading: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem',
    backgroundColor: '#f3f4f6',
    color: '#111827',
    fontSize: '0.875rem',
    fontWeight: '600',
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '0.75rem',
    fontSize: '0.875rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#374151',
  },
  select: {
    padding: '0.4rem 0.5rem',
    fontSize: '0.85rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    color: '#374151',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: '1rem',
    color: '#4b5563',
    textAlign: 'center',
  },
};

export default AdminDashboard;
