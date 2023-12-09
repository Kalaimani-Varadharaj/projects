import React, { Component } from 'react';
import PolicyHolderService from '../service/PolicyHolderService';

class CustomizedPolicyHolders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premiumAmount: '', // The premium amount to filter by
      data: [], // Store the fetched data
      error: '', // Store any error messages
    };
  }

  handleInputChange = (event) => {
    this.setState({ premiumAmount: event.target.value });
  };

  fetchData = () => {
    const { premiumAmount } = this.state;


    PolicyHolderService.getCustomizedData(premiumAmount)
      .then(responseData => {
        if (responseData.data.length === 0) {
          this.setState({ data: [], error: `No policy holders found whose premium amount greater than "${premiumAmount}"` });
        } else {
          this.setState({ data: responseData.data, error: '' });
        }
      })
      .catch(error => {
        console.error('Error fetching customized data:', error);
        this.setState({ data: [], error: `No policy holders found whose premium amount greater than "${premiumAmount}"` });
      });
  };

  render() {
    const { premiumAmount, data, error } = this.state;

    return (
      <div style={{ border: '1px solid black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Fetch Customized Data</h2>
        <div>
          <label>Enter premium amount:</label>
          <input type="number" value={premiumAmount} onChange={this.handleInputChange} />
          <div style={{ marginTop: '10px' }}>
            <button onClick={this.fetchData}>Fetch Data</button>
          </div>

        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {data.map((item, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <strong>First Name:</strong> {item.firstName}<br />
              <strong>Mobile Number:</strong> {item.mobileNumber}<br />
              <strong>Policy Type:</strong> {item.type}<br />
              <strong>Premium Amount:</strong> {item.premiumAmount}<br />
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default CustomizedPolicyHolders;
