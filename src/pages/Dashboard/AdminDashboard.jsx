import { NavLink, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AI from './AI';
import Statistics from './Statistics';
import CreateUser from './CreateUser';
import ManageMenu from './ManageMenu';
import ViewCustomers from './ViewCustomers';
import './AdminDashboard.css'; 
export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div
        className="bg-light border-end"
        style={{ width: isOpen ? '250px' : '60px' }}
      >
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
              <h5 className="fw-bold">Dashboard</h5>

              <ul className="nav flex-column">
                {[
                  { name: 'AI', to: '/AdminDashboard/ai' },
                  { name: 'Statistics', to: '/AdminDashboard/statistics' },
                  { name: 'Create User', to: '/AdminDashboard/create-user' },
                  { name: 'Menu', to: '/AdminDashboard/menu' },
                  { name: 'View Customers', to: '/AdminDashboard/view-customers' },
                ].map(({ name, to }) => (
                  <li className="nav-item mb-2" key={name}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `nav-link px-3 py-2 rounded fw-semibold ${
                          isActive
                            ? 'active-link'
                            : 'hover-bg text-dark'
                        }`
                      }
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <main className="flex-grow-1">
        <Routes>
          <Route path="ai" element={<AI />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="menu" element={<ManageMenu />} />
          <Route path="view-customers" element={<ViewCustomers />} />
        </Routes>
      </main>
    </div>
  );
}
