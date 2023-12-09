const AUTH_API_BASE_URL = "http://localhost:8080"; // Update with your authentication API base URL

class AuthService {
  login(username, password) {
    return fetch(`${AUTH_API_BASE_URL}/api/holders/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login response:', data);
        return data;
      })
      .catch(error => {
        console.error('Error during login:', error);
        throw error;
      });
  }
}