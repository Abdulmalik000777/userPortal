const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import user routes
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes); // Use user routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
