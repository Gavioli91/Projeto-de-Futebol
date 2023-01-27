import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import Sort from '../option/Scores';
// import Codes from '../utils/Codes';

class LeaderboardController {
  static async createAllEquipsHome(
    _req: Request,
    res: Response,
  ):
    Promise<Response> {
    const results = await
    LeaderboardService.createAllEquipsHome();
    const order = Sort(results);

    return res.status(Codes.ok).json(order);
  }

  static async createAllEquipsAway(
    _req: Request,
    res: Response,
  ):
    Promise<Response> {
    const results = await
    LeaderboardService.createAllEquipsAway();
    const order = Sort(results);

    return res.status(200).json(order);
  }

  static async createAllEquips(
    _req: Request,
    res: Response,
  ):
    Promise<Response> {
    const results = await
    LeaderboardService.createAllEquips();
    const order = Sort(results);

    return res.status(200).json(order);
  }
}

export default LeaderboardController;
