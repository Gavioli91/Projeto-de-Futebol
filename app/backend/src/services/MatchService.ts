import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import IMatch from '../interfaces/IMatch';

class MatchService {
  public createGames = async (inProgres: string | undefined):
  Promise<MatchModel[]> => {
    const games = await
    MatchModel.findAll({ include: [
      { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
    });

    const selectGames = games.filter((game) =>
      inProgres === undefined
      || game.inProgress.toString() === inProgres);
    return selectGames;
  };

  public endGame = async (id: number) => {
    await MatchModel
      .update(
        { inProgress: false },
        { where: { id },
        },
      );
  };

  public updateGame = async (id: number, game: IMatch) => {
    await MatchModel
      .update({ ...game }, { where: { id } });
  };

  public saveGame = async (game: IMatch) => {
    const newGame = await MatchModel
      .create({ ...game,
        inProgress: true,
      });
    return newGame;
  };
}

export default MatchService;
