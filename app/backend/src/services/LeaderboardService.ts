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
    const promises = equips.map((equip) =>
      LeaderboardService.createGameEquipHome(equip.id));
    const games = await Promise.all(promises);
    return games;
  }

  static async createAllEquipsHome():
  Promise<ILeaderboard[]> {
    const equips = await TeamModel.findAll();
    const data = await LeaderboardService.createUpdatesEquipsHome();
    const newUpdate = data.map((equip, i) => ({
      name: equips[i].teamName,
      totalPoints: equip.reduce(homePoints, 0),
      totalGames: equip.length,
      totalVictories: equip.reduce(homeWins, 0),
      totalDraws: equip.reduce(table, 0),
      totalLosses: equip.reduce(homeDefeats, 0),
      goalsFavor: equip.reduce(homeScoreFavor, 0),
      goalsOwn: equip.reduce(homeScoreOwn, 0),
      goalsBalance:
      equip.reduce(homeScoreFavor, 0) - equip.reduce(homeScoreOwn, 0),
      efficiency:
      ((equip.reduce(homePoints, 0) / (equip.length * 3)) * 100).toFixed(2),
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
    const promises = equips.map((equip) =>
      LeaderboardService.createGameEquipsAway(equip.id));
    const games = await Promise.all(promises);
    return games;
  }

  static async createAllEquipsAway():
  Promise<ILeaderboard[]> {
    const equips = await TeamModel.findAll();
    const data = await LeaderboardService.createUpdatesEquipAway();
    const newUpdate = data.map((equip, i) => ({
      name: equips[i].teamName,
      totalPoints: equip.reduce(awayPoints, 0),
      totalGames: equip.length,
      totalVictories: equip.reduce(awayWins, 0),
      totalDraws: equip.reduce(table, 0),
      totalLosses: equip.reduce(awayDefeats, 0),
      goalsFavor: equip.reduce(awayScoreFavor, 0),
      goalsOwn: equip.reduce(awayScoreOwn, 0),
      goalsBalance:
      equip.reduce(awayScoreFavor, 0) - equip.reduce(awayScoreOwn, 0),
      efficiency:
      ((equip.reduce(awayPoints, 0) / (equip.length * 3)) * 100).toFixed(2),
    }));
    return newUpdate;
  }

  static async sumAllPoints(): Promise<IBoard[]> {
    const homeEquip = await
    LeaderboardService.createAllEquipsHome();

    const awayEquip = await
    LeaderboardService.createAllEquipsAway();

    const allPoints = homeEquip.map((equip, i) =>
      ({ name: equip.name,
        totalPoints: equip.totalPoints + awayEquip[i].totalPoints,
        totalGames: equip.totalGames + awayEquip[i].totalGames,
        totalVictories: equip.totalVictories + awayEquip[i].totalVictories,
        totalDraws: equip.totalDraws + awayEquip[i].totalDraws,
        totalLosses: equip.totalLosses + awayEquip[i].totalLosses,
        goalsFavor: equip.goalsFavor + awayEquip[i].goalsFavor,
        goalsOwn: equip.goalsOwn + awayEquip[i].goalsOwn,
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
