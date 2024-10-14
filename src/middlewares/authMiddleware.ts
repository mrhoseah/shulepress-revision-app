import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import config from '~/config';

interface UserRequest extends Request {
  user?: any; // You can replace 'any' with a more specific type if you have one
}

// Middleware to validate token with external service
export const validateAuth = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
     res.status(401).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
     res.status(401).json({ message: 'No token provided.' });
  }

  try {
    // Verify the token with external validation service
    const response = await axios.post(config.central_api_url, { token });
    if (response.data.valid) {
      req.user = response.data.user; // Assuming response includes user info
      next();
    } else {
      res.status(401).json({ message: 'Invalid token.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Middleware to require user and get user info
export const requireUser = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)  res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    if (!token)  res.sendStatus(401);

    try {
      const response = await axios.post(config.central_api_url, { token });
      if (response.data) {
        req.user = response.data; // Attach user info to req
        next();
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      res.sendStatus(500);
    }
};
