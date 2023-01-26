import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import MatchOk from '../middlewares/MatchOk';
import { symbolOk } from '../middlewares/loginOk';

const gameService = new MatchService();

const gameController = new MatchController(gameService);

const gameRouter = Router();

gameRouter.get('/', gameController.createGames);

gameRouter.post('/', symbolOk, MatchOk, gameController.saveGame);

gameRouter.patch('/:id/finish', gameController.endGame);

gameRouter.patch('/:id', gameController.updateGame);

export default gameRouter;
