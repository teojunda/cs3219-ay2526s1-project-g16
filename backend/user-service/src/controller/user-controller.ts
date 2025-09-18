import type { Request, Response } from 'express';

// Controller function for the hello world
export const helloWorld = (req: Request, res: Response) => {
  res.send('Hello, World!');
};