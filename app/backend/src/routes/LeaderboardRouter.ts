import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = Router();

leaderboardController.get('/', LeaderboardController.createAllEquips);
leaderboardController.get('/home', LeaderboardController.createAllEquipsHome);
leaderboardController.get('/away', LeaderboardController.createAllEquipsAway);

export default leaderboardController;
