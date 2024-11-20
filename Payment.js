import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'C:/React/Work/udemy/src/componentsCss/Payment.css';
import { Payment as PaymentIcon, Phone, AccountBalanceWallet } from '@mui/icons-material';
import logo from 'C:/React/Work/udemy/src/ui/logo.png';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely access location.state
    const { selectedCourse = {}, email = '' } = location.state || {};

    const [cartItems, setCartItems] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [phonePayDetails, setPhonePayDetails] = useState('');
    const [upiDetails, setUpiDetails] = useState('');
    const [onlinePaymentDetails, setOnlinePaymentDetails] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        // Fetch cart items
        fetch('http://localhost:3456/UserCart')
            .then(response => response.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Error fetching cart data:', error));
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setCurrentDate(today);
    }, []);

    if (!selectedCourse) {
        return <p>No course selected for payment.</p>;
    }

    const handlePaymentModeChange = (event) => {
        setPaymentMode(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "phonePay") {
            setPhonePayDetails(value);
        } else if (name === "upi") {
            setUpiDetails(value);
        } else if (name === "onlinePayment") {
            setOnlinePaymentDetails(value);
        }
    };

    const handleMakePayment = async () => {
        const paymentData = {
            courseId: selectedCourse.id || '',
            email,
            paymentMode,
            phonePayDetails,
            upiDetails,
            onlinePaymentDetails,
            paymentDate: currentDate,
            status: paymentStatus || 'Pending',
        };

        try {
            const response = await fetch('http://localhost:3456/PaymentDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert('Payment successful!');
                navigate('/success'); // Navigate to a success page or desired route
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            alert('An error occurred. Please try again.');
        }
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
                    {cartItems.length > 0 && (
                        <span className="length">{cartItems.length}</span>
                    )}
                </Button>
                <Button className='logout' onClick={handleLogout}>Logout</Button>
            </div>
            <br />
            <hr />

            <p className="emailText">{email}</p>
            <div className="paymentContainer">
                <div className="courseDetails">
                    <img src={selectedCourse.CourseImg} className="paymentImage" alt="Course" />
                    <p className="courseText">{selectedCourse.CourseCaption}</p>
                </div>

                <div className="paymentMethod">
                    <p><strong className='refID'>Payment Ref ID</strong> <input type='text' /></p>
                    <p><strong className='stuID'>Student ID</strong> <input type='text' /></p>
                    <p><strong className='amo'>Amount</strong> <input value={selectedCourse.CourseCurrency || ''} readOnly /></p>

                    <div className="paymentModes">
                        <h4><strong>Payment Mode</strong></h4>

                        <div className="paymentOption">
                            <input
                                type="radio"
                                id="phonePay"
                                name="paymentMode"
                                value="PhonePay"
                                checked={paymentMode === "PhonePay"}
                                onChange={handlePaymentModeChange}
                            />
                            <Phone style={{ fontSize: 30 }} />
                            <label htmlFor="phonePay">PhonePay</label>
                        </div>

                        {paymentMode === "PhonePay" && (
                            <div className="paymentInputField">
                                <label htmlFor="phonePayInput">Phone Number:</label>
                                <input
                                    type="text"
                                    id="phonePayInput"
                                    name="phonePay"
                                    value={phonePayDetails}
                                    onChange={handleInputChange}
                                    placeholder="Enter PhonePay Number"
                                />
                            </div>
                        )}

                        <div className="paymentOption">
                            <input
                                type="radio"
                                id="upi"
                                name="paymentMode"
                                value="UPI"
                                checked={paymentMode === "UPI"}
                                onChange={handlePaymentModeChange}
                            />
                            <AccountBalanceWallet style={{ fontSize: 30 }} />
                            <label htmlFor="upi">UPI</label>
                        </div>

                        {paymentMode === "UPI" && (
                            <div className="paymentInputField">
                                <label htmlFor="upiInput">UPI ID:</label>
                                <input
                                    type="text"
                                    id="upiInput"
                                    name="upi"
                                    value={upiDetails}
                                    onChange={handleInputChange}
                                    placeholder="Enter UPI ID"
                                />
                            </div>
                        )}

                        <div className="paymentOption">
                            <input
                                type="radio"
                                id="onlinePayment"
                                name="paymentMode"
                                value="Online Payment"
                                checked={paymentMode === "Online Payment"}
                                onChange={handlePaymentModeChange}
                            />
                            <PaymentIcon style={{ fontSize: 30 }} />
                            <label htmlFor="onlinePayment">Online Payment</label>
                        </div>

                        {paymentMode === "Online Payment" && (
                            <div className="paymentInputField">
                                <label htmlFor="onlinePaymentInput">Payment ID:</label>
                                <input
                                    type="text"
                                    id="onlinePaymentInput"
                                    name="onlinePayment"
                                    value={onlinePaymentDetails}
                                    onChange={handleInputChange}
                                    placeholder="Enter Payment ID"
                                />
                            </div>
                        )}
                    </div>

                    <p><strong className='date'>Date</strong> <input type="date" value={currentDate} readOnly /></p>
                    <p><strong className='status'>Status</strong> <input value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} /></p>
                    <button className='MakePayement' onClick={handleMakePayment}>Make Payment</button>
                </div>
            </div>
        </>
    );
};

export default Payment;
