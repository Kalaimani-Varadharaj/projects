import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
    const [firstName, setFirstName] = useState(''); // State to store the first name
    const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success
    const [successMessage, setsuccessMessage] = useState(''); // New state for error message
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message
    const navigate = useNavigate();

    const validateEmail = (email) => {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    };
    

    const validatePassword = (password) => {
      return password.length >= 6;
    };
    

    const handleLogin = (e) => {
      e.preventDefault();
      // Reset previous error messages
    setEmailError('');
    setPasswordError('');
    setErrorMessage(''); // Clear previous error messages

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!isPasswordValid) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

      const apiUrl = 'http://localhost:8080/api/user/login';
      const requestBody = {
        email: email,
        password: password,
      };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data.status:', data.status);
          if (data.status) {
            // Successful login
            console.log('Login successful');
            setLoginSuccess(true);
            setFirstName(data.firstName); // Store the first name in state
            setsuccessMessage("Login successful");
            alert('Login successful');
            onLogin();
            navigate('/layout');
          } else {
            // Failed login
            console.error('Login failed');
            //alert('Login failed');
            setLoginSuccess(false);

            setFirstName('');
            setErrorMessage('User not registered'); // Set the error message from the server
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    };

    return (
      <div style={{ border: '1px solid black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <div className="text-danger">{passwordError}</div>}
          </div>
          <button type="submit">Login</button>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    );
  };

  export default Login;



