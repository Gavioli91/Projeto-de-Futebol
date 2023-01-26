import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import Codes from '../utils/Codes';

const blocked = process.env.JWT_SECRET;

const LoginOk = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(Codes.badRequest).json({
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
    return res.status(Codes.badRequest).json({
      message: 'Token not found',
    });
  } try {
    const peopleUser = jwt.verify(symbol, blocked as string);
    req.body.user = peopleUser;

    next();
  } catch (error) {
    return res.status(Codes.authenticationError).json({
      message: 'Token must be a valid token',
    });
  }
};

export { LoginOk, symbolOk };
