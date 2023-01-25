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

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Team;
