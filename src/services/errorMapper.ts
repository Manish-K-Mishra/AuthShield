import axios, { AxiosError } from 'axios';
import type { AppError } from '../types/AppError';

export function toAppError(err: unknown): AppError {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError;

    if (e.code === 'ECONNABORTED') return { type: 'Timeout' };
    if (!e.response) return { type: 'Network' };

    const status = e.response.status;
    if (status === 401 || status === 403) return { type: 'Unauthorized' };
    if (status >= 500) return { type: 'Server', status };

    return { type: 'Server', status };
  }

  return { type: 'Unknown' };
}
