// import { NavLink, Routes, Route } from 'react-router-dom';

// import { useState } from 'react';
// import AI from './AI';
// import Statistics from "./Statistics";
// import Orders from './Orders';
// import AddOrder from './AddOrder';

// import CreateEmployee from './CreateEmployee';
// import ManageMenu from './ManageMenu';
// import ViewEmployees from './ViewEmployees';


// export default function AdminDashboard() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="d-flex" style={{ minHeight: '100vh' }}>
//       <div className="bg-light border-end" style={{ width: isOpen ? '250px' : '60px', transition: '0.3s' }}>
//         <div className="p-3">
//          <button
//   onClick={() => setIsOpen(!isOpen)}
//   className={`hamburger ${isOpen ? 'open' : ''}`}
//   aria-label="Toggle Sidebar"
// >
//   <span></span>
//   <span></span>
//   <span></span>
// </button>

//           {isOpen && (
//             <>
//              <h5 className="fw-bold" style={{ color: '#000000ff' }}>Dashboard</h5>

//              <ul className="nav flex-column">
//   {[
//     { name: 'AI', to: '/AdminDashboard/ai' },
//     { name: 'Statistics', to: '/AdminDashboard/statistics' },
//     { name: 'Employees', to: '/AdminDashboard/viewEmployees' },
//     { name: 'Menu', to: '/AdminDashboard/menu' },
//     { name: 'Orders', to: '/AdminDashboard/orders' },
//   ].map(({ name, to }) => (
//     <li className="nav-item mb-2" key={name}>
// <NavLink
//   to={to}
//   style={({ isActive }) => ({
//      display: 'block',   
//     padding: '0.5rem 1rem',
//     borderRadius: '0.25rem',
//     fontWeight: '600',
//     textDecoration: 'none',
//     color: isActive ? 'black' : '#000',          // text color
//     backgroundColor: isActive ? '#ffc300' : '',  // active background color
//     transition: 'all 0.3s ease'
    
//   })}
// >
//   {name}
// </NavLink>

//     </li>
//   ))}
// </ul>

//             </>
//           )}
//         </div>
//       </div>

//       <div className="flex-grow-1 p-4">
//         <Routes>
//           <Route path="ai" element={<AI />} />
//           <Route path="statistics" element={<Statistics />} />
//           <Route path="ViewEmployees" element={<ViewEmployees />} />
//           <Route path="CreateEmployee" element={<CreateEmployee />} /> 
//           <Route path="menu" element={<ManageMenu />} />
//           <Route path="orders" element={<Orders />} /> 
// <Route path="addOrder" element={<AddOrder />} />
//         </Routes>
//       </div>  
//     </div>
//   );
// }

import { NavLink, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AI from './AI';
import Statistics from "./Statistics";
import Orders from './Orders';
import AddOrder from './AddOrder';
import CreateEmployee from './CreateEmployee';
import ManageMenu from './ManageMenu';
import ViewEmployees from './ViewEmployees';

function SidebarItem({ to, children }) {
  const [hover, setHover] = useState(false);

  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'block',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        fontWeight: '600',
        textDecoration: 'none',
        color: isActive ? 'black' : '#000',
        backgroundColor: isActive ? '#ffc300' : hover ? '#ffc40098' : '',
        transition: 'all 0.3s ease',
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </NavLink>
  );
}

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div className="bg-light border-end" style={{ width: isOpen ? '250px' : '60px', transition: '0.3s' }}>
        <div className="p-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`hamburger ${isOpen ? 'open' : ''}`}
            aria-label="Toggle Sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {isOpen && (
            <>
              <h5 className="fw-bold" style={{ color: '#000000ff' }}>Dashboard</h5>
              <ul className="nav flex-column">
                {[
                  { name: 'AI', to: '/AdminDashboard/ai' },
                  { name: 'Statistics', to: '/AdminDashboard/statistics' },
                  { name: 'Employees', to: '/AdminDashboard/viewEmployees' },
                  { name: 'Menu', to: '/AdminDashboard/menu' },
                  { name: 'Orders', to: '/AdminDashboard/orders' },
                ].map(({ name, to }) => (
                  <li className="nav-item mb-2" key={name}>
                    <SidebarItem to={to}>{name}</SidebarItem>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="ai" element={<AI />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="ViewEmployees" element={<ViewEmployees />} />
          <Route path="CreateEmployee" element={<CreateEmployee />} />
          <Route path="menu" element={<ManageMenu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addOrder" element={<AddOrder />} />
        </Routes>
      </div>
    </div>
  );
}
