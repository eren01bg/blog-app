const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db'); 
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
