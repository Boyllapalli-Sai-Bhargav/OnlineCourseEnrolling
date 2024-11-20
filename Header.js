import React, { useState } from 'react';
import logo from '../ui/logo.png';
import { FaSearch } from 'react-icons/fa';
import { CiGlobe } from "react-icons/ci";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import 'C:/React/Work/udemy/src/componentsCss/Header.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Header() {
  const [cartItems, setCartItems] = useState(0);

  return (
    <>
      <div className='Header fixed'>
        <Link to='/' className='logo bl' style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" />
        </Link>
        <p className='cat'>Categories</p>
      </div>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search for Anything" className='sea' />
      </div>
      <div className="Button-container">
       
          <Button className='carting'>
            <AddShoppingCartIcon />
          </Button>
          <Link to="/login">
          <Button className="login-Btn">Login</Button>
        </Link>
        <Link to='/Signup'><Button className="signup-Btn">SignUp</Button></Link>
        <Button className='gl'><CiGlobe /></Button>
      </div><br />
      <hr />
    </>
  );
}

export default Header;
