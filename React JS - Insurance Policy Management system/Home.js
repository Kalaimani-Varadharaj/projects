import React, { useState } from 'react';
import Cards from './Cards';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink
import '../App.css'



const Home = () => {

    // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false); // State to control the visibility of the login form

    const headerStyle = {
        backgroundColor: 'grey',
        color: 'white',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space evenly between logo and heading
    };



    const imageStyle = {
        backgroundImage: 'url("https://cdnlearnblog.etmoney.com/wp-content/uploads/2022/09/Term-Insurance-Plan-in-5-Steps-1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '50vh',
        width: '100%',
        float: 'left',
    };

    const contentStyle = {
        textAlign: 'center',
        padding: '20px',
    };

    

    const navigate = useNavigate();

    
    const handleLogin = () => {
        setShowLoginForm(true); // Display the login form when the button is clicked
    };


    return (
        <div>
            {/* Header */}
            <header style={headerStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 style={{ color: 'black', marginBottom: '0' }}>KM Insurance</h1> {/* Style your heading */}
                        </div>
                        
                    </div>
                </div>
            </header>

            {/* Image */}
            <div style={imageStyle}>
            </div>

            {/* Cards */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <h2 style={contentStyle}>Our Policies</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {/* Include your Cards component here */}
                        <Cards />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;

