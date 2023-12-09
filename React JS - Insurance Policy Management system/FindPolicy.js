import React, { Component } from 'react';
import PolicyService from '../service/PolicyService';

export default class FindPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyNumber: '',
      policy: null,
      errorMessage: '',
    };

    this.handleFindPolicy = this.handleFindPolicy.bind(this);
  }

  handleFindPolicy() {
    const { policyNumber } = this.state;

    PolicyService.getPolicyByNumber(policyNumber)
      .then(responseData => {
        if (!responseData.data) {
          this.setState({ policy: null, errorMessage: "Policy Number is not exist" });
        } else {
          this.setState({ policy: responseData.data, errorMessage: '' });
        }

      })
      .catch(error => {
        this.setState({ policy: null, errorMessage: error.message });
      });
  }

  render() {
    const { policyNumber, policy, errorMessage } = this.state;

    return (
      <div style={{ border: '1px solid black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Find Policy by Number</h2>
        <label>
          Enter Policy Number:
          <input type="number" value={policyNumber} onChange={e => this.setState({ policyNumber: e.target.value })} />
        </label>
        <button onClick={this.handleFindPolicy}>search</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {policy && (
          <div>
            <p><strong>Policy Number:</strong> {policy.policyNumber}</p>
            <p><strong>Policy Type:</strong> {policy.policyType}</p>
            <p><strong>Total Amount:</strong> {policy.totalAmount}</p>
            <p><strong>Premium Rate(%):</strong> {policy.premiumRate}</p>
            <p><strong>Premium Amount:</strong> {policy.premiumAmount}</p>
            <p><strong>Policy Holder ID:</strong> {policy.holderId}</p>


            {/* Display other properties as needed */}
          </div>
        )}
      </div>
    );
  }

}