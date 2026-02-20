import * as Keychain from 'react-native-keychain';
import type { SecureStorage } from './SecureStorage';

type KeyChainStorageOptions = {
  service: string;
  requireBiometrics: boolean;
};

export function createKeychainStorage(options: KeyChainStorageOptions): SecureStorage {
  const { service, requireBiometrics } = options;

  return {
    async set(key, value) {
      // store key as username and value as password (common pattern)
      await Keychain.setGenericPassword(key, value, {
        service,
        //Stronger: not synced, device only
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,

        //If enabled, required biometric(Android support depends on device/imp)
        ...(requireBiometrics
          ? { accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET }
          : {}),
      });
    },

    async get(key) {
      const creds = await Keychain.getGenericPassword({
        service,
        // ✅ Shows biometric prompt when accessControl was used to store
        ...(requireBiometrics ? { authenticationPrompt: { title: 'Unlock with biometrics' } } : {}),
      });
      // only return if username matches our key
      return creds && creds.username === key ? creds.password : ' ';
    },

    async remove() {
      await Keychain.resetGenericPassword({ service });
    },
  };
}
