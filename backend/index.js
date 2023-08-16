const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db'); 
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const categoryController = require('./controllers/categoryController');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

categoryController.getCategoryCount()
  .then((categoryCount) => {
    if (categoryCount === 0) {
      categoryController.createCategories();
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
