import { Router, Request, Response } from 'express';
import User from '../models/User';
import { comparePassword, generateToken } from '../utils/helpers';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation';

const router = Router();

// Register
router.post('/register', validateRegister, handleValidationErrors, async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const user = new User({ email, username, password });
    await user.save();

    const token = generateToken(user._id.toString());
    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', validateLogin, handleValidationErrors, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = generateToken(user._id.toString());
    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
