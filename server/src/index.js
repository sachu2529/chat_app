import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from '../middleware/errorHandler.js'; // Import the error handler

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Example routes
import authRoutes from '../routes/authRoutes.js';
import users from '../routes/routes.js';
app.use('/api/auth', authRoutes);
app.use('/api/users', users);

// Error handling middleware should be the last middleware
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
