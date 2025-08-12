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
import AssistantComponent from './components/AssistantComponent/AssistantComponent';

const cors = require('cors');

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
                <FontAwesomeIcon icon={faUtensils} size='xl' className="text-danger" />

                <span className='nav-link text-uppercase text-danger text-center fw-semibold'>
                  Korlake
                  <br />
                  Restaurant
                </span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse className='text-center' id='basiv-navbar-nav'>
              <Nav className='me-auto justify-content-center w-100'>
                <Link to='/' className='nav-link text-uppercase text-danger text-center fw-semibold'>Home</Link>
                <Link to='/menu' className='nav-link text-uppercase text-danger text-center fw-semibold'>Menu</Link>
                <Link to='/about' className='nav-link text-uppercase text-danger text-center fw-semibold'>About</Link>
              </Nav>
              <Link to='/contact'>
                <button
                  type='button'
                  className='btn btn-danger btn-lg rounded-0 text-capitalize mx-2 mb-3 mb-sm-0'
                >
                  Book a table
                </button>
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<AdminLogin />} />
        {/* Add wildcard * to allow nested routing inside AdminDashboard */}
        <Route path='/AdminDashboard/*' element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}


export default App;