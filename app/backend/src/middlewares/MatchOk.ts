import { Request, Response, NextFunction } from 'express';
import Codes from '../utils/Codes';
import TeamModel from '../database/models/TeamModel';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const game = req.body;

  if (game.homeTeamId === game.awayTeamId) {
    return res.status(Codes.unprocessableEntity).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const homeTeam = await TeamModel.findByPk(game.homeTeamId);
  const awayTeam = await TeamModel.findByPk(game.awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(Codes.notFound).json({
      message: 'There is no team with such id!',
    });
  }
  next();
};
