import bcrypt from "bcrypt";
import type { Request, Response } from 'express';
import {
    createUser as _createUser,
    getUserByEmail as _getUserByEmail,
    getUserById as _getUserById,
    getUserByUsername as _getUserByUsername
} from '../model/user-model.ts'

// Controller function for the hello world
export const helloWorld = (req: Request, res: Response) => {
  res.send('Hello, World!');
};

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || username.length < 3) {
      res.status(400).json({ error: 'Username must be at least 3 characters long.' });
      return;
    }

    if (!email || email.length < 3) {
      res.status(400).json({ error: 'Email must be at least 3 characters long.' });
      return;
    }

    if (!password || password.length < 3) {
      res.status(400).json({ error: 'Password must be at least 3 characters long.' });
      return;
    }

    // Check for duplicate username or password
    const existingUserByUsername = await _getUserByUsername(username);
    if (existingUserByUsername) {
      res.status(409).json({ error: 'Username is already taken.' });
      return;
    }

    const existingUserByEmail = await _getUserByEmail(email);
    if (existingUserByEmail) {
      res.status(409).json({ error: 'An account with this email already exists.' });
      return;
    }

    // Hash the password (required!)
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Call the model function
    const newUser = await _createUser(username, email, passwordHash);

    // Don't return passwordHash in the response
    const { passwordHash: _, ...safeUser } = newUser;

    res.status(201).json(safeUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}