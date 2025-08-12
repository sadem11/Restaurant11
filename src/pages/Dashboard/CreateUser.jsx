import React, { useState } from 'react';
import './CreateUser.css';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    DOB: '',
    phoneNumber: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('User created successfully!');
        setFormData({ name: '', DOB: '', phoneNumber: '', password: '', role: '' });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="red-container">
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit} className="red-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="date" name="DOB" placeholder="Date of Birth" value={formData.DOB} onChange={handleChange} />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
