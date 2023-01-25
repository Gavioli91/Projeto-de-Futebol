import { Router } from 'express';
import { loginOk, symbolOk } from '../middlewares/loginOk';
import UserController from '../controllers/UserController';

const UserRouter = Router();

UserRouter.post('/', loginOk, UserController.userEmail);
UserRouter.get('/validate', symbolOk, UserController.idOfUser);

export default UserRouter;
