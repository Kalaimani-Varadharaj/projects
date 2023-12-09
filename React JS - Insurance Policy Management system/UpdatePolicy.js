import React, { Component } from 'react';
import PolicyService from '../service/PolicyService';

export default class UpdatePolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policyNumber: '',
            policyType: '',
            totalAmount: '',
            premiumRate: '',
            premiumAmount: '',
            // holderId: this.props.policyHolderId, 
            errors: {},
            successMessage: '',
            errorMessage: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.updatePolicy = this.updatePolicy.bind(this);
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    fetchExistingPolicy = (policyNumber) => {
        // Clear the previous error message
        console.log('fetchExistingPolicy called with policyNumber:', policyNumber);
        this.setState({ errorMessage: '' });

        // Check if policyNumber is not empty before making the API request
        if (policyNumber) {
            PolicyService.getPolicyByNumber(policyNumber)
                .then((responseData) => {
                    console.log('API Response data:', responseData); // Add this line
                    if (responseData && responseData.status === "success") {
                        // Populate form fields with existing data
                        const { policyNumber, policyType, totalAmount, premiumRate, premiumAmount } = responseData.data;
                        this.setState({
                            policyNumber,
                            policyType,
                            totalAmount,
                            premiumRate,
                            premiumAmount,
                            holderId: this.props.policyHolderId,
                            errorMessage: '',
                        });
                    } else {
                        // Handle the case where no data is found for the given policy number
                        this.setState({
                            errorMessage: responseData.message || 'No data found for the provided Policy Number.',
                            //policyNumber: '',
                            policyType: '',
                            totalAmount: '',
                            premiumRate: '',
                            premiumAmount: '',
                            //holderId: this.props.policyHolderId,
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching policy details:', error);
                    this.setState({
                        errorMessage: 'Error fetching policy details. Please try again.',
                    });
                });

        }
    };

    calculatePremium = () => {
        const { totalAmount, premiumRate } = this.state;

        if (!isNaN(totalAmount) && !isNaN(premiumRate)) {
            const premiumAmount = (totalAmount * premiumRate) / 100;
            this.setState({ premiumAmount });
        }
    };


    validateForm = () => {
        const { policyType, policyNumber, policyHolderId, totalAmount, premiumAmount, premiumRate } = this.state;
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

        // if (!policyHolderId) {
        //     errors.policyHolderId = 'Policy Holder ID is required';
        // } else if (!/^\d+$/.test(policyHolderId)) {
        //     errors.policyHolderId = 'Policy Holder ID must contain only numbers';
        // }


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

        if (!premiumRate) {
            errors.premiumRate = 'Premium Rate is required';
        } else if (!/^\d+$/.test(premiumRate)) {
            errors.premiumRate = 'Premium Rate must contain only numbers';
        }


        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    updatePolicy(event) {
        event.preventDefault();

        if (this.validateForm()) {
            const { policyHolderId } = this.props;
            const updatedPolicy = {
                policyNumber: this.state.policyNumber, // Include policyNumber in the object
                policyType: this.state.policyType,
                totalAmount: this.state.totalAmount,
                premiumAmount: this.state.premiumAmount,
                premiumRate: this.state.premiumRate,
                holder: {
                    holderId: this.state.policyHolderId
                }
            };

            PolicyService.updatePolicy(this.state.policyNumber, updatedPolicy)
                .then(responseData => {
                    console.log('Policy updated:', responseData);
                    //window.alert('Policy details updated successfully');
                    this.setState({ successMessage: 'Policy details Updated successfully!!!', errorMessage: '' });
                })
                .catch(error => {
                    console.error('Error updating policy:', error);
                    // Handle errors as needed
                    this.setState({ successMessage: '', errorMessage: 'Please check the policy number' });
                    //window.alert('Policy details not updated. Please check the policy number')
                });
        }

    };

    handleNumberChange = (event) => {
        const policyNumber = event.target.value;
        console.log('handleNumberChange called with policyNumber:', policyNumber);

        // Update the holder ID input field
        this.setState({ policyNumber });
        // Fetch existing details based on the entered holder ID
        this.fetchExistingPolicy(policyNumber);
    };

    handlePolicyTypeChange = (event) => {
        const policyType = event.target.value;
        this.setState({ policyType });
    };

    handleIdChange = (event) => {
        const holderId = event.target.value;
        this.setState({ holderId });
    };

    handleTotalAmountChange = (event) => {
        const totalAmount = event.target.value;
        this.setState({ totalAmount });
    };

    handlePremiumRateChange = (event) => {
        const premiumRate = event.target.value;
        this.setState({ premiumRate });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Policy </h3>
                        <div className="card-body">
                            {this.state.successMessage && (
                                <p style={{ color: 'green' }}>{this.state.successMessage}</p>
                            )}
                            {this.state.errorMessage && (
                                <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                            )}
                            <form onSubmit={this.updatePolicy}>
                                <div className="form-group">
                                    <label>Policy Number:</label>
                                    <input
                                        type="text"
                                        name="policyNumber"
                                        className="form-control"
                                        value={this.state.policyNumber}
                                        onChange={this.handleNumberChange}
                                    />
                                    {errors.policyNumber && <div className="error-msg">{errors.policyNumber}</div>}
                                </div>
                                {/* <div className="form-group">
                                    <label>Policy Holder ID:</label>
                                    <input
                                        type="number"
                                        name="holderId"
                                        className="form-control"
                                        value={this.state.holderId}
                                        onChange={this.handleIdChange}
                                    />
                                    {errors.policyHolderId && <div className="error-msg">{errors.policyHolderId}</div>}
                                </div> */}

                                <div className="form-group">
                                    <label>Policy Type:</label>
                                    <select
                                        name="policyType"
                                        className="form-control"
                                        value={this.state.policyType}
                                        onChange={this.handlePolicyTypeChange}
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
                                        onChange={this.handleTotalAmountChange}
                                        onBlur={this.calculatePremium} // Call calculatePremium on blur
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
                                        onChange={this.handlePremiumRateChange}
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
                                        value={this.state.premiumAmount} // Display the calculated premium amount
                                        readOnly // Make the input read-only
                                    />
                                    {errors.premiumAmount && <div className="error-msg">{errors.premiumAmount}</div>}
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update Policy
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}