export interface User {
  username: string;
  password: string;
}

export interface Response {
  res: string;
  status: boolean;
  userId?: string;
}
