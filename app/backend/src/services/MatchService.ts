import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

class MatchService {
  public createGames = async (inProgres?: string):
  Promise<MatchModel[]> => {
    const games = await MatchModel.findAll({ include: [
      { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
    });

    if (inProgres === undefined) return games;
    return games.filter((game) =>
      game.inProgress.toString() === inProgres);
  };

  public createGame = async (id: number) => {
    const game = await MatchModel.findByPk(id);
    return game;
  };
}

export default MatchService;
