import UserModel from '../database/models/UserModel';
import { iUser } from '../interfaces';

const userEmail = async (email: string):
Promise<iUser> => {
  const peopleUser = await
  UserModel.findOne({ where: { email } });
  return { id: peopleUser?.dataValues.id,
    username: peopleUser?.dataValues.username,
    role: peopleUser?.dataValues.role,
    email: peopleUser?.dataValues.email,
    password: peopleUser?.dataValues.password,
  };
};

const idOfUser = async (id: number):
Promise<iUser> => {
  const peopleUser = await
  UserModel.findByPk(id, {
    attributes: { exclude: ['password'] } });
  return peopleUser as unknown as iUser;
};

export default { userEmail, idOfUser };
