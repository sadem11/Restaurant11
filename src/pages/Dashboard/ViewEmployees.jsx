// import React, { useState } from 'react'; 
// import { useNavigate } from 'react-router-dom';
// import './ViewEmployees.css';

// const ViewEmployees = () => {
//   const navigate = useNavigate();

//   const [employees, setEmployees] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       DOB: '1990-05-15',
//       phoneNumber: '1234567890',
//       password: 'pass123',
//       role: 'Customer'
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       DOB: '1995-08-20',
//       phoneNumber: '9876543210',
//       password: 'secure456',
//       role: 'Admin'
//     }
//   ]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this customer?')) {
//       setEmployees(employees.filter(employee => employee.id !== id));
//     }
//   };

//   const handleEdit = (id) => {
//     const newName = prompt('Enter new name:');
//     if (newName) {
//       setEmployees(employees.map(employee =>
//         employee.id === id ? { ...employee, name: newName } : employee
//       ));
//     }
//   };

//   return (
//     <div className="manage-menu-container">
//       <div className="top-bar">
//         <h2 className="manage-menu-title">Employees List</h2>
//         <button 
//           onClick={() => navigate('/AdminDashboard/createEmployee')}
//           className="add-item-btn"
//         >
//           Add Employee
//         </button>
//       </div>

//       <table className="employees-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>DOB</th>
//             <th>Phone Number</th>
//             <th>Password</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map(employee => (
//             <tr key={employee.id}>
//               <td>{employee.name}</td>
//               <td>{employee.DOB}</td>
//               <td>{employee.phoneNumber}</td>
//               <td>{employee.password}</td>
//               <td>{employee.role}</td>
//               <td className="dish-buttons">
//                 <button 
//                   onClick={() => handleEdit(employee.id)} 
//                   className="edit"
//                 >
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => handleDelete(employee.id)} 
//                   className="delete"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {employees.length === 0 && (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center' }}>No customers found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewEmployees;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewEmployees.css';
const ViewEmployees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      DOB: '1990-05-15',
      phoneNumber: '1234567890',
      password: 'pass123',
      role: 'Customer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      DOB: '1995-08-20',
      phoneNumber: '9876543210',
      password: 'secure456',
      role: 'Admin'
    }
  ]);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    name: '',
    DOB: '',
    phoneNumber: '',
    password: '',
    role: ''
  });

  const handleEdit = (employee) => {
    setEditFormData(employee);
    setShowEditForm(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditItemSubmit = (e) => {
    e.preventDefault();
    setEmployees(prev => prev.map(emp => (emp.id === editFormData.id ? editFormData : emp)));
    setShowEditForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  return (
    <div className="manage-menu-container">
      <div className="top-bar">
        <h2 className="manage-menu-title">Employees List</h2>
        <button 
          onClick={() => navigate('/AdminDashboard/createEmployee')}
          className="add-item-btn"
        >
          + Add Employee
        </button>
      </div>

      <table className="employees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.DOB}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.password}</td>
              <td>{employee.role}</td>
              <td className="dish-buttons">
                <button onClick={() => handleEdit(employee)} className="edit">Edit</button>
                <button onClick={() => handleDelete(employee.id)} className="delete">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No customers found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showEditForm && (
        <div className="modal-back" onClick={() => setShowEditForm(false)}>
          <form
            className="modal-cont"
            onClick={e => e.stopPropagation()}
            onSubmit={handleEditItemSubmit}
          >
            <div className="modal-head">
              <h2 style={{color: 'green'}}>Edit Employee</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowEditForm(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditInputChange}
                required
                autoFocus
              />
            </label>

            <label>
              Date of Birth:
              <input
                type="date"
                name="DOB"
                value={editFormData.DOB}
                onChange={handleEditInputChange}
                required
              />
            </label>

            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={editFormData.phoneNumber}
                onChange={handleEditInputChange}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="text"
                name="password"
                value={editFormData.password}
                onChange={handleEditInputChange}
                required
              />
            </label>

            <label>
              Role:
              <input
                type="text"
                name="role"
                value={editFormData.role}
                onChange={handleEditInputChange}
                required
              />
            </label>

            <div className="modal-buttons">
              <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                Save
              </button>
              <button type="button" onClick={() => setShowEditForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewEmployees;
