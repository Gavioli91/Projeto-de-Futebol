interface iLogin {
  email: string;
  password: string;
}

interface IUser extends iLogin {
  id?: number;
  username: string;
  role: string;
}

export { iLogin, IUser };
