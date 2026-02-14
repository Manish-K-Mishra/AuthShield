export type AppError =
  | { type: 'Network' }
  | { type: 'Timeout' }
  | { type: 'Unauthorized' }
  | { type: 'Server'; status?: number }
  | { type: 'Unknown' };
