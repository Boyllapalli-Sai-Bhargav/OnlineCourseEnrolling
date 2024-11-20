import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Section from './components/Section';
import CartDetails from './components/CartDetails';
import Payment from './components/Payment';
import Checkout from './components/Checkout';
import WelcomeDashBoard from './components/WelcomeDashBoard';
import CardDashboard from './components/CardDashboard';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/welcomeDashboard" element={<WelcomeDashBoard />} />
            <Route path="/CardDashboard" element={<CardDashboard />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/section/:courseID" element={<Section />} />
            <Route path="/cart" element={<CartDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
