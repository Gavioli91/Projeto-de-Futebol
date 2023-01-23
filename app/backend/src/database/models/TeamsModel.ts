import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Match from './MatchesModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: { type: INTEGER, autoIncrement: true, primaryKey: true },

  teamName: { type: STRING, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  tableName: 'teams',
});

Teams.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
Teams.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Teams;
