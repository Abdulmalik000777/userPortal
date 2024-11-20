const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
