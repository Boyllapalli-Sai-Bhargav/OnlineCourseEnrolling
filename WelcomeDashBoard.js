import React, { useState } from 'react';
import 'C:/React/Work/udemy/src/componentsCss/Checkout.css';
import { useNavigate } from 'react-router-dom';
import logo from 'C:/React/Work/udemy/src/ui/logo.png';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import CardDashboard from './CardDashboard';
import Devolopment from './Devolopment';
import Options from './Options';
import LearnChooseLearn from './LearnChooseLearn';


const WelcomeDashBoard = () => {
    const [cartItems] = useState([]);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/', { replace: true });
    };
  return (
    <div>
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
            <div className='CL'>
                <Button className='carting'>
                    <MdOutlineAddShoppingCart />
                    {/* Display the cart length on the cart icon */}
                    {cartItems.length > 0 && (
                        <span className="length">{cartItems.length}</span>
                    )}
                </Button>
                <Button className='logout' onClick={handleLogout}>Logout</Button>
            </div>
            <br />
            <hr />
            <Devolopment />
            <Options />    
            <CardDashboard />
            <LearnChooseLearn />
      </>
    </div>
  )
}

export default WelcomeDashBoard
