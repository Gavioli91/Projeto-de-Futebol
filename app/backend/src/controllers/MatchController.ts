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

  public endGame = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    await this.gamesService.endGame(+(id));
    return res.status(Codes.ok).json({
      message: 'Finished',
    });
  };

  public updateGame = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const match = req.body;
    await this.gamesService.updateGame(+(id), match);
    return res.status(Codes.ok).json({
      message: 'Updated',
    });
  };

  public saveGame = async (
    req: Request,
    res: Response,
  ) => {
    const credentials = req.body;
    const newGame = await this.gamesService
      .saveGame(credentials);
    return res.status(Codes.created).json(newGame);
  };
}

export default MatchController;
