// // import { useNavigate } from 'react-router-dom';
// import { Badge } from 'react-bootstrap';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Orders.css';

// export default function Orders() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const getStatusVariant = (status) => {
//     switch (status) {
//       case 'Pending': return 'warning';
//       case 'Preparing': return 'info';
//       case 'Completed': return 'success';
//       case 'paid': return 'primary';
//       default: return 'secondary';
//     }
//   };

//   // Fetch orders from backend
//   const fetchOrders = async (start, end) => {
//     setLoading(true);
//     try {
//       let url = 'http://localhost:5000/orders';
//       if (start && end) {
//         url += `?startDate=${start}&endDate=${end}`;
//       }

//       const res = await fetch(url);
//       if (!res.ok) throw new Error('Failed to fetch orders');
//       const data = await res.json();
//       setOrders(data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleFilter = () => {
//     if (!startDate || !endDate) {
//       alert('Please select both start and end dates');
//       return;
//     }
//     fetchOrders(startDate, endDate);
//   };

//   if (loading) {
//     return <div className="orders-page"><p>Loading orders...</p></div>;
//   }

//   return (
//     <div className="orders-page">
//       <div className="orders-header">
//         <h2 className="orders-title">Orders</h2>
//         <button
//           className="add-order-btn"
//           onClick={() => navigate('/AdminDashboard/addOrder')}
//         >
//           ➕ Add Order
//         </button>
//       </div>

//       {/* Date Filter */}
//       <div className="date-filter">
//   <input
//     type="date"
//     value={startDate}
//     onChange={(e) => setStartDate(e.target.value)}
//   />
//   <input
//     type="date"
//     value={endDate}
//     onChange={(e) => setEndDate(e.target.value)}
//   />
//   <button onClick={handleFilter} className="btn btn-filter">
//     Filter
//   </button>
// </div>

//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Items</th>
//             <th>Total Price ($)</th>
//             <th>Payment Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order, index) => (
//               <tr key={order._id}>
//                 <td>{index + 1}</td>
//                 <td>
//                   {order.items.map((item, i) => (
//                     <div key={i}>
//                       {item.name} <span className="text-muted">x{item.quantity}</span>
//                     </div>
//                   ))}
//                 </td>
//                 <td>${order.totalPrice}</td>
//                 <td>
//                   <Badge bg={getStatusVariant(order.status)}>{order.status}</Badge>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Badge } from 'react-bootstrap';
// import './Orders.css';

// export default function Orders() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editFormData, setEditFormData] = useState({
//     items: [],
//     totalPrice: 0,
//     status: '',
//     _id: ''
//   });

//   const getStatusVariant = (status) => {
//     switch (status) {
//       case 'Pending': return 'warning';
//       case 'Preparing': return 'info';
//       case 'Completed': return 'success';
//       case 'paid': return 'primary';
//       default: return 'secondary';
//     }
//   };

//   // Fetch orders from backend
//   const fetchOrders = async (start, end) => {
//     setLoading(true);
//     try {
//       let url = 'http://localhost:5000/orders';
//       if (start && end) {
//         url += `?startDate=${start}&endDate=${end}`;
//       }

//       const res = await fetch(url);
//       if (!res.ok) throw new Error('Failed to fetch orders');
//       const data = await res.json();
//       setOrders(data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleFilter = () => {
//     if (!startDate || !endDate) {
//       alert('Please select both start and end dates');
//       return;
//     }
//     fetchOrders(startDate, endDate);
//   };

//   // Open modal with order data
//   const handleRowClick = (order) => {
//     setEditFormData(order);
//     setShowEditForm(true);
//   };

//   // Handle modal input changes
//   const handleEditInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === 'file') {
//       setEditFormData({ ...editFormData, [name]: files[0] });
//     } else {
//       setEditFormData({ ...editFormData, [name]: value });
//     }
//   };

//   // Handle modal form submission
//   const handleEditItemSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await fetch(`http://localhost:5000/orders/${editFormData._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editFormData)
//       });
//       alert('Order updated successfully!');
//       setShowEditForm(false);
//       fetchOrders(startDate, endDate);
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

//   if (loading) {
//     return <div className="orders-page"><p>Loading orders...</p></div>;
//   }

//   return (
//     <div className="orders-page">
//       <div className="orders-header">
//         <h2 className="orders-title">Orders</h2>
//         <button
//           className="add-order-btn"
//           onClick={() => navigate('/AdminDashboard/addOrder')}
//         >
//           ➕ Add Order
//         </button>
//       </div>

//       {/* Date Filter */}
//       <div className="date-filter">
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//         <button onClick={handleFilter} className="btn btn-filter">
//           Filter
//         </button>
//       </div>

//       {/* Orders Table */}
//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Items</th>
//             <th>Total Price ($)</th>
//             <th>Payment Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order, index) => (
//               <tr
//                 key={order._id}
//                 className="clickable-row"
//                 onClick={() => handleRowClick(order)}
//               >
//                 <td>{index + 1}</td>
//                 <td>
//                   {order.items.map((item, i) => (
//                     <div key={i}>
//                       {item.name} <span className="text-muted">x{item.quantity}</span>
//                     </div>
//                   ))}
//                 </td>
//                 <td>${order.totalPrice}</td>
//                 <td>
//                   <Badge bg={getStatusVariant(order.status)}>{order.status}</Badge>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Edit Order Modal */}
//       {showEditForm && (
//         <div className="modal-back" onClick={() => setShowEditForm(false)}>
//           <form
//             className="modal-cont"
//             onClick={(e) => e.stopPropagation()}
//             onSubmit={handleEditItemSubmit}
//           >
//             <div className="modal-head">
//               <h2>Edit Order</h2>
//               <button
//                 type="button"
//                 className="modal-close-btn"
//                 onClick={() => setShowEditForm(false)}
//                 aria-label="Close modal"
//               >
//                 &times;
//               </button>
//             </div>

