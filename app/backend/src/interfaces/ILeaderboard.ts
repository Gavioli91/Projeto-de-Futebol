interface IBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number;
  goalsOwn: number;
}

interface ILeaderboard extends IBoard {
  goalsBalance: number;
  efficiency: string;
}

export { IBoard, ILeaderboard };
