import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

require('dotenv/config');

const blocked = process.env.JWT_SECRET;

const userEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const peopleUser = await UserService.userEmail(email);

  if (!peopleUser || !peopleUser.id) {
    return res.status(401).json({
      message: 'Incorrect email or password',
    });
  }
  if (!bcrypt.compareSync(password, peopleUser.password)) {
    return res.status(401).json({
      message: 'Incorrect email or password',
    });
  }

  const infoOfPeopleUser = {
    id: peopleUser.id, email,
  };
  const configurationOfJwt = { expiresIn: '1d' };
  const token = jwt.sign(infoOfPeopleUser, blocked as string, configurationOfJwt);
  res.status(200).json({ token });
};

const idOfUser = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const peopleUser = await UserService.idOfUser(+(id));
  if (!peopleUser) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json({ role: peopleUser.role });
};

export default { userEmail, idOfUser };
