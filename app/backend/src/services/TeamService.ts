import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

class Teams {
  public createTeams = async ():
  Promise<ITeam[]> => {
    const equips = await
    TeamModel.findAll();
    return equips;
  };

  public idOfTeam = async (id: number):
  Promise<ITeam> => {
    const equips = await
    TeamModel.findByPk(id);
    return equips as ITeam;
  };
}

export default Teams;
