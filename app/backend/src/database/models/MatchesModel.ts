import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: { type: INTEGER, autoIncrement: true, primaryKey: true },

  homeTeamId: { type: INTEGER, allowNull: false },

  homeTeamGoals: { type: INTEGER, allowNull: false },

  awayTeamId: { type: INTEGER, allowNull: false },

  awayTeamGoals: { type: INTEGER, allowNull: false },

  inProgress: { type: BOOLEAN, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
  tableName: 'matches',
});

export default Matches;