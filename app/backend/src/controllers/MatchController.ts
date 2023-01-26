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
    const game = req.body;
    await this.gamesService.updateGame(+(id), game);
    return res.status(Codes.ok).json({
      message: 'Updated',
    });
  };

  public saveGame = async (
    req: Request,
    res: Response,
  ) => {
    const released = req.body;
    const newGame = await this.gamesService
      .saveGame(released);
    return res.status(Codes.created).json(newGame);
  };
}

export default MatchController;
