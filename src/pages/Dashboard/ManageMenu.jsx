import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ManageMenu.css';

const categoryImages = {
  pizza: 'pizza.jpg',
  burger: 'burgers.jpg',
  fries: 'fries.jpg',
  drink: 'drinks-img.jpg',
  dessert: 'dessert-img.jpg',
  other: 'other.jpg',
  plate: 'plate.jpg',
  sandwich: 'sandwich.jpg',
};

export default function ManageMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    const token = localStorage.getItem('token');
    fetch('/api/items', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch menu');
        return res.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Add item handler
  const handleAddItem = () => {
    const name = prompt('Enter item name:');
    const price = parseFloat(prompt('Enter item price:'));
    const category = prompt('Enter category (pizza, burger, etc.):');

    if (!name || isNaN(price) || !category) {
      alert('Invalid input. Please try again.');
      return;
    }

    const token = localStorage.getItem('token');
    fetch('/api/items', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, category }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add item');
        return res.json();
      })
      .then((newItem) => {
        setMenu((prev) => [...prev, newItem]);
      })
      .catch((err) => alert(err.message));
  };

  // Group dishes by category
  const groupedByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleEdit = (item) => {
    alert(`Edit clicked for ${item.name}`);
  };

  const handleDelete = (itemId) => {
    if (!window.confirm('Are you sure you want to delete this dish?')) return;
    const token = localStorage.getItem('token');

    fetch(`/api/items/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete item');
        setMenu((prev) => prev.filter((item) => item._id !== itemId));
      })
      .catch((err) => alert(err.message));
  };

  
  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="manage-menu-container">
      <div className="top-bar">
        <h2 className="manage-menu-title">Manage Restaurant Menu</h2>
        <button className="add-item-btn" onClick={handleAddItem}>
          + Add Item
        </button>
      </div>

      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category} className="category-section">
          <ul className="dishes-list">
            {items.map((item) => (
              <li key={item._id} className="dish-item">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <div className="dish-buttons">
                  <button className="edit" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

<motion.div  
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
          <img className="category-image"
            src={`http://localhost:5000/images/${
              categoryImages[category] || 'default.jpg'
            }`}
            alt={`${category} category`}
          /></motion.div>
        </div>
      ))}
    </div>
  );
}
