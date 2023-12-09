const POLICY_API_BASE_URL = "http://localhost:8080";

class PolicyService{
    addPolicy(policy) {
        return fetch(`${POLICY_API_BASE_URL}/createPolicy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(policy),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to add policy: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Add Policy:', data);
          return data;
        })
        .catch((error) => {
          console.error('Error adding policy:', error);
          throw error;
        });
      }

      getPolicy() {
        return fetch(`${POLICY_API_BASE_URL}/fetchAllPolicies`)
          .then(response => response.json())
          .then(data => {
            console.log("Fetched Policy list:", data);
            return data;
          })
          .catch(error => {
            console.error('Error fetching policy :', error);
            throw error;
          });
      }
    
      updatePolicy(policyNumber, updatedPolicy) {
        return fetch(`${POLICY_API_BASE_URL}/updatePolicy/${policyNumber}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPolicy),
        })
        .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              // Handle the case where the policy update failed (e.g., policy not found)
              throw new Error('Policy update failed');
          }
      })
      .then(data => {
          console.log('Update Policy :', data);
          return data;
      })
      .catch(error => {
          console.error('Error updating policy:', error);
          throw error;
      });
  }
  
    
      getPolicyByNumber(policyNumber){
        return fetch(`${POLICY_API_BASE_URL}/fetchPolicyByNumber/${policyNumber}`)
        .then(response => response.json())
          .then(data => {
            console.log('Fetch policy by Number:', data);
            return data;
          })
          .catch(error => {
            console.error('Error fetching policy by Number:', error);
            throw error;
          });
      
      }

      getAllPolicyTypes() {
        return fetch(`${POLICY_API_BASE_URL}/allPolicyNames`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            console.error('Error fetching policy names:', error);
            throw error;
          });
      }
    

}

export default new PolicyService();