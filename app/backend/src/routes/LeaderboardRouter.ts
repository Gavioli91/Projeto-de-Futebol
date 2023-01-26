import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const path = Router();

path.get('/', LeaderboardController.createAllEquips);
path.get('/home', LeaderboardController.createAllEquipsHome);
path.get('/away', LeaderboardController.createAllEquipsAway);

export default path;
