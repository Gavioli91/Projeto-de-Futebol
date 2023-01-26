interface ILogin {
  email: string;
  password: string;
}

interface IUser extends ILogin {
  id?: number;
  username: string;
  role: string;
}

export { ILogin, IUser };
