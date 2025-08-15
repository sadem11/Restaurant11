// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AddOrder.css";

// const AddOrder = () => {
//   const [form, setForm] = useState({
//     customerName: "",
//     contact: "",
//     items: [{ name: "", qty: 1, price: 0 }],
//   });

//   const handleChange = (index, field, value) => {
//     const newItems = [...form.items];
//     newItems[index][field] = value;
//     setForm({ ...form, items: newItems });
//   };

//   const handleAddItem = () => {
//     setForm({
//       ...form,
//       items: [...form.items, { name: "", qty: 1, price: 0 }],
//     });
//   };

//   const handleRemoveItem = (index) => {
//     const newItems = form.items.filter((_, i) => i !== index);
//     setForm({ ...form, items: newItems });
//   };

//   const total = form.items.reduce(
//     (sum, item) => sum + Number(item.qty) * Number(item.price),
//     0
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Order Data:", form);
//   };

//   return (
//     <div className="add-order-container">
//   <h3 className="add-order-title">Add Order</h3>

//   <form onSubmit={handleSubmit}>

//     {/* Customer Info */}
//     <div className="form-group">
//       <label>Customer Name</label>
//       <input
//         type="text"
//         value={form.customerName}
//         onChange={(e) => setForm({ ...form, customerName: e.target.value })}
//         placeholder="Enter customer name"
//         required
//       />
//     </div>

//     <div className="form-group">
//       <label>Contact</label>
//       <input
//         type="text"
//         value={form.contact}
//         onChange={(e) => setForm({ ...form, contact: e.target.value })}
//         placeholder="Enter contact number"
//         required
//       />
//     </div>

//     {/* Order Items Table */}
//     <h5 className="mb-3">Order Items</h5>
//     <div className="table-responsive">
//       <table className="items-table">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Quantity</th>
//             <th>Price (per unit)</th>
//             <th>Total</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {form.items.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <input
//                   type="text"
//                   value={item.name}
//                   onChange={(e) => handleChange(index, "name", e.target.value)}
//                   placeholder="Item name"
//                   required
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.qty}
//                   min="1"
//                   onChange={(e) => handleChange(index, "qty", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.price}
//                   min="0"
//                   step="0.01"
//                   onChange={(e) => handleChange(index, "price", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>{(item.qty * item.price).toFixed(2)}</td>
//               <td>
//                 <button
//                   type="button"
//                   className="btn btn-remove"
//                   onClick={() => handleRemoveItem(index)}
//                 >
//                   Remove
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Add Item Button */}
//     <button type="button" className="btn btn-add-item" onClick={handleAddItem}>
//       + Add Item
//     </button>

//     {/* Total Price */}
//     <h5>Total: ${total.toFixed(2)}</h5>

//     {/* Submit Button */}
//     <button type="submit" className="btn btn-submit">
//       Submit Order
//     </button>
//   </form>
// </div>

//   );
// };

// export default AddOrder;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddOrder.css";

const AddOrder = () => {
  const navigate = useNavigate();
  const [itemsList, setItemsList] = useState([]);
  const [form, setForm] = useState({
    status: "paid", // default
    items: [{ item: "", quantity: 1 }]
  });

  // Fetch available items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/items");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItemsList(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [...form.items, { item: "", quantity: 1 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed to create order");

      alert("Order added successfully!");
      navigate("/AdminDashboard/orders");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding order");
    }
  };

  return (
    <div className="add-order-container">
      <h3 className="add-order-title">Add Order</h3>

      <form onSubmit={handleSubmit}>
        {/* Status Radio Buttons */}
        <div className="form-group">
  <label><h5>Payment Status</h5></label>
  <div className="status-options">
    {["Canceld", "paid", "pending"].map((status) => (
      <label key={status} style={{ marginRight: "10px" }}>
        <input
          type="radio"
          name="status"
          value={status}
          className="custom-radio" // <-- add this
          checked={form.status === status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        {status}
      </label>
            ))}
          </div>
        </div>

        {/* Order Items Table */}
        <h5 className="mb-3">Order Items</h5>
        <div className="table-responsive">
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {form.items.map((orderItem, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={orderItem.item}
                      onChange={(e) =>
                        handleChange(index, "item", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Item</option>
                      {itemsList.map((menuItem) => (
                        <option key={menuItem._id} value={menuItem._id}>
                          {menuItem.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={orderItem.quantity}
                      min="1"
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-remove"
                      onClick={() => handleRemoveItem(index)}
                        style={{backgroundColor: "#ed3131ff", border: "none", cursor: "pointer"}}
                      
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Item Button */}
        <button
          type="button"
          className="btn btn-add-item"
          onClick={handleAddItem}
        >
          + Add Item
        </button>

        {/* Submit Button */}
       <div className="modal-buttons">
              <button type="submit"  style={{ backgroundColor: 'green', color: 'white' }} >Save</button>
              <button type="button" onClick={() => navigate('/AdminDashboard/Orders')}>
                Cancel
              </button>
            </div>
      </form>
    </div>
  );
};

export default AddOrder;
