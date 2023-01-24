export interface iLogin {
  email: string;
  password: string;
}

export interface iUser extends iLogin {
  id?: number;
  username: string;
  role: string;
}
