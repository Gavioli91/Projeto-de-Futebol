import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import Match from './MatchModel';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: { type: INTEGER, autoIncrement: true, primaryKey: true },

  teamName: { type: STRING, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  tableName: 'teams',
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Team;
