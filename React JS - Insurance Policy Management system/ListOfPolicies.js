import React, { Component } from 'react'
import PolicyService from '../service/PolicyService';

export default class ListOfPolicies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            policies: [],
        };
    }
    componentDidMount() {
        PolicyService.getPolicy().then(res => {
            this.setState({ policies: res.data });
        })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    render() {
        return (
            <div style={{ border: '1px solid black', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h2 className="text-center">Policies List</h2>
                <div className="row mt-4">

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Policy Number</th>
                                <th>Policy Type</th>
                                <th>Total Amount</th>
                                <th>Premium Rate(%)</th>
                                <th>Premium Amount</th>
                                <th>Holder ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.policies.map(
                                    policy =>
                                        <tr key={policy.policyNumber}>
                                            <td>{policy.policyNumber}</td>
                                            <td>{policy.policyType}</td>
                                            <td>{policy.totalAmount}</td>
                                            <td>{policy.premiumRate}</td>
                                            <td>{policy.premiumAmount}</td>
                                            <td>{policy.holderId}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


