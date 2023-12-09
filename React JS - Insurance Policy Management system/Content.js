import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: '',
      age: null,
      insuranceRate: null,
      totalAmount: '', // New state for Total Amount input
      premiumRate: '', // New state for Premium Rate input
      premiumAmount: null, // New state to store calculated premium amount
    };
  }

  // Function to calculate age from Date of Birth
  calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
      currentDate.getMonth() < dobDate.getMonth() ||
      (currentDate.getMonth() === dobDate.getMonth() &&
        currentDate.getDate() < dobDate.getDate())
    ) {
      return age - 1; // Subtract 1 year if birthday hasn't occurred yet
    }

    return age;
  };

  // Function to display rates based on age
  displayRates = (age) => {
    // Define  rate tiers based on age
    const rateTiers = [
      { ageRange: [18, 25], ratePercentage: 5 },
      { ageRange: [26, 35], ratePercentage: 6 },
      { ageRange: [36, 45], ratePercentage: 7 },
      { ageRange: [46, 55], ratePercentage: 8 },
      { ageRange: [56, 65], ratePercentage: 9 },
      { ageRange: [66, 100], ratePercentage: 10 },
    ];

    // Find the applicable rate based on age
    let applicableRatePercentage = null;
    for (const tier of rateTiers) {
      const [minAge, maxAge] = tier.ageRange;
      if (age >= minAge && age <= maxAge) {
        applicableRatePercentage = tier.ratePercentage;
        break; // Exit loop once we find the applicable rate
      }
    }

    if (applicableRatePercentage !== null) {
      return `Your insurance rate is ${applicableRatePercentage}% of your premium.`;
    } else {
      return 'Sorry, we do not have rates available for your age.';
    }
  };

  handleDateChange = (event) => {
    const dob = event.target.value;
    const age = this.calculateAge(dob);
    const insuranceRate = this.displayRates(age);

    this.setState({ dob, age, insuranceRate });
  };

  // Function to calculate premium amount
  calculatePremium = () => {
    const { totalAmount, premiumRate } = this.state;

    if (!isNaN(totalAmount) && !isNaN(premiumRate)) {
      const premiumAmount = (totalAmount * premiumRate) / 100;
      this.setState({ premiumAmount });
    }
  };

  // Handle changes in the Total Amount input
  handleTotalAmountChange = (event) => {
    const totalAmount = event.target.value;
    this.setState({ totalAmount }, this.calculatePremium);
  };

  // Handle changes in the Premium Rate input
  handlePremiumRateChange = (event) => {
    const premiumRate = event.target.value;
    this.setState({ premiumRate }, this.calculatePremium);
  };


  render() {
    return (
      <div style={{ border: '2px solid black', padding: '20px', height: '110%', width: '80%', overflowY: 'auto', marginLeft: '10%', marginRight: '10%' }}>
        <h3>Why Insurance Policy?</h3>
        <p>
          Insurance is a financial product that provides protection against
          specific risks or uncertainties. It offers various benefits,
          including financial security and peace of mind.
        </p>
        <p>
          Insurance policies help individuals and families safeguard their financial future by providing a safety net in case of unexpected events or emergencies.
        </p>

        <h3>What is Premium?</h3>
        <p>Premium is the regular payment you make to our company in exchange for your insurance coverage. It's the cost of maintaining your insurance policy and ensuring that you're protected in case of covered events.</p>
        <h3>Premium Calculation</h3>
        <p>
          Premium is calculated for one year using the following formula:
        </p>

        <code>
          Premium = (Sum Insured × Rate) / 100
        </code>

        <p>
          Where:
        </p>
        <ul>
          <li><strong>Sum Insured:</strong> The total amount of coverage or the value of the insured item.</li>
          <li><strong>Rate:</strong> The percentage rate at which the premium is calculated.</li>
        </ul>

        <p>
          The premium is determined by multiplying the sum insured by the rate percentage and then dividing by 100. This formula ensures that you pay a proportionate premium based on the value of your coverage and the applicable rate for one year.
        </p>
        <h3>Rate Tiers</h3>
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
          <li>&#10148; Age Range: 18-25, Rate Percentage: 5%</li>
          <li>&#10148; Age Range: 26-35, Rate Percentage: 6%</li>
          <li>&#10148; Age Range: 36-45, Rate Percentage: 7%</li>
          <li>&#10148; Age Range: 46-55, Rate Percentage: 8%</li>
          <li>&#10148; Age Range: 56-65, Rate Percentage: 9%</li>
          <li>&#10148; Age Range: 66-100, Rate Percentage: 10%</li>
        </ul>
        <h4>Calculate Insurance Rate</h4>
        <div style={{ border: '1px solid black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
          <Form>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={this.state.dob}
                onChange={this.handleDateChange}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                value={this.state.age !== null ? this.state.age : ''}
                readOnly
              />
            </Form.Group>
          </Form>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {this.state.dob && (
            <span>
              <span style={{ color: 'green', fontWeight: 'bold' }}>Insurance Rates: </span>
              {this.state.insuranceRate !== null ? (
                <span style={{ color: 'green' }}>{this.state.insuranceRate}</span>
              ) : (
                <span style={{ color: 'red' }}>Sorry, no rates available for your age.</span>
              )}
            </span>
          )}
        </div>

        {/* Add Total Amount input */}
        <Form.Group controlId="formTotalAmount">
          <Form.Label>Enter The Total Amount :</Form.Label>
          <Form.Control
            type="number"
            value={this.state.totalAmount}
            onChange={this.handleTotalAmountChange}
          />
        </Form.Group>

        {/* Add Premium Rate input */}
        <Form.Group controlId="formPremiumRate">
          <Form.Label>Enter The Calculated Premium Rate (%) :</Form.Label>
          <Form.Control
            type="number"
            value={this.state.premiumRate}
            onChange={this.handlePremiumRateChange}
          />
        </Form.Group>

        {/* Display Premium Amount */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {this.state.premiumAmount !== null && (
            <span>
              <span style={{ color: 'darkblue' }}>Premium Amount ({`(${this.state.totalAmount} × ${this.state.premiumRate}) / 100`}): </span>
              <span style={{ color: 'green', fontWeight: 'bold'}}>{this.state.premiumAmount}</span>

            </span>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', textDecoration: 'underline' }}>
                <Link to="/">Go back</Link>
        </div>
      </div>
    );
  }
}

export default Content;
