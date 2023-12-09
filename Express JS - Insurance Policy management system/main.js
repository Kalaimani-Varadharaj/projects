const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const policyHolder = require('./routes/PolicyHolder');

app.use('/policyHolders', policyHolder);

app.get('/addPolicyHolderForm', (req, res) => {
  res.sendFile(__dirname + '/PolicyHolder.html');
});

app.listen(3000, (error) => {
  if (error) {
    console.error('Server error:', error);
  } else {
    console.log('Server is running on port 3000');
    
  }
});