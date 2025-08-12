import React, { useEffect, useState } from 'react';
import './ViewCustomers.css'; 
const response = await fetch('http://localhost:5000/api/users');
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your backend route
        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Delete customer by ID
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCustomers(customers.filter(customer => customer._id !== id));
        alert('Customer deleted successfully');
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (error) {
      alert('Server error while deleting');
    }
  };

  // Placeholder for edit (you can replace with form/modal logic)
  const handleEdit = (id) => {
    alert(`Edit function called for user ID: ${id}`);
  };

  if (loading) return <p className="red-text">Loading customers...</p>;

  return (
    <div className="red-container">
      <h2>All Customers</h2>
      {customers.length === 0 ? (
        <p className="red-text">No customers found.</p>
      ) : (
        <ul className="red-list">
          {customers.map((customer) => (
            <li key={customer._id} className="red-customer">
              <span>{customer.name}</span>
              <div className="red-actions">
                <button onClick={() => handleEdit(customer._id)}>Edit</button>
                <button onClick={() => handleDelete(customer._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
