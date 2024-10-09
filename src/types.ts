export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface AuthState {
  user: User | undefined;
  token: string | undefined;
}
