import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const gameService = new MatchService();

const gameController = new MatchController(gameService);

const gameRouter = Router();

gameRouter.get('/', gameController.createGames);

export default gameRouter;
