import { secureStorage } from '../../services/storage';
import { STORAGE_KEYS } from '../../services/storage/keys';

export async function saveAccessToken(token: string): Promise<void> {
  await secureStorage.set(STORAGE_KEYS.accessToken, token);
}

export async function readAccessToken(): Promise<string | null> {
  return secureStorage.get(STORAGE_KEYS.accessToken);
}

export async function clearAccessToken(): Promise<void> {
  await secureStorage.remove(STORAGE_KEYS.accessToken);
}
