import React, { Component } from 'react';
import PolicyHolderService from '../service/PolicyHolderService';
//import { useNavigate } from 'react-router-dom';

class UpdateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holderId: '',
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            mobileNumber: '',
            dateOfBirth: '',
            errors: {},
            successMessage: '',
            errorMessage: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    // Function to fetch existing details based on holder ID
    fetchExistingDetails = (holderId) => {
        PolicyHolderService.getPolicyHolderById(holderId)
            .then((responseData) => {
                if (responseData && responseData.status === "success") {
                    // Populate form fields with existing data
                    const { holderId, firstName, lastName, gender, email, mobileNumber, dateOfBirth } = responseData.data;
                    this.setState({
                        holderId,
                        firstName,
                        lastName,
                        gender,
                        email,
                        mobileNumber,
                        dateOfBirth,
                        errorMessage: '',
                    });
                } else {
                    // Handle the case where no data is found for the given holder ID
                    this.setState({
                        errorMessage: 'No data found for the provided Policy Holder ID.',
                        firstName: '', // Reset these fields
                        lastName: '',
                        gender: '',
                        email: '',
                        mobileNumber: '',
                        dateOfBirth: '',
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching policy holder details:', error);
                this.setState({
                    errorMessage: 'Error fetching policy holder details. Please try again.',
                });
            });
    };


    validateForm = () => {
        const { firstName, lastName, email, mobileNumber, gender, holderId } = this.state;
        const errors = {};

        if (!holderId) {
            errors.holderId = 'Policy Holder ID is required';
        } else if (!/^\d+$/.test(holderId)) {
            errors.holderId = 'Policy Holder ID must contain only numbers';
        }

        if (!firstName.trim()) {
            errors.firstName = 'First Name is required';
        } else if (!/^[a-zA-Z]+$/.test(firstName)) {
            errors.firstName = 'First Name must contain only alphabets';
        }

        if (!lastName.trim()) {
            errors.lastName = 'Last Name is required';
        } else if (!/^[a-zA-Z]+$/.test(lastName)) {
            errors.lastName = 'Last Name must contain only alphabets';
        }


        if (!gender.trim()) {
            errors.gender = 'Gender is required';
        } else if (!/^(Male|Female|Others)$/i.test(gender)) {
            errors.gender = 'Gender should be Male, Female, or Others and should not contain numbers.';
        }

        if (!mobileNumber.trim()) {
            errors.mobileNumber = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            errors.mobileNumber = 'Mobile Number must be 10 digits';
        }

        if (!email.trim()) {
            errors.email = 'Email Id is required';
        } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            errors.email = 'Please provide a valid email format (e.g., abc123@gmail.com)';
        }

        this.setState({
            errors, // Update the errors state
        });

        return Object.keys(errors).length === 0;
    };


    updateHolder = (event) => {
        event.preventDefault();

        if (this.validateForm()) {
            const updatedHolder = {
                holderId: this.state.holderId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                email: this.state.email,
                mobileNumber: this.state.mobileNumber,
                dateOfBirth: this.state.dateOfBirth,
            };
            // const navigate = useNavigate();

            PolicyHolderService.updatePolicyHolder(this.state.holderId, updatedHolder)
                .then((responseData) => {
                    console.log('Policy holder updated:', responseData);
                    this.setState({ successMessage: 'Policy Holder details Updated successfully!!!', errorMessage: '' });
                    // Handle success as needed, e.g., navigate to a different page
                })
                .catch((error) => {
                    console.error('Error updating policy holder:', error);
                    this.setState({ successMessage: '', errorMessage: error.message + ' ' + '. Please check the policy holder ID' });
                    // Handle errors as needed
                });

        }

    };

    handleHolderIdChange = (event) => {
        const holderId = event.target.value;
        // Update the holder ID input field
        this.setState({ holderId });
        // Fetch existing details based on the entered holder ID
        this.fetchExistingDetails(holderId);
    };

    handleFirstNameChange = (event) => {
        const firstName = event.target.value;
        this.setState({ firstName });
    };

    handleLastNameChange = (event) => {
        const lastName = event.target.value;
        this.setState({ lastName });
    };

    handleGenderChange = (event) => {
        const gender = event.target.value;
        this.setState({ gender });
    };

    handleEmailChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    };

    handleMobileNumberChange = (event) => {
        const mobileNumber = event.target.value;
        this.setState({ mobileNumber });
    };

    handleDateOfBirthChange = (event) => {
        const dateOfBirth = event.target.value;
        this.setState({ dateOfBirth });
    };


    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Policy Holder</h3>
                        <div className="card-body">
                            {this.state.successMessage && (
                                <p style={{ color: 'green' }}>{this.state.successMessage}</p>
                            )}
                            {this.state.errorMessage && (
                                <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                            )}
                            <form onSubmit={this.updateHolder}>

                                <div className="form-group">
                                    <label>Policy Holder ID:</label>
                                    <input
                                        type="number"
                                        name="holderId"
                                        className="form-control"
                                        value={this.state.holderId}
                                        onChange={this.handleHolderIdChange}
                                    />
                                    {errors.holderId && <div className="error-msg">{errors.holderId}</div>}
                                </div>
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.firstName}
                                        onChange={this.handleFirstNameChange}
                                    />
                                    {errors.firstName && <div className="error-msg">{errors.firstName}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.lastName}
                                        onChange={this.handleLastNameChange}
                                    />
                                    {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Gender:</label>
                                    <select
                                        name="gender"
                                        className="form-control"
                                        value={this.state.gender}
                                        onChange={this.handleGenderChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                    />
                                    {errors.email && <div className="error-msg">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number:</label>
                                    <div className="input-group">
                                        {/* <div className="input-group-prepend">
                                            <span className="input-group-text">+ Country Code</span>
                                        </div> */}
                                        <input
                                            type="tel"
                                            name="mobileNumber"
                                            className="form-control"
                                            value={this.state.mobileNumber}
                                            onChange={this.handleMobileNumberChange}
                                        />
                                    </div>
                                    {errors.mobileNumber && <div className="error-msg">{errors.mobileNumber}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth:</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        className="form-control"
                                        value={this.state.dateOfBirth}
                                        onChange={this.handleDateOfBirthChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update Holder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UpdateComponent;