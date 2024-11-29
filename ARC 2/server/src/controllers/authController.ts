import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // For demonstration purposes, we'll check for the specific usernames
    let role: 'employee' | 'manager';
    if (username === 'FSE123') {
      role = 'employee';
    } else if (username === 'FSM123') {
      role = 'manager';
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In a real application, you should verify the password here
    // For now, we'll just check if the username matches our test cases

    const token = jwt.sign(
      { username, role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      role,
      username,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
