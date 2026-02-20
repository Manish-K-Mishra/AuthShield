import { apiCLient } from './apiClient';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  userId: string;
};

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const res = await apiCLient.get(`/users/1`);

  return {
    accessToken: `mock-token-${Date.now()}`,
    userId: String(res.data.id),
  };
}
