import { Request, Response } from 'express';
import Codes from '../utils/Codes';
import TeamService from '../services/TeamService';

class UserController {
  constructor(private UserService: TeamService) {}
  public createTeams = async (_req: Request, res: Response):
  Promise<void> => {
    const equips = await
    this.UserService.createTeams();
    res.status(Codes.ok).json(equips);
  };

  public idOfTeam = async (req: Request, res: Response):
  Promise<void> => {
    const { id } = req.params;
    const equips = await
    this.UserService.idOfTeam(+(id));
    res.status(Codes.ok).json(equips);
  };
}

export default UserController;
