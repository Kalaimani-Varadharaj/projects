import React, { Component } from 'react';
import PolicyHolderService from '../service/PolicyHolderService';

class HolderListByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '', // The character to search for
      policyHolders: [], // Store the fetched policy holders
      error: null, // Store any error messages
    };
  }

  handleInputChange = (event) => {
    this.setState({ firstName: event.target.value });
  };

  fetchPolicyHolders = () => {
    const { firstName } = this.state;

    PolicyHolderService.getHoldersByName(firstName)
      .then(responseData => {
        if (responseData.data.length === 0) {
          this.setState({ policyHolders: [], error: `No policy holders found whose name starts with "${firstName}"` });
        } else {
          this.setState({ policyHolders: responseData.data, error: '' });
        }
      })
      .catch(error => {
        console.error('Error fetching policy holders:', error);
        this.setState({ policyHolders: [], error: 'Failed to fetch data from the server.' });
      });
  };

  render() {
    const { firstName, policyHolders, error } = this.state;

    return (
      <div style={{ border: '1px solid black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Fetch Policy Holders by Name</h2>
        <div>
          <label>Enter starting character:</label>
          <input type="text" value={firstName} onChange={this.handleInputChange} />
          <div style={{ marginTop: '10px' }}>
            <button onClick={this.fetchPolicyHolders}>Fetch Policy Holders</button>
          </div>

        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h3>Policy Holders:</h3>

        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {policyHolders.map((policyHolder) => (
            <li key={policyHolder.holderId} style={{ marginBottom: '20px' }}>
              <strong>First Name:</strong> {policyHolder.firstName}<br />
              <strong>Last Name:</strong> {policyHolder.lastName}<br />
              <strong>Gender:</strong> {policyHolder.gender}<br />
              <strong>Email:</strong> {policyHolder.email}<br />
              <strong>Mobile Number:</strong> {policyHolder.mobileNumber}<br />
              <strong>Date of Birth:</strong> {policyHolder.dateOfBirth}<br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HolderListByName;
