import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import Score from '../option/Scores';
import Codes from '../utils/Codes';

class LeaderboardController {
  static async createAllEquipsHome(
    _req: Request,
    res: Response,
  ):
    Promise<Response> {
    const results = await
    LeaderboardService.createAllEquipsHome();
    const order = Score(results);

    return res.status(Codes.ok).json(order);
  }

  static async createAllEquipsAway(
    _req: Request,
    res: Response,
  ):
    Promise<Response> {
    const results = await
    LeaderboardService.createAllEquipsAway();
    const order = Score(results);

    return res.status(Codes.ok).json(order);
  }

  static async createAllEquips(
    _req: Request,
    res: Response,
  ):
    Promise<Response> {
    const results = await
    LeaderboardService.createAllEquips();
    const order = Score(results);

    return res.status(Codes.ok).json(order);
  }
}

export default LeaderboardController;
