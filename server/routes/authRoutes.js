import express from 'express';
import { signUp, signIn } from '../controllers/authController.js'; // Adjust imports if necessary
import authenticateToken from '../middleware/authMiddleware.js'; // Import JWT middleware

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

// Example of a protected route
router.get('/profile', authenticateToken, (req, res) => {
  res.send('Profile data');
});

export default router;
