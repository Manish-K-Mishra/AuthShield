import { createKeychainStorage } from './keychainStorage';
import { STORAGE_CONFIG } from './storageConfig';

export const secureStorage = createKeychainStorage(STORAGE_CONFIG.keychainService);
