
const POLICY_HOLDER_API_BASE_URL = "http://localhost:8080";

class PolicyHolderService {
  getPolicyHolders() {
    return fetch(`${POLICY_HOLDER_API_BASE_URL}/fetchAllPolicyHolders`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Policy Holder list:", data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching policy holders:', error);
        throw error;
      });
  }

  addPolicyHolder(policyHolders) {
    return fetch(`${POLICY_HOLDER_API_BASE_URL}/createPolicyHolder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(policyHolders),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Add Policy Holder:', data);
      return data;
    })
    .catch(error => {
      console.error('Erroe adding policy holder:',error);
      throw error;
    });
  }

  updatePolicyHolder(holderId, updatedHolder) {
    return fetch(`${POLICY_HOLDER_API_BASE_URL}/updatePolicyHolder/${holderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedHolder),
    })
    .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          // Handle the case where the policy holder update failed (e.g., holder not found)
          throw new Error('Policy holder update failed');
      }
  })
  .then(data => {
      console.log('Update Policy Holder:', data);
      return data;
  })
  .catch(error => {
      console.error('Error updating policy holder:', error);
      throw error;
  });
  }

  getPolicyHolderById(holderId){
    return fetch(`${POLICY_HOLDER_API_BASE_URL}/fetchPolicyHolderById/${holderId}`)
    .then(response => response.json())
      .then(data => {
        console.log('Fetched policy holder by ID:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching policy holder by ID:', error);
        throw error;
      });
  
  }

  getHolderByGreaterId(holderId){
    return fetch(`${POLICY_HOLDER_API_BASE_URL}/policyHoldersGreaterThanGivenId/${holderId}`)
    .then(response => response.json())
      .then(data => {
        console.log('Fetched policy holder by ID:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching policy holder by ID:', error);
        throw error;
      });
  
  }

  getHoldersByName(firstName){
    return fetch(`${POLICY_HOLDER_API_BASE_URL}/findpolicyHoldersWithFirstNames/${firstName}`)
    .then(response => response.json())
      .then(data => {
        console.log('Fetched policy holder by First Name:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching policy holder by First Name:', error);
        throw error;
      });
  
  }

  getCustomizedData(premiumAmount){
    return fetch(`${POLICY_HOLDER_API_BASE_URL}/findHolderAndPolicyCustomized/${premiumAmount}`)
    .then(response => response.json())
      .then(data => {
        console.log('Fetched policy and holder by Premium Amount:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching policy and holder by Premium Amount:', error);
        throw error;
      });
  }

}

export default new PolicyHolderService();
