import React, { Component } from 'react';
import PolicyService from '../service/PolicyService';

export default class AddPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policyNumber: '',
            policyType: '',
            totalAmount: '',
            premiumRate: '',
            premiumAmount: '',
            policyHolderId: this.props.policyHolderId, // Initialize from props
            errors: {},
            successMessage: '',
            errorMessage: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.savePolicy = this.savePolicy.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    calculatePremium = () => {
        const { totalAmount, premiumRate } = this.state;

        if (!isNaN(totalAmount) && !isNaN(premiumRate)) {
            const premiumAmount = (totalAmount * premiumRate) / 100;
            this.setState({ premiumAmount });
        }
    };

    validateForm = () => {
        const { policyType, policyNumber, totalAmount, premiumAmount, policyHolderId, premiumRate } = this.state;
        const errors = {};

        if (!policyType.trim()) {
            errors.policyType = 'Policy Type is required';
        } else if (!/^[A-Za-z\s-]+$/.test(policyType)) {
            errors.policyType = 'Policy type must contain only alphabets';
        }

        if (!policyNumber) {
            errors.policyNumber = 'Policy Number is required';
        } else if (!/^\d+$/.test(policyNumber)) {
            errors.policyNumber = 'Policy Number must contain only numbers';
        }

        if (!totalAmount) {
            errors.totalAmount = 'Total Amount is required';
        } else if (!/^\d+$/.test(totalAmount)) {
            errors.totalAmount = 'Total Amount must contain only numbers';
        }

        if (!premiumAmount) {
            errors.premiumAmount = 'Premium Amount is required';
        } else if (!/^\d+$/.test(premiumAmount)) {
            errors.premiumAmount = 'Premium Amount must contain only numbers';
        }

        if (!policyHolderId) {
            errors.policyHolderId = 'Policy Holder ID is required';
        } else if (!/^\d+$/.test(policyHolderId)) {
            errors.policyHolderId = 'Policy Holder ID must contain only numbers';
        }

        if (!premiumRate) {
            errors.premiumRate = 'Premium Rate is required';
        } else if (!/^\d+$/.test(premiumRate)) {
            errors.premiumRate = 'Premium Rate must contain only numbers';
        }
        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };


    savePolicy(event) {
        event.preventDefault();
        if (this.validateForm()) {
            const { policyHolderId, policyNumber } = this.state;

            // Check if the policy number already exists in the database
            PolicyService.getPolicyByNumber(policyNumber)
                .then(responseData => {
                    if (responseData && responseData.status === "success") {
                        // Policy number already exists, show an error message
                        this.setState({ successMessage: '', errorMessage: 'Policy number already exists. Please use a different policy number.' });
                    } else {
                        // Policy number is unique, proceed with adding the policy
                        const policy = {
                            policyNumber: policyNumber,
                            policyType: this.state.policyType,
                            totalAmount: this.state.totalAmount,
                            premiumAmount: this.state.premiumAmount,
                            premiumRate: this.state.premiumRate,
                            holder: {
                                holderId: policyHolderId
                            }
                        };

                        PolicyService.addPolicy(policy)
                            .then(responseData => {
                                console.log('Policy  added:', responseData);
                                this.setState({ successMessage: 'Policy details Added successfully!!!', errorMessage: '' });
                                //window.alert('Policy details Added successfully');
                            })
                            .catch(error => {
                                console.error('Error adding policy:', error);
                                // Handle errors as needed
                                //window.alert('Policy details not added')
                                this.setState({ successMessage: '', errorMessage: 'Policy details not added. Please check the policy holder ID' });
                            });
                    }
                })
                .catch(error => {
                    console.error('Error checking policy number:', error);
                    this.setState({ successMessage: '', errorMessage: 'Error checking policy number. Please try again.' });
                });
        }

    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Add Policy </h3>
                        <div className="card-body">
                            {this.state.successMessage && (
                                <p style={{ color: 'green' }}>{this.state.successMessage}</p>
                            )}
                            {this.state.errorMessage && (
                                <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                            )}
                            <form onSubmit={this.savePolicy}>

                                <div className="form-group">
                                    <label>Policy Holder ID:</label>
                                    <input
                                        type="number"
                                        name="policyHolderId"
                                        className="form-control"
                                        value={this.state.policyHolderId}
                                        onChange={this.handleChange}
                                    />
                                    {errors.policyHolderId && <div className="error-msg">{errors.policyHolderId}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Policy Number:</label>
                                    <input
                                        type="number"
                                        name="policyNumber"
                                        className="form-control"
                                        value={this.state.policyNumber}
                                        onChange={this.handleChange}
                                    />
                                    {errors.policyNumber && <div className="error-msg">{errors.policyNumber}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Policy Type:</label>
                                    <select
                                        name="policyType"
                                        className="form-control"
                                        value={this.state.policyType}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Select Policy Type</option>
                                        <option value="Health Insurance">Health Insurance</option>
                                        <option value="Short-Term Health Insurance">Short-Term Health Insurance</option>
                                        <option value="Life Insurance">Life Insurance</option>
                                        <option value="Home Insurance">Home Insurance</option>
                                        <option value="Motor Insurance">Motor Insurance</option>
                                        <option value="Disability Insurance">Disability Insurance</option>
                                        <option value="Travel Insurance">Travel Insurance</option>
                                    </select>
                                    {errors.policyType && <div className="error-msg">{errors.policyType}</div>}
                                </div>


                                <div className="form-group">
                                    <label>Total Amount:</label>
                                    <input
                                        type="number"
                                        name="totalAmount"
                                        className="form-control"
                                        value={this.state.totalAmount}
                                        onChange={this.handleChange}
                                        onBlur={this.calculatePremium}
                                    />
                                    {errors.totalAmount && <div className="error-msg">{errors.totalAmount}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Premium Rate (%):</label>
                                    <input
                                        type="number"
                                        name="premiumRate"
                                        className="form-control"
                                        value={this.state.premiumRate}
                                        onChange={this.handleChange}
                                        onBlur={this.calculatePremium} // Call calculatePremium on blur
                                    />
                                    {errors.premiumRate && <div className="error-msg">{errors.premiumRate}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Premium Amount:</label>
                                    <input
                                        type="number"
                                        name="premiumAmount"
                                        className="form-control"
                                        value={this.state.premiumAmount}
                                        onChange={this.handleChange}
                                    />
                                    {errors.premiumAmount && <div className="error-msg">{errors.premiumAmount}</div>}
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Add Policy
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}