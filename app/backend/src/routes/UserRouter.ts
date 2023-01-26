import { Router } from 'express';
import { LoginOk, symbolOk } from '../middlewares/LoginOk';
import UserController from '../controllers/UserController';

const UserRouter = Router();

UserRouter.post('/', LoginOk, UserController.userEmail);
UserRouter.get('/validate', symbolOk, UserController.idOfUser);

export default UserRouter;
