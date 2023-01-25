import { Request, Response } from 'express';
import Codes from '../utils/Codes';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private gamesService: MatchService) {}

  public createGames = async (req: Request, res: Response):
  Promise<void> => {
    const { inProgress } = req.query;
    const games = await
    this.gamesService
      .createGames(inProgress as string | undefined);
    res.status(Codes.ok).json(games);
  };

  public createGame = async (
    _req: Request,
    res: Response,
  ) => {
    const games = {};
    return res.status(Codes.ok).json(games);
  };
}

export default MatchController;
