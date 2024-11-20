import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'C:/React/Work/udemy/src/componentsCss/Checkout.css';
import logo from 'C:/React/Work/udemy/src/ui/logo.png';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Checkout = () => {
    
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    useEffect(() => {
        fetch('http://localhost:3456/UserCart')
            .then(response => response.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Error fetching cart data:', error));
    }, []);

    const handleProceedToEnroll = (item) => {
        navigate('/payment', { state: { selectedCourse: item, email } });
    };

    const handleLogout = () => {
        navigate('/', { replace: true });
    };

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

            <div className="cartContainer">
                <p className='emailText'>{email}</p>
                <p className='heading'><span>{cartItems.length}</span> courses in your cart</p>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="check">
                            <img src={item.CourseImg} alt={item.CourseCaption} />
                            <div>
                                <p className='cartCaption'>{item.CourseCaption}</p>
                                <p className='cartCreated'>{item.CourseCreatedBy}</p>
                                <p className='cartRating'>{item.CourseRate}</p>
                            </div>
                            <button 
                                onClick={() => handleProceedToEnroll(item)} 
                                className='proceedEnroll'>
                                Proceed to Enroll
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Checkout;
