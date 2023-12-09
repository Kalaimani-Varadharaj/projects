const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/addPolicyHolder', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const email = req.body.email;
    const mobileNumber = req.body.mobileNumber;
    const dateOfBirth = req.body.dateOfBirth;

    // Validate the input fields and collect error messages
    const errors = {};

    if (!firstName || !firstName.trim()) {
        errors.firstName = 'First Name is required';
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
        errors.firstName = 'First Name must contain only alphabets';
    }

    if (!lastName || !lastName.trim()) {
        errors.lastName = 'Last Name is required';
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
        errors.lastName = 'Last Name must contain only alphabets';
    }

    if (!gender || !gender.trim()) {
        errors.gender = 'Gender is required';
    } else if (!/^(Male|Female|Others)$/i.test(gender)) {
        errors.gender = 'Gender should be Male, Female, or Others and should not contain numbers.';
    }

    if (!mobileNumber || !mobileNumber.trim()) {
        errors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
        errors.mobileNumber = 'Mobile Number must be 10 digits and it should be a number';
    }

    if (!email || !email.trim()) {
        errors.email = 'Email Id is required';
    } else if (!/^[^0-9][a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        errors.email = 'Please provide a valid email format (e.g., abc123@gmail.com)';
    }

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dateOfBirth).getFullYear();

    if (birthYear > currentYear) {
        errors.dateOfBirth = 'Date of birth cannot be in the future.';
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({ errors });
    } else {
        try {
            // Creating a request body with the data 
            const requestBody = {
                firstName,
                lastName,
                gender,
                email,
                mobileNumber,
                dateOfBirth,
            };

            // Making a POST request to the Spring Boot endpoint
            const springBootResponse = await fetch('http://localhost:8080/createPolicyHolder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (springBootResponse.ok) {
                // Handling the success response from Spring Boot
                const springBootData = await springBootResponse.json();
                console.log('Policy holder added:', springBootData);
                res.status(200).json({ message: 'Policy Holder details Added successfully!!!' });
            }
            else {
                // Handle the error response from Spring Boot
                const springBootError = await springBootResponse.json();
                console.error('Error adding policy holder:', springBootError);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            // Handle network or other errors
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

//fetch all policy holders
router.get('/fetchAllPolicyHolders', async (req, res) => {
    try {
        const springBootResponse = await fetch('http://localhost:8080/fetchAllPolicyHolders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (springBootResponse.ok) {
            const springBootData = await springBootResponse.json();
            res.status(200).json(springBootData);
        } else {
            const springBootError = await springBootResponse.json();
            console.error('Error fetching policy holders:', springBootError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//fetch by holder Id
router.get('/fetchById/:id', async (req, res) => {
    const holderId = req.params.id; // Get the ID from the URL parameter

    try {
        // Make a GET request to the Spring Boot endpoint to fetch details by holderId
        const springBootResponse = await fetch(`http://localhost:8080/fetchPolicyHolderById/${holderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (springBootResponse.ok) {
            // Handle the success response from Spring Boot
            const springBootData = await springBootResponse.json();
            res.status(200).json(springBootData);
        } else {
            // Handle the error response from Spring Boot
            const springBootError = await springBootResponse.json();
            console.error('Error fetching policy holder by ID:', springBootError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        // Handle network or other errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
