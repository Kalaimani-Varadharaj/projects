import React, { Component } from 'react'
import PolicyHolderService from '../service/PolicyHolderService';
import AddComponent from './AddComponent';

export default class ListOfPolicyHolders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            policyHolders: [],
            showAddForm: false, 

        };
    }
    componentDidMount() {
        PolicyHolderService.getPolicyHolders().then(res => {
            this.setState({ policyHolders: res.data });
        })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    toggleAddForm = () => {
        this.setState(prevState => ({
            showAddForm: !prevState.showAddForm,
        }));
    };

    render() {
        return (
            <div style={{ border: '1px solid black', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
                <h2 className="text-center">Policy Holders List</h2>
                
                <div className="row mt-4">
                    
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Policy Holder ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Date Of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.policyHolders.map(
                                    policyHolders =>
                                        <tr key={policyHolders.holderId}>
                                            <td>{policyHolders.holderId}</td>
                                            <td>{policyHolders.firstName}</td>
                                            <td>{policyHolders.lastName}</td>
                                            <td>{policyHolders.gender}</td>
                                            <td>{policyHolders.email}</td>
                                            <td>{policyHolders.mobileNumber}</td>
                                            <td>{policyHolders.dateOfBirth}</td>
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


