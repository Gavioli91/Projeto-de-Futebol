import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');

const blocked = process.env.BLOCKED_JWT;

const loginOk = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'All fields must be filled',
    });
  }
  next();
};
const symbolOk = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization: symbol } = req.headers;
  if (!symbol) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  try {
    const peopleUser = jwt.verify(symbol, blocked as string);
    req.body.user = peopleUser;

    next();
  } catch (error) {
    return res.status(400)
      .json({ message: 'Expired or invalid token' });
  }
};

export { loginOk, symbolOk };
