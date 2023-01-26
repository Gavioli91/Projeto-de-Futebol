import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { homePoints, homeWins, table,
  homeDefeats, homeScoreFavor, homeScoreOwn,
  awayPoints, awayWins, awayDefeats,
  awayScoreFavor, awayScoreOwn } from '../option/Results';
import { IBoard, ILeaderboard } from '../interfaces/ILeaderboard';

class LeaderboardService {
  static async createGameEquipHome(id: number):
  Promise<MatchModel[]> {
    const games = await MatchModel.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return games;
  }

  static async createUpdatesEquipsHome():
  Promise<MatchModel[][]> {
    const equips = await TeamModel.findAll();
    const promises = equips.map((team) =>
      LeaderboardService.createGameEquipHome(team.id));
    const games = await Promise.all(promises);
    return games;
  }

  static async createAllEquipsHome():
  Promise<ILeaderboard[]> {
    const equips = await TeamModel.findAll();
    const data = await LeaderboardService.createUpdatesEquipsHome();
    const newUpdate = data.map((team, index) => ({
      name: equips[index].teamName,
      totalPoints: team.reduce(homePoints, 0),
      totalGames: team.length,
      totalVictories: team.reduce(homeWins, 0),
      totalDraws: team.reduce(table, 0),
      totalLosses: team.reduce(homeDefeats, 0),
      goalsFavor: team.reduce(homeScoreFavor, 0),
      goalsOwn: team.reduce(homeScoreOwn, 0),
      goalsBalance:
      team.reduce(homeScoreFavor, 0) - team.reduce(homeScoreOwn, 0),
      efficiency:
      ((team.reduce(homePoints, 0) / (team.length * 3)) * 100).toFixed(2),
    }));
    return newUpdate;
  }

  static async createGameEquipsAway(id: number):
  Promise<MatchModel[]> {
    const games = await MatchModel.findAll({
      where: { awayTeamId: id, inProgress: false },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return games;
  }

  static async createUpdatesEquipAway():
  Promise<MatchModel[][]> {
    const equips = await TeamModel.findAll();
    const promises = equips.map((team) =>
      LeaderboardService.createGameEquipsAway(team.id));
    const games = await Promise.all(promises);
    return games;
  }

  static async createAllEquipsAway():
  Promise<ILeaderboard[]> {
    const equips = await TeamModel.findAll();
    const data = await LeaderboardService.createUpdatesEquipAway();
    const newInfo = data.map((team, index) => ({
      name: equips[index].teamName,
      totalPoints: team.reduce(awayPoints, 0),
      totalGames: team.length,
      totalVictories: team.reduce(awayWins, 0),
      totalDraws: team.reduce(table, 0),
      totalLosses: team.reduce(awayDefeats, 0),
      goalsFavor: team.reduce(awayScoreFavor, 0),
      goalsOwn: team.reduce(awayScoreOwn, 0),
      goalsBalance:
      team.reduce(awayScoreFavor, 0) - team.reduce(awayScoreOwn, 0),
      efficiency:
      ((team.reduce(awayPoints, 0) / (team.length * 3)) * 100).toFixed(2),
    }));
    return newInfo;
  }

  static async sumAllPoints(): Promise<IBoard[]> {
    const home = await
    LeaderboardService.createAllEquipsHome();

    const away = await
    LeaderboardService.createAllEquipsAway();

    const allPoints = home.map((team, index) =>
      ({ name: team.name,
        totalPoints: team.totalPoints + away[index].totalPoints,
        totalGames: team.totalGames + away[index].totalGames,
        totalVictories: team.totalVictories + away[index].totalVictories,
        totalDraws: team.totalDraws + away[index].totalDraws,
        totalLosses: team.totalLosses + away[index].totalLosses,
        goalsFavor: team.goalsFavor + away[index].goalsFavor,
        goalsOwn: team.goalsOwn + away[index].goalsOwn,
      }));
    return allPoints;
  }

  static async createAllEquips():
  Promise<ILeaderboard[]> {
    const data = await
    LeaderboardService.sumAllPoints();
    return data.map((equip) => ({ ...equip,
      goalsBalance: equip.goalsFavor - equip.goalsOwn,
      efficiency:
      ((equip.totalPoints / (equip.totalGames * 3)) * 100).toFixed(2) }));
  }
}

export default LeaderboardService;
