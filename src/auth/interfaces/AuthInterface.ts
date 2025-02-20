export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  access_token: string;
}
