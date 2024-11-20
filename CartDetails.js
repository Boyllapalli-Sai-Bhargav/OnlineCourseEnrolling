import 'C:/React/Work/udemy/src/componentsCss/CardDetails.css';
import boy from 'C:/React/Work/udemy/src/ui/search.webp';
import React, { useEffect, useState } from 'react';
import logo from 'C:/React/Work/udemy/src/ui/logo.png';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const CartDetails = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3456/UserCart')
            .then(response => response.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Error fetching cart data:', error));
    }, []);

    const handleDelete = (itemId) => {
        fetch(`http://localhost:3456/UserCart/${itemId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted item from the cartItems state
                    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
                } else {
                    console.error('Failed to delete item');
                }
            })
            .catch(error => console.error('Error deleting item:', error));
    };

    const totalCurrency = cartItems.reduce((total, item) => {
        const currency = item.CourseCurrency;
        // Check if CourseCurrency exists and is a string before using .replace
        if (currency && typeof currency === 'string') {
            const cleanedCurrency = currency.replace(/[^0-9.-]+/g, "");
            const currencyValue = parseFloat(cleanedCurrency);
            return !isNaN(currencyValue) ? total + currencyValue : total;
        }
        return total; // If CourseCurrency is invalid, return total as is
    }, 0).toFixed(2);

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
                <h2 className='shopCart'>Shopping Cart</h2>
                <p className='noCou'><span>{cartItems.length}</span> Course in your Cart</p>
                {cartItems.length > 0 ? (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="shopCart">
                                <img src={item.CourseImg} alt={item.CourseCaption} />
                                <div>
                                    <p className='cartCaption'>{item.CourseCaption}</p>
                                    <p className='cartCreated'>{item.CourseCreatedBy}</p>
                                    <p className='cartRating'>{item.CourseRate}</p>
                                </div>
                                <button onClick={() => handleDelete(item.id)} className='remove'>Delete</button>
                                <p className='cartCurency'>{item.CourseCurrency}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='emptyCart'>
                        <img src={boy} alt="search" className='boy' />
                        <p>Your cart is empty. Keep shopping to find a course!</p>
                        <Link to="/"><button className='keepShopping'>Keep Shopping</button></Link>
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className="totalCurrency">
                        <h4 className='total'>Total:</h4>
                        <p className='totalCost'>₹ {totalCurrency}</p>
                        <Link to="/checkout"><button className='checkOut'>Checkout</button></Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDetails;
