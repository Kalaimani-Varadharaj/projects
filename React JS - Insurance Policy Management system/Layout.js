import React, { useState } from 'react';
//import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink
import '../App.css'
import FooterComponent from './FooterComponent';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import AddComponent from './AddComponent';
import UpdateComponent from './UpdateComponent';
import FindHolder from './FindHolder';
import ListOfPolicyHolders from './ListOfPolicyHolders';
import Login from './Login';
import AddPolicy from './AddPolicy';
import UpdatePolicy from './UpdatePolicy';
import FindPolicy from './FindPolicy';
import ListOfPolicies from './ListOfPolicies';
import HolderListGreaterThanId from './HolderListGreaterThanId';
import HolderListByName from './HolderListByName';
import CustomizedPolicyHolders from './CustomizedPolicyHolders';
import About from './About'; // Import the About component
import SignUp from './SignUp'
import Content from './Content';

const Layout = () => {
    const headerStyle = {
        backgroundColor: 'grey',
        color: 'white',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space evenly between logo and heading
    };

    const logoStyle = {
        height: '60px', // Increase the height of the image
        marginRight: '30px', // Add some spacing between the logo and heading
        marginLeft: '1px', 
      };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        // Check if the user is logged in before toggling the dropdown
        if (isLoggedIn) {
            setIsDropdownOpen(!isDropdownOpen);
        } else {
            alert('Please log in to access this feature.'); 
        }
        setIsDropdownOpen(!isDropdownOpen);
    };


    // Function to handle successful login
    const handleLogin = () => {
        // Perform your login logic, and if successful, set isLoggedIn to true
        setIsLoggedIn(true);
    };


    return (
        <div>
            {/* Header */}
            <header style={headerStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 style={{ color: 'Black', marginBottom: '0' }}> <img
                                src="https://png.pngtree.com/template/20190316/ourmid/pngtree-insurance-logo-vector-image_80257.jpg" // Replace with your image URL
                                //alt="Insurance Logo"
                                style={logoStyle} 
                            />KM Insurance</h1> {/* Style your heading */}
                        </div>
                        <div className="col-md-6 text-right">
                            <ul className="nav ml-auto">
                                <li className="nav-item" style={{ marginRight: '20px' }}>
                                    <NavLink activeClassName="active-link" exact="true" to="/" className="nav-link darkblue-link">Home</NavLink>
                                </li>
                                <li className="nav-item" style={{ marginRight: '20px' }}>
                                    <NavLink activeClassName="active-link" to="/about" className="nav-link darkblue-link">About</NavLink>
                                </li>
                                <li className="nav-item">

                                    <NavLink activeClassName="active-link" to="/login" className="nav-link darkblue-link">Login</NavLink>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2nd Row */}
            <div style={{ height: '80%', display: 'grid', gridTemplateColumns: '0.8fr 2fr 1fr', gridGap: '10px' }}>
                <div style={{ backgroundColor: 'white', padding: '10px' }}>
                    {isLoggedIn && (
                        <div style={{ textAlign: 'center', color: 'green', padding: '7px', fontSize: '19px', margin: '0 auto', maxWidth: '300px' }}>
                            <p>You are successfully logged in. You can access the other links now.</p>

                        </div>
                    )}
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li>
                            <h3>Policy Holders Details</h3>
                        </li>

                        <li>
                            {!isLoggedIn ? (
                                <span>Add Policy Holder Details</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/AddComponent" className="nav-link orchid-link">Add Policy Holder Details</NavLink>
                            )}
                        </li>

                        <li>
                            {!isLoggedIn ? (
                                <span>Update Policy Holder Details</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/UpdateComponent" className="nav-link orchid-link">Update Policy Holder Details</NavLink>
                            )}
                        </li>
                        <li>
                            {!isLoggedIn ? (
                                <span>Find By Holder ID</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/FindHolder" className="nav-link orchid-link">Find By Holder ID</NavLink>
                            )}
                        </li>
                        <li>
                            {!isLoggedIn ? (
                                <span>Find ALL Holders Details</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/ListOfPolicyHolders" className="nav-link orchid-link">Find All Holders Details</NavLink>
                            )}
                        </li>

                        <li>
                            <h3>Policy Details</h3>
                        </li>

                        <li>
                            {!isLoggedIn ? (
                                <span>Add Policy Details</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/AddPolicy" className="nav-link orchid-link">Add Policy Details</NavLink>
                            )}
                        </li>

                        <li>
                            {!isLoggedIn ? (
                                <span>Update Policy Details</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/UpdatePolicy" className="nav-link orchid-link">Update Policy Details</NavLink>
                            )}
                        </li>
                        <li>
                            {!isLoggedIn ? (
                                <span>Find By Policy Number</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/FindPolicy" className="nav-link orchid-link">Find By Policy Number</NavLink>
                            )}
                        </li>

                        <li>
                            {!isLoggedIn ? (
                                <span>Find All Policy Details</span>
                            ) : (
                                <NavLink activeClassName="active-link" to="/Components/ListOfPolicies" className="nav-link orchid-link">Find All Policy Details</NavLink>
                            )}
                        </li>

                        <li>
                            {!isLoggedIn ? (
                                <span>
                                    <button onClick={() => alert('Please log in to access this feature.')}>
                                        Search By/Filter By &#9662;
                                    </button>
                                </span>
                            ) : (
                                <div className="dropdown">
                                    <button onClick={toggleDropdown} className="dropdown-button">
                                        Search By/Filter By &#9662;
                                    </button>
                                    <div className={`dropdown-content ${isDropdownOpen ? 'show-dropdown' : ''}`}>
                                        {/* <NavLink to="/Components/HolderListGreaterThanId" className="dropdown-item orchid-link">Holder List Greater Than ID</NavLink> */}
                                        <NavLink to="/Components/CustomizedPolicyHolders" className="dropdown-item orchid-link">Customized Policy Holders</NavLink>
                                        <NavLink to="/Components/HolderListByName" className="dropdown-item orchid-link">Holder List By Name</NavLink>
                                    </div>
                                </div>
                            )}
                        </li>

                    </ul>
                </div>

                <div style={{ backgroundColor: 'lightblue', padding: '10px', maxHeight: '100%', overflowY: 'auto' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/Components/AddComponent" element={<AddComponent />} />
                        <Route path="/Components/UpdateComponent" element={<UpdateComponent />} />
                        <Route path="/Components/FindHolder" element={<FindHolder />} />
                        <Route path="/Components/ListOfPolicyHolders" element={<ListOfPolicyHolders />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/Components/AddPolicy" element={<AddPolicy />} />
                        <Route path="/Components/UpdatePolicy" element={<UpdatePolicy />} />
                        <Route path="/Components/FindPolicy" element={<FindPolicy />} />
                        <Route path="/Components/ListOfPolicies" element={<ListOfPolicies />} />
                        <Route path="/Components/HolderListGreaterThanId" element={<HolderListGreaterThanId />} />
                        <Route path="/Components/CustomizedPolicyHolders" element={<CustomizedPolicyHolders />} />
                        <Route path="/Components/HolderListByName" element={<HolderListByName />} />
                        <Route path="/content" element={<Content />} />
                        
                    </Routes>

                </div>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKDcyptOJlL2AbqHCO0Jju4mqzbsVYYY2PEqjHnU6K9DWbY6TspSN5Y7n2Zmuco_1wd24&usqp=CAU" alt="Advertisement" style={{ width: '100%', maxHeight: '800px', objectFit: 'cover' }} />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoK2g-FBk_4vA00BQy2d__0gHpwl3qtIEeFey8KQbNIFyYvKuCawCwF2TObxDQlg55ATQ&usqp=CAU" alt="Advertisement" style={{ width: '100%', maxHeight: '800px', objectFit: 'cover' }} />
                    <p style={{ marginTop: '10px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '24px', animation: 'blink 2s infinite', color: 'orange', textTransform: 'uppercase' }}>Ensure </span>
                    </p>
                    <p style={{ marginTop: '10px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '24px', animation: 'blink 2s infinite', color: 'orange', textTransform: 'uppercase' }}>You Insure</span>
                    </p>
                    <p style={{ marginTop: '10px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '24px', animation: 'blink 2s infinite', color: 'orange', textTransform: 'uppercase' }}>For sure</span>
                    </p>
                </div>
            </div>

            {/* 3rd Row */}
            <div >
                <FooterComponent />
            </div>
        </div>

    )

}
export default Layout;