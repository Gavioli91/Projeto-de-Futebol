import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: { type: INTEGER, autoIncrement: true, primaryKey: true },

  username: { type: STRING, allowNull: false },

  role: { type: STRING },

  email: { type: STRING, allowNull: false },

  password: { type: STRING, allowNull: false },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
  tableName: 'users',
});

export default User;
