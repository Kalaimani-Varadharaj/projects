import React, { Component } from 'react';
import PolicyHolderService from '../service/PolicyHolderService';

export default class AddComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleChange = this.handleChange.bind(this);
    this.saveHolder = this.saveHolder.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  
  validateForm = () => {
    const { firstName, lastName, email, mobileNumber, gender, dateOfBirth } = this.state;
    const errors = {};

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
      errors.mobileNumber = 'Mobile Number must be 10 digits and it should be a number';
    }

    if (!email.trim()) {
      errors.email = 'Email Id is required';
    } else if (!/^[^0-9][a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      errors.email = 'Please provide a valid email format (e.g., abc123@gmail.com)';
    }

    // Validate Date of Birth
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dateOfBirth).getFullYear();

    if (birthYear > currentYear) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  saveHolder(event) {
    event.preventDefault();

    if (this.validateForm()) {
      const holder = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        email: this.state.email,
        mobileNumber: this.state.mobileNumber,
        dateOfBirth: this.state.dateOfBirth
      };

      PolicyHolderService.addPolicyHolder(holder)
        .then(responseData => {
          console.log('Policy holder added:', responseData);

          this.setState({ successMessage: 'Policy Holder details Added successfully!!!', errorMessage: '' });
          //window.alert('Policy Holder details Added successfully');
        })
        .catch(error => {
          console.error('Error adding policy holder:', error);
          // Handle errors as needed
          this.setState({ successMessage: '', errorMessage: error.message + ' ' + '. Please check the policy holder ID' });
          //window.alert('Policy Holder details not added')
        });
    }

  };

  render() {
    const { errors } = this.state;

    return (
      <div style={{ maxHeight: '130%', overflowY: 'auto' }}>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Add Policy Holder</h3>
              <div className="card-body">
                {this.state.successMessage && (
                  <p style={{ color: 'green' }}>{this.state.successMessage}</p>
                )}
                {this.state.errorMessage && (
                  <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                )}
                <form onSubmit={this.saveHolder}>

                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
                    />
                    {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
                  </div>
                  <div className="form-group">
                    <label>Gender:</label>
                    <select
                      name="gender"
                      className="form-control"
                      value={this.state.gender}
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
                    />
                    {errors.email && <div className="error-msg">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label>Mobile Number:</label>
                    <div className="input-group">

                      <input
                        type="tel"
                        name="mobileNumber"
                        className="form-control"
                        value={this.state.mobileNumber}
                        onChange={this.handleChange}
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
                      onChange={this.handleChange}
                    />
                    {errors.dateOfBirth && <div className="error-msg">{errors.dateOfBirth}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add Holder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}