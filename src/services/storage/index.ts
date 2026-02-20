import { createKeychainStorage } from './keychainStorage';
import { STORAGE_CONFIG } from './storageConfig';

export const secureStorage = createKeychainStorage({
  service: STORAGE_CONFIG.keychainService,
  requireBiometrics: STORAGE_CONFIG.requireBiometricsForToken,
});