//             <label>
//               Status:
//               <select
//                 name="status"
//                 value={editFormData.status}
//                 onChange={handleEditInputChange}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Preparing">Preparing</option>
//                 <option value="Completed">Completed</option>
//                 <option value="paid">Paid</option>
//               </select>
//             </label>

//             <label>
//               Total Price:
//               <input
//                 type="number"
//                 name="totalPrice"
//                 value={editFormData.totalPrice}
//                 onChange={handleEditInputChange}
//               />
//             </label>

//             <div className="modal-buttons">
//               <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
//                 Save
//               </button>
//               <button type="button" onClick={() => setShowEditForm(false)}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import './Orders.css';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // New status filter

  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    items: [],
    status: '',
    _id: ''
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Preparing': return 'info';
      case 'Completed': return 'success';
      case 'paid': return 'primary';
      case 'Canceld': return 'danger';
      default: return 'secondary';
    }
  };

  // Dummy orders for testing
  useEffect(() => {
    const dummyOrders = [
      { _id: '1', items: [{ name: 'Pizza', quantity: 2 }, { name: 'Coke', quantity: 3 }], totalPrice: 30, status: 'Pending' },
      { _id: '2', items: [{ name: 'Burger', quantity: 1 }, { name: 'Fries', quantity: 2 }], totalPrice: 15, status: 'Completed' },
      { _id: '3', items: [{ name: 'Pasta', quantity: 1 }, { name: 'Salad', quantity: 1 }], totalPrice: 20, status: 'Preparing' }
    ];
    setOrders(dummyOrders);
    setLoading(false);
  }, []);

  // Open modal with order data
  const handleRowClick = (order) => {
    setEditFormData(order);
    setShowEditForm(true);
  };

  // Handle modal input changes
  const handleEditInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setEditFormData({ ...editFormData, status: value });
    } else if (name === 'quantity') {
      const newItems = [...editFormData.items];
      newItems[index].quantity = Number(value);
      setEditFormData({ ...editFormData, items: newItems });
    }
  };

  // Update orders locally
  const handleEditItemSubmit = (e) => {
    e.preventDefault();
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order._id === editFormData._id ? editFormData : order))
    );
    alert('Order updated successfully!');
    setShowEditForm(false);
  };

  // Filter orders by date and/or status
  const handleFilter = async () => {
    let url = 'http://localhost:5000/orders?'; // Backend endpoint

    if (startDate) url += `startDate=${startDate}&`;
    if (endDate) url += `endDate=${endDate}&`;
    if (statusFilter) url += `status=${statusFilter}&`;

    // Remove last & if exists
    url = url.endsWith('&') ? url.slice(0, -1) : url;

    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch filtered orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching filtered orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="orders-page"><p>Loading orders...</p></div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2 className="orders-title">Orders</h2>
        <button className="add-order-btn" onClick={() => navigate('/AdminDashboard/addOrder')}>
          ➕ Add Order
        </button>
      </div>

      {/* Filters */}
      <div className="date-filter" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Payment Statuses</option>
          <option value="Pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="Canceld">Canceld</option>
        </select>
        <button onClick={handleFilter} className="btn btn-filter">Filter</button>
      </div>

      {/* Orders Table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Items</th>
            <th>Total Price ($)</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? orders.map((order, index) => (
            <tr key={order._id} className="clickable-row" onClick={() => handleRowClick(order)}>
              <td>{index + 1}</td>
              <td>{order.items.map((item, i) => (<div key={i}>{item.name} <span className="text-muted">x{item.quantity}</span></div>))}</td>
              <td>${order.totalPrice}</td>
              <td><Badge bg={getStatusVariant(order.status)}>{order.status}</Badge></td>
            </tr>
          )) : <tr><td colSpan="4">No orders found</td></tr>}
        </tbody>
      </table>

      {/* Edit Order Modal */}
      {showEditForm && (
        <div className="modal-back" onClick={() => setShowEditForm(false)}>
          <form className="modal-cont" onClick={(e) => e.stopPropagation()} onSubmit={handleEditItemSubmit}>
            <div className="modal-head">
              <h2>Edit Order</h2>
              <button type="button" className="modal-close-btn" onClick={() => setShowEditForm(false)}>&times;</button>
            </div>

            {editFormData.items.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <label>Item: <strong>{item.name}</strong></label>
                <input type="number" name="quantity" value={item.quantity} min="1" onChange={(e) => handleEditInputChange(e, index)} style={{ width: '60px', marginLeft: '10px' }} />
              </div>
            ))}

            <label>Status:
              <select name="status" value={editFormData.status} onChange={handleEditInputChange} style={{ marginLeft: '10px' }}>
                <option value="Pending">Pending</option>
                  <option value="paid">Paid</option>
                <option value="Canceld">Canceld</option>
              </select>
            </label>

            <div className="modal-buttons" style={{ marginTop: '15px' }}>
              <button type="submit" style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}>Save</button>
              <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
