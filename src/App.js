import './App.css';
import { Link, Routes, Route ,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import AdminLogin from './pages/Login/login';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import './components/button.css';
import AssistantComponent from './components/AssistantComponent/AssistantComponent';

import AddItemPage from './pages/Dashboard/AddItemPage';

// const cors = require('cors');

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/AdminDashboard');

  
  return (
    <div id='app'>
      {/* Render Navbar ONLY if NOT on admin pages */}
      {!isAdminPage && (
        <Navbar expand='lg' className='fixed-top bg-body-tertiary shadow'>
          <Container>
            <Navbar.Brand>
              <Link to='/' className='navbar-brand text-success d-flex align-items-center'>
                <FontAwesomeIcon icon={faUtensils} size='xl' className="text-danger"  style={{ marginRight: '10px' }} />

              <span
  className="nav-link text-uppercase text-center fw-semibold"
  style={{ color: '#000000ff', lineHeight: '1', display: 'inline-block' }}
>
  Flavor
  <span style={{ color: '#ffc300', display: 'block', lineHeight: '1' }}>Hub</span>
</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse className='text-center' id='basiv-navbar-nav'>
              <Nav className='me-auto justify-content-center w-100'>
                <Link
  to="/"
  className="nav-link text-uppercase text-center fw-semibold"
  style={{ color: '#000000ff' }}
>Home</Link>
                <Link 
                to='/menu' 
                  className="nav-link text-uppercase text-center fw-semibold"
                  style={{ color: '#000000ff' }}
                >Menu</Link>
                <Link
                 to='/about'
                 className="nav-link text-uppercase text-center fw-semibold"
                  style={{ color: '#000000ff' }}
                  >About</Link>
              </Nav>
              <Link to='/contact'>
                <button
                  type='button'
                  className='custom-btn'>
                  Book a table
                </button>
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
       <div id='page-content' style={{ paddingTop: '70px' }}>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/AdminDashboard/*' element={<AdminDashboard />} />
      </Routes>
       </div>
    </div>
  );
}


export default App;