import * as Keychain from 'react-native-keychain';
import type { SecureStorage } from './SecureStorage';

export function createKeychainStorage(service: string): SecureStorage {
  return {
    async set(key, value) {
      // store key as username and value as password (common pattern)
      await Keychain.setGenericPassword(key, value, { service });
    },

    async get(key) {
      const creds = await Keychain.getGenericPassword({ service });
      // only return if username matches our key
      return creds && creds.username === key ? creds.password : ' ';
    },

    async remove() {
      await Keychain.resetGenericPassword({ service });
    },
  };
}
