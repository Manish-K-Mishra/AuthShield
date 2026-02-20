import { readAccessToken } from '../screens/Auth/authTokenService';

export async function getAccessToken(): Promise<string | null> {
  return readAccessToken();
}
