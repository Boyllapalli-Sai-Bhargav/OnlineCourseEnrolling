import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../componentsCss/Card.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

const HomeCard = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [hoveredCourseID, setHoveredCourseID] = useState(null);
    const [cart, setCart] = useState([]);
    const [showLoginMessage, setShowLoginMessage] = useState(false); // State for message visibility

    useEffect(() => {
        fetch('http://localhost:3456/courses')
            .then(response => response.json())
            .then(json => setData(json));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3456/courseList')
            .then(response => response.json())
            .then(json => setList(json));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3456/UserCart')
            .then(response => response.json())
            .then(json => setCart(json.map(item => item.CourseID)));
    }, []);

    const handleNext = () => {
        if (startIndex + 4 < data.length) {
            setStartIndex(startIndex + 4);
        }
    };

    const handlePrev = () => {
        if (startIndex - 4 >= 0) {
            setStartIndex(startIndex - 4);
        }
    };

    const handleAddToCart = () => {
        setShowLoginMessage(true);
        setTimeout(() => {
            setShowLoginMessage(false); // Hide the message after 1 seconds
        }, 1000);
    };

    const visibleCards = data.slice(startIndex, startIndex + 4);

    return (
        <div className="cardWrapper">
            <div className="arrowContainer">
                <button onClick={handlePrev} disabled={startIndex === 0} className="arrowButton">
                    <FaAngleLeft />
                </button>
                <div className="cardContainer">
                    {visibleCards.map(course => (
                        <div 
                            className="card" 
                            key={course.CourseID}
                            onMouseEnter={() => setHoveredCourseID(course.CourseID)} 
                            onMouseLeave={() => setHoveredCourseID(null)}
                        >
                            <img src={course.CourseImg} alt={course.CourseCaption} />
                            <p className='p1'>{course.CourseCaption}</p>
                            <p className='p2'>By: {course.CourseCreatedBy}</p>
                            <p className='p4'>{course.CourseRate}</p>
                            <p className='p3'>{course.CourseCurrency}</p>
                            {hoveredCourseID === course.CourseID && (
                                <div className="hoverText">
                                    {list.filter(courseList => courseList.CourseID === hoveredCourseID).map((courseList, index) => (
                                        <div key={index}>
                                            {index === 0 && (
                                                <>
                                                    <p className='p5'>{courseList.CourseCaption}</p>
                                                    <p className='p6'>Course ID: <b>{courseList.CourseID}</b></p>
                                                </>
                                            )}
                                            <p className='p7'><FcCheckmark /> &nbsp;&nbsp;{courseList.courseDesc}</p>
                                        </div>
                                    ))}
                                  <button className='btn' onClick={handleAddToCart}> Add to Cart</button>
                                </div>
                            )}
                            <Link to={`/section/${course.CourseID}`} className="viewSectionBtn">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
                <button onClick={handleNext} disabled={startIndex + 4 >= data.length} className="arrowButton">
                    <FaAngleRight />
                </button>
            </div>

            {/* Show the message when showLoginMessage is true */}
            {showLoginMessage && <div className="loginMessage">You Need to Login</div>}
        </div>
    );
};

export default HomeCard;
