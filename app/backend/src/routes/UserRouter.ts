import { Router } from 'express';
import { loginOk, symbolOk } from '../middlewares/loginOk';
import UserController from '../controllers/UserController';

const path = Router();

path.post('/', loginOk, UserController.userEmail);

path.get('/validate', symbolOk, UserController.idOfUser);

export default path;
