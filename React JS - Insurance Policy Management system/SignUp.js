// import React, { useState } from 'react';

// const SignUp = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSignup = (e) => {
//     e.preventDefault();

//     // Define the URL of your Spring Boot sign-up API endpoint
//     const apiUrl = 'http://localhost:8080/api/user/save'; // Replace with your actual API URL

//     // Create a request body with user registration data
//     const requestBody = {
//       firstName: name,
//       email: email,
//       password: password,
//     };

//     // Make a POST request to the sign-up API endpoint
//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json(); // Parse the JSON response
//       })
//         .then((data) => {
//           if (data.success) {
//             // Successful sign-up
//             console.log("Sign-up successful. You can now login.");
//             setSuccessMessage('Sign-up successful. You can now login.');
//             setErrorMessage('');
//           } else {
//             // Failed sign-up
//             console.error("Sign-up failed. Please try again.");
//             setSuccessMessage('');
//             setErrorMessage(data.message); // Display the error message from the API response
//           }
//         })
//         .catch((error) => {
//           // Handle any network or request error here
//           console.error('An error occurred:', error);
//           setSuccessMessage('');
//           setErrorMessage('Sign-up failed due to a network error.');
//         });
//   };

//   return (
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignup}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <p>
//         Already have an account?{' '}
//         <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
  });

  const [signupSuccess, setSignupSuccess] = useState(null); // State to track signup success
  const [signupError, setSignupError] = useState(null); // State to track signup errors

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };


  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/user/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Response Status:', response.status);
      console.log('Response Data:', data);


      if (!validateEmail(formData.email)) {
        setSignupError('Invalid email address');
        return;
      }

      if (!validatePassword(formData.password)) {
        setSignupError('Password must be at least 6 characters long');
        return;
      }

      if (response.status === 200) {
        //const data = await response.json();
        setSignupSuccess(data.message);
        setSignupError(null);
      } else {
        const errorData = await response.json();
        setSignupError(errorData.error || 'The email is already in use ');
        setSignupSuccess(null);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setSignupError('The email is already in use');
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Sign Up</h2>
      {signupSuccess && <p className="success-message">{signupSuccess}</p>}
      {signupError && <p className="error-message">{signupError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div >
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
