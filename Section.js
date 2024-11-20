import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import 'C:/React/Work/udemy/src/componentsCss/Section.css';
import { GiCheckMark } from "react-icons/gi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PiVideoLight } from "react-icons/pi";
import { BsFilePdf } from "react-icons/bs";
import { IoIosPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa6";
import { GiClockwiseRotation } from "react-icons/gi";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaExpand } from "react-icons/fa";


const Section = () => {
    const { courseID } = useParams();
    const [lerningsData, setLerningsData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [sectionsData, setSectionsData] = useState(null);
    const [chaptersData, setChaptersData] = useState(null);
    const [topicsData, setTopicsData] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideoURL, setCurrentVideoURL] = useState('');
    const [currentSectionName, setCurrentSectionName] = useState('');
    const [currentChapterName, setCurrentChapterName] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // State for mute/unmute

    const videoRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:3456/lernings')
            .then(response => response.json())
            .then(json => {
                const lernings = json.filter(l => l.courseID === courseID);
                setLerningsData(lernings);
            });

        fetch('http://localhost:3456/courses')
            .then(response => response.json())
            .then(json => {
                const course = json.find(c => c.CourseID === courseID);
                setCourseData(course);
            });

        fetch('http://localhost:3456/section')
            .then(response => response.json())
            .then(json => {
                const sections = json.filter(s => s.courseID === courseID);
                setSectionsData(sections);
            });

        fetch('http://localhost:3456/chapters')
            .then(response => response.json())
            .then(json => {
                setChaptersData(json);
            });

        fetch('http://localhost:3456/topic')
            .then(response => response.json())
            .then(json => {
                setTopicsData(json);
            });
    }, [courseID]);

    const toggleSection = (sectionID) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [sectionID]: !prevState[sectionID]
        }));
    };

    const handleVideoClick = (url, sectionName, chapterName) => {
        setCurrentVideoURL(url);
        setCurrentSectionName(sectionName);
        setCurrentChapterName(chapterName);
        setIsModalOpen(true);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleSeek = (event) => {
        const seekTime = (event.target.value / 100) * duration;
        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 5;
        }
    };

    const handleBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 5;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };
    

    if (!courseData || !lerningsData || !sectionsData || !chaptersData || !topicsData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className='cd'><br />
                <div className='cd1'>
                    <h2>Course Details</h2>
                    <p className='caption'>{courseData.CourseCaption}</p>
                    <p>Created By, <span className='by'>{courseData.CourseCreatedBy}</span></p>
                    <p className='rating'>{courseData.CourseRate}</p>
                </div><br />
            </div><br />

            <div className='points'>
                <h2 className='h2'>What you'll learn</h2>
                {lerningsData.map((learning, index) => (
                    <p key={index}><GiCheckMark />  {learning.Desc}</p>
                ))}
            </div>
            <h2 className='cc'>Course Content</h2>
            <div className='sections'>
                {sectionsData.map((section) => (
                    <div key={section.sectionID} className='section'>
                        <h3 onClick={() => toggleSection(section.sectionID)}>
                        &nbsp;&nbsp;{expandedSections[section.sectionID] ? <FaChevronUp /> : <FaChevronDown />}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{section.sectionName}
                        </h3>
                        {expandedSections[section.sectionID] && (
                            <p>
                                {chaptersData
                                    .filter(chapter => chapter.sectionID === section.sectionID)
                                    .map((chapter) => {
                                        const topic = topicsData.find(topic => topic.chapterID === chapter.chapterID);
                                        return (
                                            <p key={chapter.chapterID} className='p1'>
                                                {topic && topic.topicMediaType && (
                                                    <span className='topicMediaType'>
                                                        {topic.topicMediaType === 'pdf' ? (
                                                            <>
                                                                <BsFilePdf className='fi' /> &nbsp;&nbsp;&nbsp;
                                                                <span
                                                                    className='pdf'
                                                                    onClick={() => window.open(topic.topicMediaURL, '_blank')}
                                                                >
                                                                    {chapter.chapterName}
                                                                </span>
                                                            </>
                                                        ) : topic.topicMediaType === 'video' ? (
                                                            <>
                                                                <PiVideoLight className='vi' />
                                                                <span
                                                                    className='video'
                                                                    onClick={() => handleVideoClick(topic.topicMediaURL, section.sectionName, chapter.chapterName)}
                                                                >
                                                                    {chapter.chapterName}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            topic.topicMediaType
                                                        )}
                                                    </span>
                                                )}
                                                {topic && topic.topicDuration && (
                                                    <span className='topicDuration'>
                                                        <span className='preview'>preview</span> ({topic.topicDuration})
                                                    </span>
                                                )}
                                            </p>
                                        );
                                    })}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>
                            <p className='cp'>course preview <span className='cross'>&times;</span></p>
                            <strong className='st'>{currentSectionName} - {currentChapterName}</strong>
                        </span>
                        <video
                            ref={videoRef}
                            width="600"
                            className='v'
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            disablePictureInPicture
                            controls={false}
                            autoPlay={false}
                        >
                            <source src={currentVideoURL} type="video/mp4" />
                        </video>
                        <div className="seekbar-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={(currentTime / duration) * 100}
                                onChange={handleSeek}
                                className="seekbar"
                            />
                            <button onClick={handleBackward} className='cw'><span className='five'>- 5</span><GiAnticlockwiseRotation /></button>
                            <button onClick={togglePlayPause} className="playPause">
                                {isPlaying ? <FaPause /> : <IoIosPlay />}
                            </button>
                            <button onClick={handleForward} className='cw'><GiClockwiseRotation /><span className='five'>+ 5</span></button>
                            <span className="time">{formatTime(currentTime)} / {formatTime(duration)}</span>
                            <span className='vsf'>
                            <button onClick={toggleMute} className="mute">
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <button className='sti'><IoSettings /></button>
                            <button onClick={toggleFullscreen} className="fullscreen">
                                <FaExpand />
                            </button>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Section;
