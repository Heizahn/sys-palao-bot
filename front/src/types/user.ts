export interface User {
  id: string;
  email: string;
  role: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}
