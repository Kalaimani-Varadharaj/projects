import React, { Component } from 'react';
import PolicyHolderService from '../service/PolicyHolderService';

export default class FindHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          holderId: '',
          policyHolders: null,
          errorMessage: '',
        };
    
        this.handleFindHolder = this.handleFindHolder.bind(this);
      }
    
      handleFindHolder() {
        const { holderId } = this.state;
    
        PolicyHolderService.getPolicyHolderById(holderId)
          .then(responseData => {
            if (!responseData.data) {
              // If no data is returned, set the error message
              this.setState({ policyHolders: null, errorMessage: 'The Policy Holder ID is not present', });
          } else {
              this.setState({ policyHolders: responseData.data, errorMessage: '' });
          }
          })
          .catch(error => {
            this.setState({ policyHolders: null, errorMessage: error.message });
          });
      }

      render(){
        const { holderId, policyHolders, errorMessage} = this.state;

        return (
          <div style={{ border: '1px solid black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Find Policy Holder by ID</h2>
        <label>
          Enter Policy Holder ID:
          <input type="number" value={holderId} onChange={e => this.setState({ holderId: e.target.value })} />
        </label>
        <button onClick={this.handleFindHolder}>Search</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {policyHolders && (
          <div>
            <p><strong>Policy Holder ID:</strong> {policyHolders.holderId}</p>
            <p><strong>First Name:</strong> {policyHolders.firstName}</p>
            <p><strong>Last Name:</strong> {policyHolders.lastName}</p>
            <p><strong>Gender:</strong> {policyHolders.gender}</p>
            <p><strong>Email:</strong> {policyHolders.email}</p>
            <p><strong>Mobile Number:</strong> {policyHolders.mobileNumber}</p>
            <p><strong>Date of Birth:</strong> {policyHolders.dateOfBirth}</p>
            {/* Display other properties as needed */}
          </div>
        )}
        </div>
        );
      }
    
}