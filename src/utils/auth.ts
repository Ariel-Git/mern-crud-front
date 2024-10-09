import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const decoded: JwtPayload = jwtDecode(token);
  const now = Date.now() / 1000; // current time in seconds

  return decoded.exp < now;
};
