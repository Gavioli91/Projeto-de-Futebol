import UserModel from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser';

const userEmail = async (email: string):
Promise<IUser> => {
  const peopleUser = await UserModel.findOne({ where: { email } });

  return { id: peopleUser?.dataValues.id,
    username: peopleUser?.dataValues.username,
    role: peopleUser?.dataValues.role,
    email: peopleUser?.dataValues.email,
    password: peopleUser?.dataValues.password,
  };
};

const idOfUser = async (id: number):
Promise<IUser> => {
  const peopleUser = await
  UserModel.findByPk(id, {
    attributes: { exclude: ['password'] } });
  return peopleUser as unknown as IUser;
};

export default { userEmail, idOfUser };
