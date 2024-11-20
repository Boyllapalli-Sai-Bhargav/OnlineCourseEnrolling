import React from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
    const location = useLocation();
    const { user } = location.state || {};

    if (!user) {
        return <p>No user details available.</p>;
    }

    return (
        <div>
            <h1>User Details</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile Number:</strong> {user.MobileNumber}</p>
        </div>
    );
};

export default Details;
