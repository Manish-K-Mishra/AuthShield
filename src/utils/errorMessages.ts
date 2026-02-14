import type { AppError } from '../types/AppError';

export function errorMessage(e: AppError): string {
  switch (e.type) {
    case 'Network':
      return 'Network error. Check your internet connection.';
    case 'Timeout':
      return 'Request timed out. Please try again.';
    case 'Unauthorized':
      return 'Session expired. Please login again.';
    case 'Server':
      return 'Server error. Please try again later.';
    default:
      return 'Something went wrong.';
  }
}
